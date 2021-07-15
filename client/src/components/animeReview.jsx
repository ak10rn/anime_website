import React, { useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import {
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";

const AnimeReview = (props) => {
  const { review, user, deleteReview } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const toggleModal = () => setModal(!modal);
  const confirmDelete = () => {
    toggleModal();
    deleteReview();
  };
  return (
    <div
      key={review.user.name + "anime-review"}
      className="anime-review d-flex flex-column"
    >
      <div
        key={review.user.name + "user"}
        className="d-flex flex-row position-relative"
      >
        <img
          key={review.user.name + "img"}
          src={review.user.image}
          className="user-img"
          alt="User_Image"
        />
        <div
          key={review.user.name + "div"}
          className="user-info d-flex flex-column"
        >
          <strong key={review.user.name + "strong"}>
            <Link
              key={review.user.name + "profile-link"}
              to={`/profile/${review.user.name}`}
              className="user-name"
            >
              {review.user.name}
            </Link>
          </strong>
          <span key={review.user.name + "span"}>
            Rated {review.user_rating} out of 10
          </span>
        </div>
        {user && review.user.name === user.name && (
          <>
            <Button
              key={review.user.name + "delete-button"}
              className="mx-2 position-absolute"
              color="danger"
              style={{ right: 0 }}
              onClick={toggleModal}
              id="deleteTooltip"
              size="sm"
            >
              <i
                key={review.user.name + "delete-icon"}
                className="fa fa-times"
              />
            </Button>
            <Tooltip
              key={review.user.name + "delete-button-tooltip"}
              placement="top"
              isOpen={tooltipOpen}
              target="deleteTooltip"
              toggle={toggleTooltip}
            >
              Delete Review
            </Tooltip>
            <Modal
              key={review.user.name + "delete-modal"}
              isOpen={modal}
              toggle={toggleModal}
            >
              <ModalHeader key={review.user.name + "delete-modal-header"}>
                Delete Review
              </ModalHeader>
              <ModalBody key={review.user.name + "delete-modal-body"}>
                Are you sure buddy :(
              </ModalBody>
              <ModalFooter key={review.user.name + "delete-modal-footer"}>
                <Button
                  key={review.user.name + "delete-modal-button-1"}
                  color="danger"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>{" "}
                <Button
                  key={review.user.name + "delete-modal-button-2"}
                  color="primary"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
      <div key={review.user.name + "user-comment"} className="user-comment">
        <ReactReadMoreReadLess
          key={review.user.name + "comment-text"}
          charLimit={400}
          readMoreText={"Read more ▼"}
          readLessText={"Read less ▲"}
        >
          {review.comment}
        </ReactReadMoreReadLess>
      </div>
    </div>
  );
};

export default AnimeReview;
