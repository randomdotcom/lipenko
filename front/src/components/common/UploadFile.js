import React from "react";
import "./styles.css";
import { Button, Paper } from "@material-ui/core";

export function UploadFile({ handleChange, handleClick }) {
  return (
    <div>
      <label htmlFor="file" className="label">
        НОВОЕ ИЗОБРАЖЕНИЕ ПРОФИЛЯ
      </label>
      <input
        type="file"
        name="logo"
        id="file"
        className="fileInput"
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        ПОДТВЕРДИТЬ
      </Button>
    </div>
  );
}
