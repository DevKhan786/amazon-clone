import React from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface ProductAvailabilityProps {
  stock: number;
}

const ProductAvailability = ({ stock }: ProductAvailabilityProps) => {
  let stockStatus, icon, textColor;

  if (stock <= 0) {
    stockStatus = "Out of Stock";
    icon = <AlertCircle className="text-red-500" size={16} />;
    textColor = "text-red-500";
  } else if (stock < 10) {
    stockStatus = `Low Stock: ${stock} left`;
    icon = <Clock className="text-amber-500" size={16} />;
    textColor = "text-amber-500";
  } else {
    stockStatus = "In Stock";
    icon = <CheckCircle2 className="text-green-500" size={16} />;
    textColor = "text-green-500";
  }

  return (
    <div className={`flex items-center gap-1 font-medium ${textColor}`}>
      {icon}
      <span>{stockStatus}</span>
    </div>
  );
};

export default ProductAvailability;
