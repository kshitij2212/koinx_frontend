export const fmtSmall = (val, digits = 2) => {
  if (val === 0) return "0";
  if (val === null || val === undefined || isNaN(val)) return "0";
  
  if (Math.abs(val) < 1e-4) return "~0";
  
  return parseFloat(Number(val).toFixed(digits)).toString();
};

export const fmtCompact = (val, options = {}) => {
  const { withSymbol = true, digits = 1 } = options;
  
  if (val === null || val === undefined || isNaN(val)) {
    return withSymbol ? "$0" : "0";
  }

  const absVal = Math.abs(val);
  const sign = val < 0 ? "-" : "";
  
  let formatted = "";
  let suffix = "";

  if (absVal >= 1000000) {
    formatted = (absVal / 1000000).toFixed(digits);
    suffix = "M";
  } else if (absVal >= 1000) {
    formatted = (absVal / 1000).toFixed(digits);
    suffix = "K";
  } else {
    const d = absVal < 1 ? Math.max(digits, 4) : 2;
    formatted = absVal.toFixed(d);
  }
  
  let cleanNum = formatted;
  if (suffix) {
    cleanNum = formatted.replace(/\.0+$/, "");
  } else {
    cleanNum = formatted.includes(".")
      ? formatted.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")
      : formatted;
  }
  
  if (cleanNum === "" || cleanNum === ".") cleanNum = "0";
  
  return `${sign}${withSymbol ? "$" : ""}${cleanNum}${suffix}`;
};
