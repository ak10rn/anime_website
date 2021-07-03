import React, { Component } from 'react';
import { getAnimes, getAnimeByMalId, getAnimeBySearchQuery, addReview } from "../services/animeService";

class Animes extends Component {
    state = {
        animes: [],
        anime: {},
        anime2: {}
    }

    async componentDidMount() {
        //console.log("test", props);
        const { data } = await getAnimes();
        console.log("asdfasd", data);
        try {
            this.setState({ animes: Object.values(data) })
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
                { animes && 
                    animes.map(anime => (
                        <div key={anime._id}>
                            { anime.reviews[0] && anime.reviews.map(review => (
                                    <div key={review}>{review}</div>
                                ))
                            }
                        </div>
                        //passed {...this.props} so that we can use this.props.history.push() in Anime component class too
                        //as history is in the props of animeList due to presence of Router in animeList's parent
                        //if you'd used functional component as Anime then you could have used useHistory hook instead of passing this.props(probably)
                    ))
                }
            </div>
            </>
        );
    }
}
 
export default Animes;