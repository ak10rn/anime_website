import React, { Component } from "react";

class Info extends Component {
  render() {
    return (

      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>

        {" "}
        ~We Have Seen <span style={{ color: "gray" }}>{this.props.numberOfAnimes}</span> Animes~
      </h1>
    );
  }
}

export default Info;
