import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ownerActions } from "../../js/actions";
import _ from "lodash";
import { Container, Row, Card } from "react-bootstrap";
import "./style.css";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "react-js-pagination";

class OwnerMenu extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      sections: [],
      sections_per_page: 2,
      active_page: 1
    };
  }
  componentDidMount() {
    if (this.props.restaurant && this.props.restaurant.id) {
      this.props.getMenu({ restaurant_id: this.props.restaurant.id });
    }
  }
  componentWillReceiveProps(nextProps) {
    let sections = [];
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      sections = nextProps.restaurant.menu.map(eachSection => ({
        name: eachSection.section,
        id: eachSection.id,
        items: _.map(eachSection.items, "id"),
        updated_name: ""
      }));
    }
    this.setState({
      menu: nextProps.restaurant.menu,
      sections
    });
  }

  handleChange = e => {
    e.preventDefault();
    let key = e.currentTarget.id;
    let value = e.currentTarget.value;
    if (new RegExp("^[a-zA-z]+$").test(value)) {
      let updatedSection = [...this.state.sections];
      _.find(updatedSection, { id: key }).updated_name = value;
      this.setState({
        sections: updatedSection
      });
    } else {
      toast.warning("Oops! Only Alphabets");
    }
  };

  handleEdit = e => {
    e.preventDefault();
    const current_section = _.find(this.state.sections, {
      id: e.currentTarget.value
    });
    if (current_section.updated_name && e.currentTarget.name === "edit") {
      current_section.restaurant_id = this.props.restaurant.id;
      this.props.editSection(current_section);
    } else if (e.currentTarget.name === "delete") {
      current_section.restaurant_id = this.props.restaurant.id;
      this.props.deleteSection(current_section);
    } else {
      toast.warning("Oops! No update!");
    }
  };

  handlePageChange = pageNumber => {
    this.setState({
      active_page: pageNumber
    });
  };

  render() {
    const indexOfLastItem = this.state.active_page * this.state.sections_per_page;
        const indexOfFirstItem = indexOfLastItem - this.state.sections_per_page;
        const currentSections = this.state.menu && this.state.menu.length ?
          this.state.menu.slice(indexOfFirstItem, indexOfLastItem) : [];
        console.log(currentSections)
    return (
      <div>
        <Sidebar />
        <Container className="owner_menu">
          <h1>MENU</h1>
          <Row className="add-item">
            <Link to="/item">
              <button type="button" className="btn btn-outline-success">
                Add Item
              </button>
            </Link>
          </Row>
          <div className="container">
            {currentSections && currentSections.length
              ? currentSections.map(eachSection => {
                  return (
                    <Container key={eachSection.section}>
                      <Row>
                        <label className="col-sm-2 col-form-label col-form-label-lg">
                          {eachSection.section}
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            key={eachSection.id}
                            id={eachSection.id}
                            placeholder="Section Name"
                            pattern="[a-z A-z]+"
                            title="Only Alphabets"
                            required
                            aria-describedby="button-addon4"
                          />
                          <div
                            className="input-group-append"
                            id="button-addon4">
                            <button
                              className="btn btn-outline-secondary"
                              type="submit"
                              name="edit"
                              value={eachSection.id}
                              onClick={this.handleEdit}>
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              name="delete"
                              value={eachSection.id}
                              onClick={this.handleEdit}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <Container>
                          <Row>
                            {eachSection.items.map(item => {
                              let item_detail_link = `/item/detail/${item._id}`;
                              return (
                                <Link key={item._id} to={item_detail_link}>
                                  <div className="m-2">
                                    <Card style={{ width: "14rem" }}>
                                      <Card.Img
                                        variant="top"
                                        src={item.image}
                                      />
                                      <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                          <label>{item.description}</label>
                                          <br></br>
                                          <label>${item.rate}</label>
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </div>
                                </Link>
                              );
                            })}
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  );
                })
              : null}
          </div>
        </Container>
        <ToastContainer autoClose={2000} />
        <div className="menu_pagination">
          <Pagination
            activePage={this.state.active_page}
            itemsCountPerPage={this.state.sections_per_page}
            totalItemsCount={this.state.menu.length || 0}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
  getMenu: payload => dispatch(ownerActions.getMenu(payload)),
  editSection: payload => dispatch(ownerActions.editSection(payload)),
  deleteSection: payload => dispatch(ownerActions.deleteSection(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerMenu);
