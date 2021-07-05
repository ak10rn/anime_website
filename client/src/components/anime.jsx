import React, { Component } from "react";
import "./anime.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAnime, getAnimeByMalId, saveAnime, saveReview } from "../services/animeService";
import RateModal from "./rateModal";

const Anime = (props) => {
  const [anime, setAnime] = useState({});
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState("-date");
  const [score, setScore] = useState(null);
  
  const { id } = useParams();

  useEffect(async () => {
    if (!anime.title) {
      try {
        let { data } = await getAnime(id);
        if (!data) {
          try {
            const { data: d } = await getAnimeByMalId(id);
            data = d;
          } catch (err) {
              console.log(err);
          }
        }
        const newAnime = { ...data };
        if (data.reviews) {
          setAndOrderReviews(data.reviews);
          delete newAnime.reviews;
        }
        setAnime(newAnime);
        if(data.reviews.length > 0)setScore(avgScore(data.reviews));
          // console.log("adfasdfadsf",data);
      } catch (err) {
          console.log(err);
      }   
    }
  }, [id])
  
  function avgScore(reviews) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++){
      sum += parseInt(reviews[i].user_rating);
    }
    let avg = sum / reviews.length;
    return avg.toFixed(2);
  }

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result;
        if (property === "date") result = (new Date(a.date) < new Date(b.date)) ? -1 : (new Date(a.date) > new Date(b.date)) ? 1 : 0;
        else result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  const setAndOrderReviews = (newReviews) => {
    let sortedNewReviews = newReviews.sort(dynamicSort(sortBy));
    setReviews(sortedNewReviews);
  };

  const handleAddReview = () => {
    // open modal
    handleModal();
  };

  const handleNewReview = async (e) => {
    const animedb = { ...anime };
    animedb.reviews = reviews.map(review => review._id);
    const newReview = { ...e };
    newReview.mal_id = id;
    const newReviews = [newReview, ...reviews];
    setAndOrderReviews(newReviews);
    animedb.score = avgScore(newReviews);
    setScore(animedb.score);
    // console.log("newReview",newReview);
    try {
      const { data: savedReview } = await saveReview(newReview);
      // console.log("savedReview", savedReview);
      animedb.reviews.push(savedReview._id);
      // console.log("animedb",animedb);
      const { data: savedAnime } = await saveAnime(animedb);
      // console.log("savedAnime",savedAnime);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModal = () => {
    // const NewModal = !modal;
    setModal(!modal);
  };
  return (
    <>
      <RateModal modalState={modal} toggle={handleModal} newReview={handleNewReview}/>
      <div className="container text-light d-flex flex-column">
        <div className="title">
          <p>{anime.title}</p>
        </div>

        <div className="anime-details d-flex flex-row">
          <div className="anime-img">
            <img src={anime.image_url} alt="img" />
          </div>

          <div className="anime-body d-flex flex-column">
            <div className="d-flex flex-row ms-3">
              <div className="anime-rating">
                <h5>Rating</h5>
                <i
                  className="fa fa-star"
                  style={{ color: "gold", fontSize: "1.5rem" }}
                />
                <span> {score}/10</span>
              </div>
            </div>
            <div className="anime-block mt-3 ms-3">
              <span>Episodes: {anime.episodes}</span>
            </div>
            <div className="anime-block ms-3">
              {/* <span>Genre: {anime.genres.join(", ")}</span> */}
            </div>
            <div className="anime-sypnosis ms-3 ">
              <h5 className="underlineUnder">Synopsis</h5>
              <p>{anime.synopsis}</p>
            </div>
          </div>
        </div>

        <div className="anime-reviews d-flex flex-column">
          <div className="d-flex flex-row mb-4 position-relative">
            <h5 className="underlineUnder">Reviews</h5>
            <button
              className="btn btn-primary position-absolute"
              style={{ right: 0 }}
              onClick={handleAddReview}
            >
              <i className="fa fa-plus" /> Add Review
            </button>
          </div>
          {reviews.length !==0 && reviews.map((review) => {
            return (
              <div
                key={review.username + "anime-review"}
                className="anime-review d-flex flex-column"
              >
                <div key={review.username + "user"} className="d-flex flex-row">
                  <img
                    key={review.username + "img"}
                    src="http://placekitten.com/200/300"
                    className="user-img"
                    alt="User Image"
                  />
                  <div
                    key={review.username + "div"}
                    className="user-info d-flex flex-column"
                  >
                    <strong key={review.username + "strong"}> {review.username}</strong>
                    <span key={review.username + "span"}>
                      Rated {review.user_rating} out of 10
                    </span>
                  </div>
                </div>
                <div
                  key={review.username + "user-comment"}
                  className="user-comment"
                >
                  <ReactReadMoreReadLess
                    charLimit={400}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                  >
                    {review.comment}
                  </ReactReadMoreReadLess>
                </div>
              </div>
            );
          })}
          { reviews.length===0 && "No reviews yet, Be the first one to write a review :)" }
        </div>
      </div>
    </>
  );
}

export default Anime;
