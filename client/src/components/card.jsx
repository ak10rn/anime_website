import React, { Component } from "react";
import "./card.css";
import RateModal from "./rateModal";


import { getAnimeByMalId } from "../services/animeService";

class Card extends Component {
  state = {
    anime: {},
    modal: false,
  };
  async componentDidMount() {
    const { data } = await getAnimeByMalId(229);
    this.setState({ anime: data });
    console.log("heree", this.state.anime);
  }
  render() {
    const handleModal = () => {
      const modal = !this.state.modal;
      this.setState({ modal });
    };
    return (
      <React.Fragment>
        <div
          className="card shadow text-white bg-dark mb-3 ho"
          style={{ cursor: "pointer" }}
        >
          <RateModal modalState={this.state.modal} toggle={handleModal} />
          <div className="middle" onClick={handleModal}>
            <div className="text">Know Me Senpai!</div>
          </div>
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
                  <span style={{ color: "#FF355E" }}>
                    {" "}
                    Rating: {this.state.anime.rating}
                  </span>
                </p>
              </div>
              <div className="card-footer">
                <p className="card-text">
                  <small className="text-muted">
                    <span style={{ color: "	#29AB87" }}>
                      Rated - {this.state.anime.score}/10
                    </span>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Card;
