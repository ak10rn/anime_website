import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

const RateModal = (props) => {
  const [value, setValue] = useState({});
  const [comment, setComment] = useState({});

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleCommentChange = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const reset = () => {
    setValue(0);
    setComment("");
  };
  useEffect(() => {
    const { value, comment } = props.review;
    setValue(value);
    setComment(comment);
  }, [props]);

  const { modalState, toggle, className, newReview } = props;
  // console.log(props.review);
  const saveComment = () => {
    const user = {
      comment: comment,
      user_rating: value,
      // date: new Date(),
    };
    if (!props.review.check) user.date = new Date();
    newReview(user);
    toggle();
  };
  return (
    <div>
      <Modal isOpen={modalState} toggle={() => toggle()} className={className}>
        <ModalHeader>Rate Me Senpai! UwU</ModalHeader>
        <ModalBody>
          <Form>
            <label
              className="form-label"
              htmlFor="rating"
              style={{ fontFamily: "monospace" }}
            >
              I rate this anime
              <span
                style={{
                  color: "red",
                  fontFamily: "fantasy",
                  fontSize: "20px",
                }}
              >
                {" "}
                {value}{" "}
              </span>
              star
            </label>
            <div className="range">
              <input
                type="range"
                className="form-range"
                min="0"
                max="10"
                value={value}
                onChange={(event) => handleRatingChange(event)}
                id="rating"
              />
            </div>
            <FormGroup>
              <Label for="exampleText" style={{ fontFamily: "monospace" }}>
                Comment
              </Label>
              <Input
                type="textarea"
                name="text"
                placeholder="KONO DIO DAAAA!!"
                id="exampleText"
                spellCheck="false"
                value={comment}
                onChange={(event) => handleCommentChange(event)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => saveComment()}>
            Hai
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RateModal;
