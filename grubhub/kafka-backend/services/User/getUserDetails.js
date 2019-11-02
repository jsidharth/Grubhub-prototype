import _ from "lodash";
import User from "../../models/user.model";

const handle_request = (user_id, callback) => {
  User.findById(user_id).then(user => {
    if (!user) {
      callback(
        {
          message: "User not found"
        },
        null
      );
    }
    callback(null, user);
  });
};

export { handle_request };
