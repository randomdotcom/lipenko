import React from "react";
import "./styles.css";
import { Button, Paper } from "@material-ui/core";

export function UploadFile({ handleChange, handleClick }) {
  return (
    <Paper className='container'>
      <label htmlFor="file" className='label'>UPLOAD YOUR LOGO</label>
      <input
        type="file"
        name="logo"
        id="file"
        className="fileInput"
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>Upload</Button>
    </Paper>
  );
}
