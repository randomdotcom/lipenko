import React, { Component } from "react";
import Select from "react-select";

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" }
];

export default class WorkingDaysSelect extends Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("workingDays", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
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
