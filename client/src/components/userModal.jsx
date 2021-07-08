import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./userModal.css";

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
    const { modalState, toggle, className } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalState}
          toggle={() => toggle()}
          className={className}
        >
          <ModalHeader>Update Your Info</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup align="center">
                <img
                  src={this.state.dp}
                  alt="current dp"
                  height="150"
                  width="150"
                ></img>
                <input type="file" class="custom-file-input"></input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText" style={{ fontFamily: "monospace" }}>
                  User Name
                </Label>
                <Input
                  type="text"
                  name="text"
                  placeholder="name"
                  id="exampleText"
                  value={this.state.userName}
                  //onChange={(event) => this.handleUsernameChange(event)}
                />
                <Label for="exampleText" style={{ fontFamily: "monospace" }}>
                  About
                </Label>
                <Input
                  type="textarea"
                  name="text"
                  placeholder="Bla Bla Bla"
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
        </Modal>
      </div>
    );
  }
}

export default UserModal;
