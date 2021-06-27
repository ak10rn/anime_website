import React, { Component } from "react";
import poster from "../icons/aot.jpg";

class Card extends Component {
  render() {
    return (
      <div class="card">
        <img className="card-img-top" src={poster} alt="Card"></img>
        <div className="card-body">
          <h5 className="card-title">Shingeki no Kyojin</h5>
          <p className="card-text small">
            Centuries ago, mankind was slaughtered to near extinction by
            monstrous humanoid creatures called titans. To ensure their
            survival, the remnants of humanity began living within defensive
            barriers. However, that fragile calm is soon shattered when a
            colossal titan manages to breach the supposedly impregnable outer
            wall.
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
