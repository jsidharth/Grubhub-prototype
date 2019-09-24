import { NavLink } from "react-router-dom";
import { Navbar, ListGroup } from "react-bootstrap";
import React, { Component } from "react";
import {connect} from 'react-redux';
import "./style.css";

const routes = {
  owner: [
    {
      url: "/account",
      name: "Account Info"
    },
    {
      url: "/order",
      name: "Orders"
    },
    {
      url: "/menu",
      name: "Menu"
    }
  ],
  customer: [
    {
      url: "/search",
      name: "Search"
    },
    {
      url: "/account",
      name: "Account Info"
    },
    {
      url: "/order",
      name: "Orders"
    }
  ]
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      activeIndex: 0,
      userId: ''
    };
  }

  componentDidMount() {
    if (
      window.location.pathname === "/signup" ||
      window.location.pathname === "/" ||
      window.location.pathname === "/signin"
    ) {
      this.setState({
        showSidebar: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname === "/signup" ||
      nextProps.location.pathname === "/" ||
      nextProps.location.pathname === "/signin"
    ) {
      this.setState({
        showSidebar: false
      });
    } else {
      this.setState({
        showSidebar: true,
        userId: nextProps.user.id
      });
    }
  }

  render() {
    const { showSidebar, activeIndex, userId } = this.state;
    return (
      <div>
        {showSidebar ? (
          <div>
            <nav className="sidebar flex-column">
              <ListGroup variant="flush">
                <ListGroup.Item variant="light">
                  <Navbar.Brand>
                    <NavLink to={"/"}>Grubhub</NavLink>
                  </Navbar.Brand>
                </ListGroup.Item>
                {this.props.user.type === "Owner"
                  ? routes.owner.map((route, index) => {
                      return (
                        <NavLink
                          key={`/${userId}${route.url}`}
                          to={`/${userId}${route.url}`}>
                          <ListGroup.Item
                            action
                            variant="light"
                            active={activeIndex === index}
                            onClick={() => {
                              this.setState({ activeIndex: index });
                            }}>
                            {route.name}
                          </ListGroup.Item>
                        </NavLink>
                      );
                    })
                  : routes.customer.map((route, index) => {
                      return (
                        <NavLink
                          key={`/${userId}${route.url}`}
                          to={`/${userId}${route.url}`}>
                          <ListGroup.Item
                            action
                            variant="light"
                            active={activeIndex === index}
                            onClick={() => {
                              this.setState({ activeIndex: index });
                            }}>
                            {route.name}
                          </ListGroup.Item>
                        </NavLink>
                      );
                    })}
              </ListGroup>
            </nav>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Sidebar);