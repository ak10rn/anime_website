import React, { Component } from "react";

class Info extends Component {
  state = {};
  render() {
    return (
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        {" "}
        ~We Have Seen <span style={{ color: "gray" }}>10</span> Animes~
      </h1>
    );
  }
}

export default Info;
