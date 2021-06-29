import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Data from "../Animes.json";
import SearchBar from "./SearchBar";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  //   NavbarBrand,
  //   UncontrolledDropdown,
  //   DropdownToggle,
  //   DropdownMenu,
  //   DropdownItem,
  //   NavbarText
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <>
        <Navbar color="dark" dark expand="sm" className="sticky-top mb-5">
          <Container>
            <Link className="navbar-brand" to="/">
              <span style={{ color: "greenyellow" }}>Animes</span>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ms-auto" navbar>
                <NavItem>
                  <SearchBar placeholder="Search . . ." data={Data} />
                </NavItem>
                <NavItem style={{ marginLeft: "20px" }}>
                  <NavLink href="https://github.com/demonhue">
                    <i
                      className="fa fa-github"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    {/* Github */}
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AppNavbar;
