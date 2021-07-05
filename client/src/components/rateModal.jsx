import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

class RateModal extends Component {
  state = {
    value: 0,
    comment: "",
  };

  handleRatingChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleCommentChange = (e) => {
    const comment = e.target.value;
    this.setState({ comment });
  };
  
  reset = () => {
    this.setState({value: 0, comment: ""});
  }

  render() {
    const { modalState, toggle, className, newReview } = this.props;
    const saveComment = () => {
      const user = {
        username: "eren"+Math.random() * 30 + 223 + Math.random() * 45,
        img: "http://placekitten.com/200/300",
        comment: this.state.comment,
        user_rating: this.state.value,
        date: new Date()
      };
      newReview(user);
      toggle();
      this.reset();
    }
    return (
      <div>
        <Modal
          isOpen={modalState}
          toggle={() => toggle()}
          className={className}
        >
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
                  {this.state.value}{" "}
                </span>
                star
              </label>
              <div className="range">
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="10"
                  value={this.state.value}
                  onChange={(event) => this.handleRatingChange(event)}
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
                  value={this.state.comment}
                  onChange={(event) => this.handleCommentChange(event)}
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
  }
}

export default RateModal;
