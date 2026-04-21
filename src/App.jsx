import { useState } from "react";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import InfoBanner from "./components/InfoBanner";
import useTaxHarvesting from "./hooks/useTaxHarvesting";
import logo from "./assets/logo.png";
import "./App.css";

const App = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    actualGains,
    projectedGains,
    holdings,
    selectedIds,
    toggleHolding,
    toggleAll,
    actualSummary,
    projectedSummary,
    potentialSavings,
    harvestedLosses,
    loading,
    error,
  } = useTaxHarvesting();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Syncing portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="KoinX Logo" className="brand-logo" />
        </div>
      </nav>

      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Tax Loss Harvesting</h1>
          <div 
            className="how-it-works-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className="how-it-works-link">How it works?</span>
            {showTooltip && (
              <div className="tooltip-popup">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-content">
                  Tax-loss harvesting is a strategy to reduce your tax bill by selling assets at a loss 
                  to offset capital gains. This allows you to lower your overall net realized profit 
                  while maintaining your portfolio's exposure. 
                  <span className="tooltip-know-more">Learn more</span>
                </div>
              </div>
            )}
          </div>
        </header>

        <InfoBanner />

        <section className="cards-section" aria-label="Capital gains comparison">
          <CapitalGainsCard
            gains={actualGains}
            summary={actualSummary}
            variant="pre"
          />
          <CapitalGainsCard
            gains={projectedGains}
            summary={projectedSummary}
            variant="after"
            savings={harvestedLosses}
          />
        </section>

        <section className="table-section" aria-label="Holdings">
          <HoldingsTable
            holdings={holdings}
            selectedIds={selectedIds}
            onToggle={toggleHolding}
            onToggleAll={toggleAll}
          />
        </section>
      </div>
    </div>
  );
};

export default App;