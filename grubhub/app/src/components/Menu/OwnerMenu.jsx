import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ownerActions } from "../../js/actions";
import tea from './../../assets/tea.jpg';
import './style.css';
class OwnerMenu extends Component {
  constructor() {
    super();
    this.state = {
      menu: []
    };
  }
  componentDidMount() {
    this.props.getMenu({ restaurant_id: this.props.restaurant.id });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      this.setState({
        menu: nextProps.restaurant.menu
      });
    }
  }
  render() {
    return (
      <div>
        <Link to="/item">
          <button type="button" className="btn btn-outline-success">
            Add Item
          </button>
        </Link>
        <div className="container">
          {this.state.menu && this.state.menu.length
            ? this.state.menu.map(eachSection => {
                return (
                  <div>
                    <label className="col-sm-2 col-form-label col-form-label-lg">
                      {eachSection.section}
                    </label>
                    <div class="card-deck">
                    {eachSection.items.map(item => {
                      let item_detail_link = `/item/detail/${item.id}`;
                      return (
                        <Link to={item_detail_link}>
                          <div class="card menu_item" >
                            <img src={tea} class="card-img-top img-fluid img-thumbnail" alt="..."></img>
                            <div class="card-body">
                              <h5 class="card-title">{item.name}</h5>
                              <p class="card-text">{item.description}</p>
                              <p class="card-text">{item.rate}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
  getMenu: payload => dispatch(ownerActions.getMenu(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerMenu);
