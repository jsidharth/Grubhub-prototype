import { NavLink } from 'react-router-dom';
import { Navbar, ListGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import './style.css';

const routes = {
  owner: [
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
  ],
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      activeIndex: 0,
      userId: '',
    };
  }

  componentDidMount() {
    if(this.props.user) {
      this.setState({
        userId: this.props.user.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.userId) {
      this.setState({
        userId: nextProps.user.id
      });
    }
  }
  handleSignout = e => {
    e.preventDefault();
    cookie.remove('token');
    localStorage.clear();
    window.location.href = '/signin';
  };
  render() {
    const {  userId } = this.state;
    return (
      <div className="fixed">
        <nav className="sidebar flex-column">
          <ListGroup variant="flush">
            <ListGroup.Item variant="light">
              <Navbar.Brand>
                <NavLink to={'/'}>Grubhub</NavLink>
              </Navbar.Brand>
              <button type="button" onClick={this.handleSignout} className="btn btn-outline-dark">
                Sign Out
              </button>
            </ListGroup.Item>
            {routes.owner.map((route, index) => {
              return (
                <NavLink key={`/${userId}${route.url}`} to={`/${userId}${route.url}`}>
                  <ListGroup.Item
                    action
                    variant="light"
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
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Sidebar);
