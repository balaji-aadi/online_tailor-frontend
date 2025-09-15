import currency from "../../../public/Assests/currency.svg";

const AEDPrice = ({ value, iconSize = 14 }) => {
  if (!value || isNaN(value)) return "N/A";

  const formattedValue = Number(value).toFixed(2);

  return (
    <span className="flex items-center gap-1">
      <img
        src={currency} 
        alt="AED"
        style={{ width: iconSize, height: iconSize }}
      />
      <span>{formattedValue}</span>
    </span>
  );
};

export default AEDPrice;
