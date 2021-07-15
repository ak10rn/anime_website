import React from "react";
import "./anime.css";
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
import AnimeReviews from "./animeReviews";
import AnimeContent from "./animeContent";

const Anime = (props) => {
  const [anime, setAnime] = useState({});
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [score, setScore] = useState(null);
  const [userReview, setUserReview] = useState({ user_rating: 0, comment: "" });

  const { id } = useParams();

  useEffect(() => {
    // console.log(props.user);
    setSortBy("-date");
    async function fun() {
      if (!anime.title) {
        try {
          let { data } = await getAnime(id);
          console.log("first", data);
          if (!data) {
            try {
              const { data: d } = await getAnimeByMalId(id);
              console.log("second", d);
              data = d;
            } catch (err) {
              console.log(err);
            }
          }
          const newAnime = { ...data };
          // console.log(data);
          if (data.reviews) {
            let sortedNewReviews = data.reviews.sort(dynamicSort(sortBy));
            setReviews(sortedNewReviews);
            // console.log("reviews", data.reviews);
            delete newAnime.reviews;
            if (data.reviews.length > 0) setScore(avgScore(data.reviews));
          }
          setAnime(newAnime);
          if (data.reviews.length > 0) setScore(avgScore(data.reviews));
          // console.log("adfasdfadsf",data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fun();
  }, [id, anime.title, sortBy, setSortBy]);

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

  const indexOfReviewMadeByCurrentUser = () => {
    //if returns -1, the no review by the user
    if (!props.user) return console.log("Login first dumbass");
    return reviews.findIndex((review) => review.user.name === props.user.name);
  };

  const handleAddReview = () => {
    // console.log('modal opens')

    toggleModal();
  };

  const handleNewReview = async (e) => {
    console.log("temp");
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
      console.log("savedReview", savedReview);
      animedb.reviews.push(savedReview._id);
      console.log("animedb", animedb);
      const { data: savedAnime } = await saveAnime(animedb);
      console.log("savedAnime", savedAnime);
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
      console.log("savedAnime", savedAnime);
      const { data: deletedReview } = await deleteReview(reviewToBeDeleted);
      console.log("deletedReview", deletedReview);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditReview = async (e) => {
    setUserReview(e);
    if (!props.user) return console.log("Login first dumbass");
    console.log("check", e);

    const newReview = { ...e };
    newReview.mal_id = id;
    newReview.user = { ...props.user };

    const newReviews = [...reviews];
    const index = indexOfReviewMadeByCurrentUser();
    if (index === -1)
      return console.log("there's no review by the the user to edit.");
    newReviews.splice(index, 1, newReview);
    setReviews(newReviews);

    const animedb = { ...anime };
    animedb.reviews = newReviews.map((review) => review._id);
    animedb.score = avgScore(newReviews);
    setScore(animedb.score);

    try {
      const { data: savedReview } = await saveReview(newReview);
      const { data: savedAnime } = await saveAnime(animedb);
      console.log("savedAnime", savedAnime);
      console.log("savedReview", savedReview);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    // const NewModal = !modal;
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <RateModal
        modalState={modal}
        toggle={toggleModal}
        newReview={handleNewReview}
        review={{ value: userReview.user_rating, comment: userReview.comment }}
      />
      <div className="container text-light d-flex flex-column">
        <div className="title">
          <p>{anime.title}</p>
        </div>
        <AnimeContent anime={anime} score={score} />
        <AnimeReviews
          reviews={reviews}
          addReview={handleAddReview}
          deleteReview={handleDeleteReview}
          editReview={handleEditReview}
          user={props.user}
        />
      </div>
    </React.Fragment>
  );
};

export default Anime;
