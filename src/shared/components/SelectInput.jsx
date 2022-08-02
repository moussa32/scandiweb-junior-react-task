import React, { PureComponent } from "react";

export class SelectInput extends PureComponent {
  render() {
    const { selectClassName, selectName, selectValue, handleChange, options } = this.props;
    return (
      <select className={`${selectClassName}`} name={selectName} value={selectValue} onChange={handleChange}>
        {options.map((option) => (
          <option key={`filterSelectOption${option.value}`} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectInput;
