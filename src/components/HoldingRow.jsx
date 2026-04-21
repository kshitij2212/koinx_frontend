import React, { useState } from "react";
import { fmtSmall, fmtCompact } from "../utils/formatters";

const GainCell = ({ gain, balance, ticker }) => {
  const isPositive = gain >= 0;
  return (
    <div className="gain-cell">
      <span className={isPositive ? "gain-pos" : "gain-neg"}>
        {isPositive ? "+" : ""}{fmtCompact(gain)}
      </span>
      <span className="cell-subtext">{fmtSmall(balance, 4)} {ticker}</span>
    </div>
  );
};

const CoinAvatar = ({ logo, coin }) => {
  const [imgError, setImgError] = useState(false);

  if (!logo || logo.includes("DefaultCoin.svg") || imgError) {
    return (
      <div className="coin-avatar coin-avatar-fallback">
        {coin?.slice(0, 2).toUpperCase() ?? "??"}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={coin}
      className="coin-avatar"
      onError={() => setImgError(true)}
    />
  );
};

const HoldingRow = ({ holding, isSelected, onToggle }) => {
  const { coin, coinName, logo, totalHolding, currentPrice, stcg, ltcg } =
    holding;

  const totalValue = totalHolding * currentPrice;

  return (
    <tr className={isSelected ? "row-selected" : ""}>
      <td className="td-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          aria-label={`Select ${coin}`}
        />
      </td>

      <td>
        <div className="coin-cell">
          <CoinAvatar logo={logo} coin={coin} />
          <div className="coin-info">
            <span className="coin-name">{coinName}</span>
            <span className="coin-ticker">{coin}</span>
          </div>
        </div>
      </td>

      <td>
        <div className="holding-cell">
          <span className="holding-amount">{fmtCompact(totalHolding, { withSymbol: false })} {coin}</span>
          <span className="market-rate">$ {fmtSmall(currentPrice, 2)}/{coin}</span>
        </div>
      </td>

      <td className="td-value">{fmtCompact(totalValue)}</td>

      <td>
        <GainCell gain={stcg?.gain} balance={stcg?.balance} ticker={coin} />
      </td>

      <td>
        <GainCell gain={ltcg?.gain} balance={ltcg?.balance} ticker={coin} />
      </td>

      <td className="td-amount">
        {isSelected ? (
          <span className="td-value">{fmtCompact(totalHolding, { withSymbol: false })} {coin}</span>
        ) : (
          <span className="td-empty">—</span>
        )}
      </td>
    </tr>
  );
};

export default HoldingRow;