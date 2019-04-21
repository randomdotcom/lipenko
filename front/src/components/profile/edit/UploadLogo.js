import React, { Component } from "react";
import { UploadFile } from "../../common/UploadFile";

export default class UploadLogoCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  checkMimeType = file => {
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (types.every(type => file.type !== type)) {
      err = file.type + " is not a supported format";
      return false;
    }
    console.error(err);
    return true;
  };
  checkFileSize = file => {
    let size = 2000000;
    if (file.size > size) {
      return false;
    }
    return true;
  };

  handleChange = event => {
    var file = event.target.files[0];
    if (this.checkMimeType(file) && this.checkFileSize(file)) {
      this.setState({
        file
      });
    }
  };

  handleClick = event => {
    event.preventDefault();
    const file = this.state.file;

    this.props.uploadLogo(file);
  };

  render() {
    return (
      <>
        <UploadFile
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
      </>
    );
  }
}
