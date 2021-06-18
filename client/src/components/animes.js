import React, { Component } from 'react';
import { getAnimes } from "../services/animeService";

class Animes extends Component {
    state = {
        animes: []
    }

    async componentDidMount() {
        //console.log("test", props);
        const { data } = await getAnimes();
        try {
            this.setState({ animes: Object.values(data) })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { animes } = this.state;
        return (
            <div className="list">
                {
                    animes.map(anime => (
                        <div key={anime._id}>{anime.name}</div>
                        //passed {...this.props} so that we can use this.props.history.push() in Anime component class too
                        //as history is in the props of animeList due to presence of Router in animeList's parent
                        //if you'd used functional component as Anime then you could have used useHistory hook instead of passing this.props(probably)
                    ))
                }
            </div>
        );
    }
}
 
export default Animes;