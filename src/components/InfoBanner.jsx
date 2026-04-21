import { useState } from "react";

const InfoBanner = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="info-banner">
      <div className="info-banner-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className="info-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
          </svg>
        </span>
        <div className="info-banner-text">
          <span className="info-banner-title">Important Notes & Disclaimers</span>
          {!isCollapsed && (
            <ul className="info-banner-list">
              <li>Tax Loss Harvesting regulations vary significantly by jurisdiction. Please consult a qualified tax professional before executing trades.</li>
              <li>Calculations do not account for derivatives, futures, or options, which are often taxed under different business income categories.</li>
              <li>Market data is aggregated from Coingecko; values may deviate slightly from live exchange order books due to liquidity and spread.</li>
              <li>Holding periods are calculated based on available trade history. We currently default to long-term rates in jurisdictions without short-term bifurcation.</li>
              <li>This tool only considers unrealized losses for harvesting simulations. Existing realized losses are already factored into your Realized Status.</li>
            </ul>
          )}
        </div>
      </div>
      <button 
        className={`info-collapse-btn ${isCollapsed ? "collapsed" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsCollapsed(!isCollapsed);
        }}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default InfoBanner;
