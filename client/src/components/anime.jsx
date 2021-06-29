import React, { Component } from "react";
import "./anime.css";

class Anime extends Component {
  state = {
    anime: {
      title: "Attack on Titan",
      rating: 8,
      sypnosis: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="title">{this.state.anime.title}</div>
          <div className="body">
            <div className="left">Hello World</div>
          </div>
        </div>
      </>
    );
  }
}

export default Anime;
