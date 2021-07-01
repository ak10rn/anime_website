import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

const RateModal = (props) => {
  const { modalState, toggle, className } = props;

  const [value, setValue] = useState(0);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      <Modal isOpen={modalState} toggle={() => toggle} className={className}>
        <ModalHeader toggle={() => toggle}>Rate Me Senpai! UwU</ModalHeader>
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
                onChange={(event) => handleChange(event)}
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
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle}>
            Hai
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RateModal;
