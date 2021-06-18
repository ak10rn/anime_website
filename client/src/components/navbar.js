import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link className="navbar-brand" to="/">Animes</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ms-auto" navbar>
                                    <NavItem >
                                        <NavLink href="https://github.com/demonhue">
                                            Github
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
 
export default AppNavbar;