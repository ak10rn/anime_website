import React, { Component } from "react";
import Card from "./card";
import Info from "./info";

class CardContainer extends Component {
  render() {
    const containerStyle = {
      display: "grid",
      width: "100%",
      maxWidth: "80rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
      gridGap: "0.75rem",
      gap: "0.75rem",
      padding: "1.5rem",
    };
    return (
      <>
        <Info />
        <div className="" style={containerStyle}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </>
    );
  }
}

export default CardContainer;
