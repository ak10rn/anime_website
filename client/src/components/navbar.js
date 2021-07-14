import React, { useState } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ProfileIcon from "./profileIcon";
import SearchBar from "./SearchBar";
import logo from "../icons/logo.png";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
} from "reactstrap";

const AppNavbar = (props) => {
  const { user } = props;

  const [isNavDropdownOpen, setNavDropdown] = useState(false);
  const toggleNavbarDropdown = () => setNavDropdown(!isNavDropdownOpen);

  return (
    <React.Fragment>
      <Navbar color="dark" dark expand="sm" className="sticky-top mb-3">
        <Container>
          <Link className="navbar-brand " to="/">
            <img src={logo} width="150px" height="40px" alt="logo" />
          </Link>

          <NavbarToggler onClick={toggleNavbarDropdown} />
          <Collapse isOpen={isNavDropdownOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <SearchBar placeholder="Search . . ." {...props} />
              </NavItem>
              <NavItem style={{ marginLeft: "20px" }}>
                <NavLink href="https://github.com/demonhue">
                  <i className="fa fa-github" style={{ fontSize: "2rem" }}></i>
                  {/* Github */}
                </NavLink>
              </NavItem>
              {!user && (
                <React.Fragment>
                  <NavItem>
                    <Link className="nav-link" to="/register">
                      <Button color="success">Register</Button>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/login">
                      <Button color="info" outline>
                        Login
                      </Button>
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}
              {user && <ProfileIcon user={user} />}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default AppNavbar;
