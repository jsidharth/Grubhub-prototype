import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";

class Navigationbar extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
  }
  render() {
    return (
      <Navbar bg="light" expand="lg" className="fluid">
        {/* TODO REDIRECTION */}
        <Navbar.Brand href="#home">
          <img
            src="https://assets.grubhub.com/assets/img/grubhub/logo-full-primary.svg"
            width="110px"
            height="21px"
            className="d-inline-block align-top"
            alt="GRUBHUB logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto fluid">
            <NavDropdown
              title={this.state.user.first_name}
              id="basic-nav-dropdown"
              drop="left">
                <NavDropdown.Item href={`/${this.state.user.id}/account`}>Account</NavDropdown.Item>
                <NavDropdown.Item href={`/${this.state.user.id}/order`}>Orders</NavDropdown.Item>
                <NavDropdown.Item href={`/${this.state.user.id}/cart`}>Cart</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleSignout}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Navigationbar);
