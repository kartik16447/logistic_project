import React from "react";
import { useWatch } from "react-hook-form";

function totalCal(results) {
  let totalValue = 0;

  results.forEach((element) => {
    const value = parseInt(element.value, 10);
    const quantity = parseInt(element.quantity, 10);
    if (!isNaN(value) && !isNaN(quantity)) {
      totalValue = totalValue + value * quantity;
    }
  });

  return totalValue;
}

const Calc = ({ control, setValue }) => {
  const results = useWatch({ control, name: "item" });
  const output = totalCal(results);
  setValue("totalValue", output);
  return <h2>Total Value</h2>;
};

export default Calc;
