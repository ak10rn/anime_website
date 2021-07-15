import React, { useState, useEffect, useMemo } from "react";
import "./anime.css";
import { useParams } from "react-router-dom";
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
  const [userReview, setUserReview] = useState({});

  const { id } = useParams();
  const toggleModal = () => setModal(!modal);

  useEffect(async () => {
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
            // if (data.reviews.length > 0) setScore(avgScore(data.reviews));
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
    const index = indexOfReviewMadeByCurrentUser();
    if (index !== -1) {
      const user_review = reviews[index];
      setUserReview({
        check: true,
        value: user_review.user_rating,
        comment: user_review.comment,
        id: user_review._id
      });
      // console.log(userReview);
    } else {
      setUserReview({
        check: false,
        value: 0,
        comment: "",
      });
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

  const indexOfReviewMadeByCurrentUser = () => {
    //if returns -1, the no review by the user
    if (!props.user) return console.log("Login first dumbass");
    return reviews.findIndex((review) => review.user.name === props.user.name);
  };

  const handleReview = () => toggleModal();

  // useMemo(() => {
  //   const index = indexOfReviewMadeByCurrentUser();
  //   if (index !== -1) {
  //     const user_review = reviews[index];
  //     setUserReview({
  //       check: true,
  //       value: user_review.user_rating,
  //       comment: user_review.comment,
  //       id: user_review._id
  //     });
  //     // console.log(userReview);
  //   } else {
  //     setUserReview({
  //       check: false,
  //       value: 0,
  //       comment: "",
  //     });
  //   }
  // }, [reviews]);

  const handleNewReview = async (e) => {
    setUserReview({ check: true, value: e.user_rating, comment: e.comment });
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
      setUserReview({
        check: true,
        value: savedReview.user_rating,
        comment: savedReview.comment,
        id: savedReview._id
      })
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
    setUserReview({ check: false, value: 0, comment: "" });
  };

  const handleEditReview = async (e) => {
    if (!props.user) return console.log("Login first dumbass");
    // console.log("check", e);

    const newReview = { ...e };
    newReview.mal_id = id;
    newReview.user = { ...props.user };
    newReview._id = userReview.id;
    console.log("newReview", newReview);
    setUserReview({
      check: true,
      value: newReview.user_rating,
      comment: newReview.comment,
      id: newReview._id
    })
    
    const newReviews = [...reviews];
    const index = indexOfReviewMadeByCurrentUser();
    if (index === -1)
      return console.log("there's no review by the the user to edit.");
    newReviews.splice(index, 1, newReview);
    setReviews(newReviews);

    const animedb = { ...anime };
    animedb.reviews = newReviews.map((review) => review._id);
    animedb.reviews[index] = userReview.id;
    animedb.score = avgScore(newReviews);
    setScore(animedb.score);
    console.log("editanimedb", animedb);
    try {
      const { data: savedReview } = await saveReview(newReview);
      const { data: savedAnime } = await saveAnime(animedb);
      console.log("editsavedAnime", savedAnime);
      console.log("editsavedReview", savedReview);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnValueOfModal = (e) => userReview.check ? handleEditReview(e) : handleNewReview(e);
  return (
    <React.Fragment>
      <RateModal
        modalState={modal}
        toggle={toggleModal}
        newReview={handleReturnValueOfModal}
        review={userReview}
      />
      <div className="container text-light d-flex flex-column">
        <div className="title">
          <p>{anime.title}</p>
        </div>
        <AnimeContent anime={anime} score={score} />
        <AnimeReviews
          reviews={reviews}
          addReview={handleReview}
          deleteReview={handleDeleteReview}
          user={props.user}
        />
      </div>
    </React.Fragment>
  );
};

export default Anime;
