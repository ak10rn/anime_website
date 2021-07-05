import React, { Component } from "react";
import Card from "./card";
import Info from "./info";
import { getAnimes } from "../services/animeService";

class CardContainer extends Component {
  state = {
    animes: []
  }
  async componentDidMount() {
    //console.log("test", props);
    const { data } = await getAnimes();
    try {
      this.setState({ animes: Object.values(data).filter(anime => anime.reviews.length > 0) });
      console.log(this.state.animes);
    } catch (err) {
      console.log(err);
    }
  }
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
    const { animes } = this.state;
    return (
      <>
        <Info numberOfAnimes={this.state.animes.length}/>
        <div className="" style={containerStyle}>
          {
            animes.map(anime => (
              <Card key={anime._id} anime={anime} {...this.props}/>
            ))
          }
        </div>
      </>
    );
  }
}

export default CardContainer;
