import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchCapitalGains } from "../api/capitalGainsApi";
import { fetchHoldings } from "../api/holdingsApi";

const computeProjectedImpact = (base, selectedHoldings) => {
  let stcgProfits = base.stcg.profits;
  let stcgLosses = base.stcg.losses;
  let ltcgProfits = base.ltcg.profits;
  let ltcgLosses = base.ltcg.losses;

  selectedHoldings.forEach((holding) => {
    const stGain = holding.stcg?.gain ?? 0;
    const ltGain = holding.ltcg?.gain ?? 0;

    if (stGain > 0) stcgProfits += stGain;
    else if (stGain < 0) stcgLosses += Math.abs(stGain);

    if (ltGain > 0) ltcgProfits += ltGain;
    else if (ltGain < 0) ltcgLosses += Math.abs(ltGain);
  });

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
  };
};

const sortByTaxImpact = (holdings) =>
  [...holdings].sort((a, b) => {
    const impactA = Math.abs(a.stcg?.gain ?? 0) + Math.abs(a.ltcg?.gain ?? 0);
    const impactB = Math.abs(b.stcg?.gain ?? 0) + Math.abs(b.ltcg?.gain ?? 0);
    return impactB - impactA;
  });

const useTaxHarvesting = () => {
  const [actualGains, setActualGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gainsRes, holdingsRes] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings(),
        ]);
        setActualGains(gainsRes.capitalGains);
        const holdingsWithIds = holdingsRes.map((h, i) => ({
          ...h,
          uniqueId: h.id ?? `${h.coin}-${h.coinName}-${i}`,
        }));
        setHoldings(sortByTaxImpact(holdingsWithIds));
      } catch (err) {
        setError("Unable to sync portfolio data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleHoldingSelection = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.size === holdings.length
        ? new Set()
        : new Set(holdings.map((h) => h.uniqueId))
    );
  }, [holdings]);

  const selectedHoldings = useMemo(() => 
    holdings.filter((h) => selectedIds.has(h.uniqueId)),
  [holdings, selectedIds]);

  const projectedGains = useMemo(() => {
    if (!actualGains || selectedHoldings.length === 0) {
      return actualGains;
    }
    return computeProjectedImpact(actualGains, selectedHoldings);
  }, [actualGains, selectedHoldings]);

  const summarize = useCallback((data) => {
    if (!data) return { netSTCG: 0, netLTCG: 0, totalRealized: 0 };
    const netSTCG = data.stcg.profits - data.stcg.losses;
    const netLTCG = data.ltcg.profits - data.ltcg.losses;
    return { netSTCG, netLTCG, totalRealized: netSTCG + netLTCG };
  }, []);

  const actualSummary = useMemo(() => summarize(actualGains), [actualGains, summarize]);
  const projectedSummary = useMemo(() => summarize(projectedGains), [projectedGains, summarize]);

  const harvestedLosses = useMemo(() => {
    return selectedHoldings.reduce((acc, h) => {
      const loss = (h.stcg?.gain < 0 ? Math.abs(h.stcg.gain) : 0) + 
                   (h.ltcg?.gain < 0 ? Math.abs(h.ltcg.gain) : 0);
      return acc + loss;
    }, 0);
  }, [selectedHoldings]);

  const potentialSavings = useMemo(() => {
    if (actualSummary.totalRealized > projectedSummary.totalRealized) {
      return actualSummary.totalRealized - projectedSummary.totalRealized;
    }
    return 0;
  }, [actualSummary.totalRealized, projectedSummary.totalRealized]);

  return {
    actualGains,
    projectedGains,
    holdings,
    selectedIds,
    toggleHolding: toggleHoldingSelection,
    toggleAll: toggleSelectAll,
    actualSummary,
    projectedSummary,
    potentialSavings,
    harvestedLosses,
    loading,
    error,
  };
};

export default useTaxHarvesting;