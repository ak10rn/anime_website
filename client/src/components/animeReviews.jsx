import React, { useState } from "react";
import AnimeReview from "./animeReview";

const AnimeReviews = (props) => {
  const { reviews, addReview, deleteReview, user } = props;
  const [isReviewed, setReviewed] = useState(false);

  const handledeleteReview = () => {
    setReviewed(false);
    deleteReview();
  };

  return (
    <div key="1asdasdf" className="anime-reviews d-flex flex-column bg-dark">
      <div key="2sdfsfads" className="d-flex flex-row mb-4 position-relative">
        <strong key="3sdfghgsgfad" style={{ fontSize: "1.6rem" }}>
          Reviews
        </strong>

        <div
          key="4asd5"
          className="position-absolute d-flex flex-row"
          style={{ right: 0 }}
        >
          <button
            key="5asc"
            className={`btn btn-primary mx-2`}
            style={{ right: 0 }}
            onClick={addReview}
          >
            <i key="6ascasdfad" className={`fa fa-${isReviewed ? "pencil" : "plus"}`} />{" "}
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
              key={review.date}
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
