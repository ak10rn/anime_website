import React, { Component } from "react";
import { getAnimeByMalId } from "../services/animeService";
import "./anime.css";

class Anime extends Component {
  state = {
    anime: {
      title: "Attack on Titan",
      rating: 8,
      img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      sypnosis:
        "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
    },
    reviews: [
      {
        name: "anonymous",
        img: "http://placekitten.com/30/30",
        comment: `Oh dear Shingeki no Kyojin, where do I even begin. If you've talked with your friends about anime, then the couple anime that everyone talks about are Naruto, Bleach, One Piece, Dragon Ball, and... Shingeki no Kyojin. What's the difference between Shingeki and the rest? Shingeki only has 25 episodes so far yet it's on par in popularity with the other super long, Americanized anime. Why is it popular? Well that's simply because it's stunningly amazing. Those people that call Shingeki no Kyojin "overrated" may not have the same taste as me, and that's perfectly fine, but in my honest opinion, Shingeki no Kyojin is one of if not the greatest anime to be made. It's not popular for no reason.`,
        userRating: "6",
        id: 132434,
      },
      {
        name: "mikasa ackerman",
        img: "http://placekitten.com/200/300",
        comment: `The story is one of the most captivating stories I've ever seen. 100 years prior to the start of the anime, humanity has been on the bridge of extinction due to the monstrous humanoid Titans that devour humans. Now, present day in the anime, the remaining small population of mankind lives confined within 3 "heavenly" walls that are so tall and sturdy that even the titans can't break in. The most outward wall was named, Wall Maria, the middle wall was named Wall Rose, and the most outward wall named Wall Sina. Unfortunately for mankind, a colossal titan, one that is even bigger than the 50 meter heavenly walls, breaks Wall Maria, allowing the other titans to rampage the city, thus leading to another massacre of mankind. During this massacre, our main characters, Eren Yeager and Mikasa Ackerman watch in horror as a horrifying titan rips their mother's head off, then gobbles her up whole. Vowing that he'd one day avenge mankind and exterminate all the titans, Eren Yeager trains to become a survey corp, brave heroic soldiers who go outside the walls, into the plains in order to fight the titans. But we soon find out, that Eren is much more special than he seems, not only is he a brave warrior, but he's also something else that could be the key to humanity's survival, but could also be humanity's destruction.`,
        userRating: "8",
        id: 4334,
      },
      {
        name: "historia",
        img: "http://placekitten.com/200/300",
        comment: `My 3-word thoughts on the anime: Epic, Dynamic, Masterpiece. The suspense build-up was absolutely amazing, yet there was still room for improvement; that shows just how epic this anime can get. The anime not only includes epic fights, but lots of dialogue, and for those of you that hate dialogue, I feel sorry for you people whom only watch for action. The anime includes lots of other things as well: there's lots of half-hearted, hilarious scenes, as well as sad, tragic scenes. The anime certainly has a good amount of gore, and will break your heart frequently (if you get attached to the characters). Many characters end up getting gobbled up mercilessly while trying to protect humanity in ways that are quite *shivers*. Have I teared up in the anime? As a matter of fact, I have.`,
        userRating: "10",
        id: 3453344,
      },
    ],
  };
  handleAddReview = () => {
    // open modal

    // receive response from modal
    let newReview = {
      name: "eren",
      img: "http://placekitten.com/200/300",
      comment: "new comment",
      userRating: "8",
      id: 343234234,
    };
    const reviews = [newReview, ...this.state.reviews];
    this.setState({ reviews });
  };
  render() {
    return (
      <>
        <div className="container text-light">
          <div className="title">
            <p>{this.state.anime.title}</p>
          </div>
          <div className="anime-box">
            <div className="left-panel">
              <div className="anime-img">
                <img src={this.state.anime.img} alt="img" />
              </div>
            </div>
            <div className="anime-body">
              <div className="anime-rating">
                <h5>Rating</h5>
                <i
                  className="fa fa-star"
                  style={{ color: "gold", fontSize: "1.5rem" }}
                />
                <span> {this.state.anime.rating}/10</span>
              </div>
              <div className="anime-sypnosis">
                <h5 className="underlineUnder">Sypnosis</h5>
                <p>{this.state.anime.sypnosis}</p>
              </div>
              <div className="anime-reviews">
                <div className="anime-reviews-head mb-4 position-relative">
                  <h5 className="underlineUnder">Reviews</h5>
                  <button
                    className="btn btn-secondary position-absolute"
                    style={{ right: 0 }}
                    onClick={this.handleAddReview}
                  >
                    <i className="fa fa-plus" /> Add Review
                  </button>
                </div>
                {this.state.reviews.map((review) => {
                  return (
                    <div key={review.id+'anime-review'} className="anime-review">
                      <div key={review.id+'user-info'} className="user-info">
                        <img key={review.id+'img'} src={review.img} alt="User Image" />
                        <div key={review.id+'div'}>
                          <strong key={review.id+'strong'}> {review.name}</strong>
                          <span key={review.id+'span'}>Rated {review.userRating} out of 10</span>
                        </div>
                      </div>
                      <div key={review.id+'user-comment'} className="user-comment">
                        <p key={review.id+'p'}>{review.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Anime;
