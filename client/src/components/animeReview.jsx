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

const AnimeReview = (props) => {
  const { review, user, deleteReview } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const [modal, setModal] = useState(false);

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
          alt="User Image"
        />
        <div
          key={review.user.name + "div"}
          className="user-info d-flex flex-column"
        >
          <strong key={review.user.name + "strong"}> {review.user.name}</strong>
          <span key={review.user.name + "span"}>
            Rated {review.user_rating} out of 10
          </span>
        </div>
        {review.user.name === user.name && (
          <>
            <Button
              className="mx-2 position-absolute"
              color="danger"
              style={{ right: 0 }}
              onClick={toggleModal}
              id="deleteTooltip"
            >
              <i className="fa fa-times" />
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="deleteTooltip"
              toggle={toggleTooltip}
            >
              Delete Review
            </Tooltip>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader>Delete Review</ModalHeader>
              <ModalBody>Are you sure buddy :(</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={confirmDelete}>
                  Delete
                </Button>{" "}
                <Button color="primary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
      <div key={review.user.name + "user-comment"} className="user-comment">
        <ReactReadMoreReadLess
          charLimit={400}
          readMoreText={"Read more ▼"}
          readLessText={"Read less ▲"}
        >
          {review.comment}
        </ReactReadMoreReadLess>
      </div>
      {/* {console.log('user:',user)} */}
    </div>
  );
};

export default AnimeReview;
