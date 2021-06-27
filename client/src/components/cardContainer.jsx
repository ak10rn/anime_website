import React, { Component } from "react";
import Card from "./card";

class CardContainer extends Component {
  render() {
    return (
      <div className="card-group">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    );
  }
}

export default CardContainer;
