import React, { Component } from "react";

import { getAnimeByMalId } from "../services/animeService";

class Card extends Component {
  state = {
    anime: {},
  };
  async componentDidMount() {
    const { data } = await getAnimeByMalId(229);
    this.setState({ anime: data });
    console.log("heree", this.state.anime);
  }
  render() {
    return (
      <div className="card text-white bg-dark mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              className="card-img-top"
              src={this.state.anime.image_url}
              alt="img"
              height="100%"
              width="100%"
            ></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{this.state.anime.title}</h5>
              <p className="card-text small">
                {this.state.anime.genres &&
                  this.state.anime.genres.map((genre) => (
                    <span>{genre.name} </span>
                  ))}
                <br />

                <span style={{ color: "red" }}>
                  {" "}
                  Rating: {this.state.anime.rating}
                </span>
              </p>
            </div>
            <div className="card-footer">
              <p className="card-text">
                <small className="text-muted">
                  Rated - {this.state.anime.score}/10
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
