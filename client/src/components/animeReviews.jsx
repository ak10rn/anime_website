import React, { useState } from "react";
import AnimeReview from "./animeReview";

const AnimeReviews = (props) => {
  const { reviews, addReview, deleteReview, editReview, user } = props;

  const [isReviewed, setReviewed] = useState(false);

  const handledeleteReview = () => {
    setReviewed(false);
    deleteReview();
  };

  return (
    <div className="anime-reviews d-flex flex-column bg-dark">
      <div className="d-flex flex-row mb-4 position-relative">
        <strong style={{ fontSize: "1.6rem" }}>Reviews</strong>

        <div className="position-absolute d-flex flex-row" style={{ right: 0 }}>
          <button
            className={`btn btn-primary mx-2`}
            style={{ right: 0 }}
            onClick={isReviewed ? editReview : addReview}
          >
            <i className={`fa fa-${isReviewed ? "pencil" : "plus"}`} />{" "}
            {isReviewed ? "Edit Review" : "Add Review"}
          </button>
        </div>
      </div>
      {reviews.length !== 0 &&
        reviews.map((review) => {
          if (user && !isReviewed && review.user.name === user.name) {
            setReviewed(true);
          }
          return (
            <AnimeReview
              review={review}
              user={user}
              deleteReview={handledeleteReview}
            />
          );
        })}
      {reviews.length === 0 &&
        "No reviews yet, Be the first one to write a review :)"}
    </div>
  );
};

export default AnimeReviews;
