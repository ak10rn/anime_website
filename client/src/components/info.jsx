import React, { Component } from "react";

class Info extends Component {
  render() {
    return (
      <h1
        style={{ textAlign: "center", fontFamily: "monospace" }}
        className="text-muted"
      >
        ~We Have Seen{" "}
        <span className="text-light">{this.props.numberOfAnimes}</span> Animes~
      </h1>
    );
  }
}

export default Info;
