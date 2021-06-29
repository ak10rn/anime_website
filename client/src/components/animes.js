import React, { Component } from "react";
import {
  getAnimes,
  getAnimeByMalId,
  getAnimeBySearchQuery,
} from "../services/animeService";

class Animes extends Component {
  state = {
    animes: [],
    anime: {},
    anime2: {},
  };

  async componentDidMount() {
    //console.log("test", props);
    const { data } = await getAnimes();
    try {
      this.setState({ animes: Object.values(data) });
    } catch (err) {
      console.log(err);
    }
    const { data: anime } = await getAnimeByMalId(1);
    try {
      this.setState({ anime });
      // console.log("data",anime);
    } catch (err) {
      console.log(err);
    }
    const { data: anime2 } = await getAnimeBySearchQuery({ q: "grand blue" });
    try {
      this.setState({ anime2 });
      console.log("data2", anime2.results[0].title);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { animes, anime, anime2 } = this.state;
    return (
      <>
        <div>{anime.title}</div>
        {/* <div>{anime2.results[0].title}</div> */}
        <div className="list">
          {animes.map((anime) => (
            <div key={anime._id}>{anime.name}</div>
            //passed {...this.props} so that we can use this.props.history.push() in Anime component class too
            //as history is in the props of animeList due to presence of Router in animeList's parent
            //if you'd used functional component as Anime then you could have used useHistory hook instead of passing this.props(probably)
          ))}
        </div>
      </>
    );
  }
}

export default Animes;
