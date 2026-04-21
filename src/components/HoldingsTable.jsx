import { useState } from "react";
import HoldingRow from "./HoldingRow";

const HoldingsTable = ({ holdings, selectedIds, onToggle, onToggleAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allSelected = holdings.length > 0 && selectedIds.size === holdings.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const displayedHoldings = isExpanded ? holdings : holdings.slice(0, 5);
  const canExpand = holdings.length > 5;

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2 className="table-title">
          Holdings
          {selectedIds.size > 0 && (
            <span className="selected-count">
              {selectedIds.size} asset{selectedIds.size > 1 ? "s" : ""} selected
            </span>
          )}
        </h2>
      </div>

      <div className="table-scroll">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="td-checkbox">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onToggleAll}
                  aria-label="Select all holdings"
                />
              </th>
              <th>Asset</th>
              <th>
                <div className="header-with-subtext">
                  Holdings
                  <span className="header-subtext">Current Market Rate</span>
                </div>
              </th>
              <th>Total Current Value</th>
              <th>Short-term</th>
              <th>Long-term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((holding) => (
              <HoldingRow
                key={holding.uniqueId}
                holding={holding}
                isSelected={selectedIds.has(holding.uniqueId)}
                onToggle={() => onToggle(holding.uniqueId)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {canExpand && (
        <div className="view-all-container">
          <span 
            className="view-all-link"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "View less" : "View all"}
          </span>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;