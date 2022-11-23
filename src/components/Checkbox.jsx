import React from "react";
import "./checkbox.css";

const Checkbox = ({onChange}) => {
  return (
    <div className="tick">
      <input
        // checked=""
        type="checkbox"
        id="checkbox"
        className="hidden-xs-up"
        onChange={onChange}
      />
      <label htmlFor="checkbox" className="checkbox"></label>
    </div>
  );
};

export default Checkbox;
