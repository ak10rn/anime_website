import React, { Component } from "react";
import "./anime.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAnime,
  getAnimeByMalId,
  saveAnime,
  saveReview,
  deleteReview,
} from "../services/animeService";
import RateModal from "./rateModal";

const Anime = (props) => {
  const [anime, setAnime] = useState({});
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState("-date");
  const [score, setScore] = useState(null);

  const { id } = useParams();

  useEffect(async () => {
    console.log(props.user);
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
        console.log(data);
        if (data.reviews) {
          setAndOrderReviews(data.reviews);
          console.log("reviews", data.reviews);
          delete newAnime.reviews;
        }
        setAnime(newAnime);
        if (data.reviews.length > 0) setScore(avgScore(data.reviews));
        // console.log("adfasdfadsf",data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  function avgScore(reviews) {
    if (reviews.length === 0) return -1;
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += parseInt(reviews[i].user_rating);
    }
    let avg = sum / reviews.length;
    return avg.toFixed(2);
  }

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result;
      if (property === "date")
        result =
          new Date(a.date) < new Date(b.date)
            ? -1
            : new Date(a.date) > new Date(b.date)
            ? 1
            : 0;
      else
        result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  const setAndOrderReviews = (newReviews) => {
    let sortedNewReviews = newReviews.sort(dynamicSort(sortBy));
    setReviews(sortedNewReviews);
  };

  const indexOfReviewMadeByCurrentUser = () => {
    //if returns -1, the no review by the user
    if (!props.user) return console.log("Login first dumbass");
    return reviews.findIndex((review) => review.user.name === props.user.name);
  };

  const handleAddReview = () => {
    // open modal
    handleModal();
  };

  const handleNewReview = async (e) => {
    if (!props.user) return console.log("Login first dumbass");

    if (indexOfReviewMadeByCurrentUser() !== -1)
      return console.log("theres already a review made by current user");

    const animedb = { ...anime };
    animedb.reviews = reviews.map((review) => review._id);

    const newReview = { ...e };
    newReview.mal_id = id;
    newReview.user = { ...props.user };

    const newReviews = [newReview, ...reviews];
    setReviews(newReviews);

    animedb.score = avgScore(newReviews);
    setScore(animedb.score);

    const toBeSavedReview = { ...newReview };
    delete toBeSavedReview.user;
    toBeSavedReview.user = props.user._id;
    try {
      const { data: savedReview } = await saveReview(toBeSavedReview);
      // console.log("savedReview", savedReview);
      animedb.reviews.push(savedReview._id);
      // console.log("animedb",animedb);
      const { data: savedAnime } = await saveAnime(animedb);
      // console.log("savedAnime",savedAnime);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReview = async () => {
    if (!props.user) return console.log("Login first dumbass");

    const newReviews = [...reviews];
    const index = indexOfReviewMadeByCurrentUser();
    if (index === -1)
      return console.log("there's no review by the the user to delete.");
    const reviewToBeDeleted = { ...newReviews[index] };
    newReviews.splice(index, 1);
    setReviews(newReviews);

    const animedb = { ...anime };
    // console.log("newReviews", newReviews);
    animedb.reviews = newReviews.map((review) => review._id);
    // console.log("animedb", animedb);
    animedb.score = avgScore(newReviews);
    setScore(animedb.score);

    try {
      const { data: savedAnime } = await saveAnime(animedb);
      // console.log("savedAnime",savedAnime);
      const { data: deletedReview } = await deleteReview(reviewToBeDeleted);
      // console.log("deletedReview",deletedReview);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditReview = async (e) => {
    if (!props.user) return console.log("Login first dumbass");

    const newReview = { ...e };
    newReview.mal_id = id;
    newReview.user = { ...props.user };

    const newReviews = [...reviews];
    const index = indexOfReviewMadeByCurrentUser();
    if (index === -1)
      return console.log("there's no review by the the user to delete.");
    newReviews.splice(index, 1, newReview);
    setReviews(newReviews);

    const animedb = { ...anime };
    animedb.score = avgScore(newReviews);
    setScore(animedb.score);

    try {
      const { data: savedReview } = await saveReview(newReview);
      const { data: savedAnime } = await saveAnime(animedb);
      // console.log("savedAnime",savedAnime);
      // console.log("savedReview",savedAnime);
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
      <RateModal
        modalState={modal}
        toggle={handleModal}
        newReview={handleNewReview}
      />
      <div className="container text-light d-flex flex-column">
        <div className="title">
          <p>{anime.title}</p>
        </div>

        <div className="anime-details">
          <div className="anime-img">
            <img src={anime.image_url} alt="" />
          </div>

          <div className="anime-body bg-dark d-flex flex-column mx-4 px-1 pt-2 w-100">
            <div className="d-flex flex-column px-2 mx-2">
              <div className="anime-block pt-2">
                <span>
                  <strong>Rating:</strong> {score}/10
                </span>
              </div>
              <div className="anime-block">
                <span>
                  <strong>Episodes:</strong> {anime.episodes}
                </span>
              </div>
              <div className="anime-block">
                {anime.genres && (
                  <span>
                    <strong>Genre:</strong>{" "}
                    {anime.genres.map((genre) => genre.name).join(", ")}
                  </span>
                )}
              </div>
              <div className="my-3">
                <span>
                  <strong>Synopsis</strong>
                  <p className="anime-sypnosis-content">{anime.synopsis}</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="anime-reviews d-flex flex-column bg-dark">
          <div className="d-flex flex-row mb-4 position-relative">
            <strong style={{ fontSize: "1.6rem" }}>Reviews</strong>
            <div
              className="position-absolute d-flex flex-row"
              style={{ right: 0 }}
            >
              <button
                className="btn btn-primary mx-2"
                style={{ right: 0 }}
                onClick={handleAddReview}
              >
                <i className="fa fa-plus" /> Add Review
              </button>
              <button
                className="btn btn-danger mx-2"
                style={{ left: 0 }}
                onClick={handleDeleteReview}
              >
                <i className="fa fa-minus" /> Delete Review
              </button>
            </div>
          </div>
          {reviews.length !== 0 &&
            reviews.map((review) => {
              return (
                <div
                  key={review.user.name + "anime-review"}
                  className="anime-review d-flex flex-column"
                >
                  <div
                    key={review.user.name + "user"}
                    className="d-flex flex-row"
                  >
                    <img
                      key={review.user.name + "img"}
                      src={review.user.image}
                      className="user-img"
                      alt="User Image"
                    />
                    <div
                      key={review.user.name + "div"}
                      className="user-info d-flex flex-column"
                    >
                      <strong key={review.user.name + "strong"}>
                        {" "}
                        {review.user.name}
                      </strong>
                      <span key={review.user.name + "span"}>
                        Rated {review.user_rating} out of 10
                      </span>
                    </div>
                  </div>
                  <div
                    key={review.user.name + "user-comment"}
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
          {reviews.length === 0 &&
            "No reviews yet, Be the first one to write a review :)"}
        </div>
      </div>
    </>
  );
};

export default Anime;
