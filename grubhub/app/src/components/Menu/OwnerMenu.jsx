import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ownerActions } from "../../js/actions";
import { Container, Row, Card } from "react-bootstrap";
import tea from "./../../assets/tea.jpg";
import "./style.css";
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
                    <div>
                      <Container>
                        <Row>
                          {eachSection.items.map(item => {
                            let item_detail_link = `/item/detail/${item.id}`;
                            return (
                              <Link to={item_detail_link}>
                                <div className="m-2">
                                <Card style={{ width: '14rem' }}>
                                    <Card.Img variant="top" src={tea}/>
                                    <Card.Body>
                                      <Card.Title>{item.name}</Card.Title>
                                      <Card.Text>
                                        <p>{item.description}</p>
                                        <p>{item.rate}</p>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </div>
                              </Link>
                            );
                          })}
                        </Row>
                      </Container>
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
