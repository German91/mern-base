import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

import { logout, getProfile } from '../services/authentication';
import Auth from '../utils/Auth';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = { profile: null };

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate() {
    if (Auth.isAuthenticated() && !this.state.profile) {
      getProfile((err, response) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({ profile: response.data.user });
        }
      });
    }
  }

  handleLogout() {
    logout((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  render() {
    const { profile } = this.state;
    const isLogged = Auth.isAuthenticated();

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><Link to="/">MERN</Link></Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav activeKey="active">
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
          </Nav>

          <Nav pullRight>
            { isLogged && profile ?
              <NavDropdown eventKey={3} title={ profile.username } id="profile-dropdown">
                <MenuItem eventKey={3.1}>Profile</MenuItem>
                <MenuItem eventKey={3.2} onClick={ this.handleLogout }>Logout</MenuItem>
              </NavDropdown>
            : ''}

            { !isLogged ?
              <LinkContainer to="/login">
                <NavItem eventKey={4}>Login</NavItem>
              </LinkContainer>
            : '' }

            { !isLogged ?
              <LinkContainer to="/signup">
                <NavItem eventKey={5}>Sign Up</NavItem>
              </LinkContainer>
            : '' }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  profile: PropTypes.object,
};

export default Navigation;
