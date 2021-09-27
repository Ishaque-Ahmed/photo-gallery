import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

class Navigation extends Component {
    state = {
        isOpen: false,
    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        let links = null;
        if (this.props.token === null) {
            links = (
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <Link to="/login"
                            className="nav-link border border-secondary text-primary">
                            Login</Link>
                    </NavItem>
                </Nav>
            )
        } else {
            links = (
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <Link to="/nature" className="nav-link">Nature</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/food" className="nav-link">Food</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/technology" className="nav-link">Technology</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/education" className="nav-link">Education</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout"
                            className="nav-link border border-secondary text-warning">Logout</Link>
                    </NavItem>
                </Nav>
            )
        }
        return (
            <div>
                <Navbar dark color="dark" expand="sm">
                    <div className="container">
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand href="/">Photo Gallery</NavbarBrand>
                        <Collapse navbar isOpen={this.state.isOpen}>
                            {links}
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Navigation);