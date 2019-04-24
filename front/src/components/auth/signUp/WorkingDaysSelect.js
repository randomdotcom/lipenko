import React, { Component } from "react";
import Select from "react-select";

const options = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

export default class WorkingDaysSelect extends Component {
  handleChange = value => {
    this.props.onChange("workingDays", value);
  };

  handleBlur = () => {
    this.props.onBlur("workingDays", true);
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <label htmlFor="workingDays">Working days </label>
        <Select
          id="workingDays"
          options={options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          styles={padding}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#3f51b5"
            }
          })}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

const padding = {
  control: styles => {
    return {
      ...styles,
      padding: "9px 2px"
    };
  }
};
