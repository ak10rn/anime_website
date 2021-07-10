import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./userModal.css";
import dpDock from "../icons/uploaddp.png";

class UserModal extends Component {
  state = {
    userName: "",
    dp:
      "https://www.dpair.com/wp-content/uploads/2017/03/Facebook-Blank-Photo.jpg",
    about: "",
  };

  handleUserNameChange = (e) => {};

  handleDpChange = (e) => {};

  handleAboutChange = (e) => {};

  saveEdit = () => {};

  render() {
    const { modalState, toggle, user } = this.props;
    return (
      <div>
        <Modal isOpen={modalState} toggle={() => toggle()}>
          <div className="">
            <ModalHeader>Update Your Info</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup align="center">
                  <div className="row m-2">
                    <img
                      src={this.state.dp}
                      alt="current dp"
                      height="150"
                      width="150"
                      className="col-5"
                    ></img>
                    <div className="upload-btn-wrapper col">
                      <button className="btn">
                        <img
                          src={dpDock}
                          style={{ opacity: "0.5" }}
                          alt="dock"
                          height="150px"
                          width="150px"
                        />
                      </button>
                      <input type="file" name="myfile" />
                    </div>
                  </div>
                </FormGroup>
                <p align="center" style={{ fontFamily: "monospace" }}>
                  Click or Drag and drop on dock to change your Avatar
                </p>
                <br />
                <FormGroup>
                  <Input
                    type="text"
                    name="text"
                    placeholder="username"
                    id="exampleText"
                    value={this.state.userName}
                    //onChange={(event) => this.handleUsernameChange(event)}
                  />
                  <br />

                  <Input
                    type="textarea"
                    name="text"
                    placeholder="About yourself in 600 characters or less...  "
                    id="exampleText"
                    value={this.state.comment}
                    //onChange={(event) => this.handleAboutChange(event)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.saveEdit()}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={() => toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserModal;
