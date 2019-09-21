import { NavLink } from 'react-router-dom';
import { Navbar, ListGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import './style.css';

const routes = [
  {
    url: '/account',
    name: 'Account Info',
  },
  {
    url: '/order',
    name: 'Orders',
  },

  {
    url: '/menu',
    name: 'Menu',
  },
];
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      activeIndex: 0,
      userId: 1,
    };
  }

  componentDidMount() {
    if (
      window.location.pathname === '/signup' ||
      window.location.pathname === '/' ||
      window.location.pathname === '/signin'
    ) {
      this.setState({
        showSidebar: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname === '/signup' ||
      nextProps.location.pathname === '/' ||
      nextProps.location.pathname === '/signin'
    ) {
      this.setState({
        showSidebar: false,
      });
    } else {
      this.setState({
        showSidebar: true,
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
                    <NavLink to={'/'}>Grubhub</NavLink>
                  </Navbar.Brand>
                </ListGroup.Item>
                {routes.map((route, index) => {
                  return (
                    <NavLink key={`/${userId}${route.url}`} to={`/${userId}${route.url}`}>
                      <ListGroup.Item
                        action
                        variant="light"
                        active={activeIndex === index}
                        onClick={() => {
                          this.setState({ activeIndex: index });
                        }}
                      >
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
