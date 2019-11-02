import _ from "lodash";
import User from "../../models/user.model";
import jwtSecret from "../../config/jwtConfig";
import jwt from "jsonwebtoken";

const handle_request = (userCredentials, callback) => {
  User.findOne({
    email: userCredentials.email
  }).then(user => {
    if (!user) {
      callback(
        {
          message: "User Login failed! No such User!"
        },
        null
      );
    }
    const token = jwt.sign({ id: user.id }, jwtSecret.secret);
    const {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image
    } = user;
    const restaurant = user.restaurant || "";
    callback(null, {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image,
      token,
      restaurant
    });
  });
};

export { handle_request };
