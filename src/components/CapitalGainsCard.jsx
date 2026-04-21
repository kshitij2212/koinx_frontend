import { fmtCompact } from "../utils/formatters";

const GainsRow = ({ label, stcgVal, ltcgVal, isLoss }) => (
  <div className="gains-row">
    <span className="gains-label">{label}</span>
    <span className={`gains-value ${isLoss ? "loss" : "profit"}`}>
      {fmtCompact(Math.abs(stcgVal))}
    </span>
    <span className={`gains-value ${isLoss ? "loss" : "profit"}`}>
      {fmtCompact(Math.abs(ltcgVal))}
    </span>
  </div>
);

const CapitalGainsCard = ({ gains, summary, variant, savings }) => {
  if (!gains || !summary) return null;

  const isPreHarvest = variant === "pre";
  const stcgStatus = summary.netSTCG >= 0 ? "profit" : "loss";
  const ltcgStatus = summary.netLTCG >= 0 ? "profit" : "loss";

  return (
    <div className={`card ${isPreHarvest ? "card-dark" : "card-blue"}`}>
      <div className="card-header">
        <h3 className="card-title">
          {isPreHarvest ? "Realized Status" : "Harvesting Impact"}
        </h3>
        <p className="card-subtitle">
          {isPreHarvest ? "Current year realized gains" : "Projected totals after harvesting"}
        </p>
      </div>

      <div className="gains-table">
        <div className="gains-row gains-header">
          <span className="gains-label" />
          <span className="gains-col-head">Short-term</span>
          <span className="gains-col-head">Long-term</span>
        </div>

        <GainsRow
          label="Profits"
          stcgVal={gains.stcg.profits}
          ltcgVal={gains.ltcg.profits}
          isLoss={gains.stcg.profits < 0 && gains.ltcg.profits < 0}
        />
        <GainsRow
          label="Losses"
          stcgVal={gains.stcg.losses}
          ltcgVal={gains.ltcg.losses}
          isLoss
        />

        <div className="gains-row net-row">
          <span className="gains-label gains-label-bold">Net Position</span>
          <span className={`gains-value gains-value-bold ${stcgStatus}`}>
            {fmtCompact(summary.netSTCG)}
          </span>
          <span className={`gains-value gains-value-bold ${ltcgStatus}`}>
            {fmtCompact(summary.netLTCG)}
          </span>
        </div>
      </div>

      <div className="realised-box">
        <span className="realised-label">
          {isPreHarvest ? "Total Realized:" : "Total Effective:" }
        </span>
        <span className={`realised-value ${!isPreHarvest && savings > 0 ? "value-reduced" : ""}`}>
          {fmtCompact(summary.totalRealized, { digits: 2 })}
        </span>
      </div>

      {!isPreHarvest && (
        <p className={`harvest-success-para ${savings > 0 ? "visible" : "hidden"}`}>
          {savings > 0 ? (
            <>🎉 Your taxable capital gains are reduced by <strong>{fmtCompact(savings, { digits: 2 })}</strong></>
          ) : null}
        </p>
      )}
    </div>
  );
};

export default CapitalGainsCard;