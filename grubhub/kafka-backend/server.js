import mongoose from "mongoose";
import Promise from "bluebird";
mongoose.Promise = Promise;

var connection = new require("./kafka/Connection");
//Users topic files
import * as userRegistration from "./services/User/registerUser";
import * as userLogin from "./services/User/loginUser";
import * as userDetailsUpdate from "./services/User/updateUserDetails";
import * as getUserDetails from "./services/User/getUserDetails";
//Restaurant topic files
import * as getRestaurant from "./services/Restaurant/getRestaurant";
import * as updateRestaurantDetails from "./services/Restaurant/updateRestaurantDetails";
import * as getRestaurantMenu from "./services/Restaurant/getRestaurantMenu";
import * as getRestaurantDetails from "./services/Restaurant/getRestaurantDetails";
import * as updateSection from "./services/Restaurant/updateSection";
import * as deleteSection from "./services/Restaurant/deleteSection";
//Order topic files
import * as getOrderByRestaurant from "./services/Order/getOrderByRestaurant";
import * as getOrderByCustomer from "./services/Order/getOrderByCustomer";
import * as updateOrder from "./services/Order/updateOrder";
import * as getOrderDetail from "./services/Order/getOrderDetail";
import * as createOrder from "./services/Order/createOrder";
import * as createMessage from "./services/Order/createMessage";
//Item topic files
import * as addItem from "./services/Item/addItem";
import * as getItemDetails from "./services/Item/getItemDetails";
import * as updateItem from "./services/Item/updateItem";
import * as deleteItem from "./services/Item/deleteItem";
import * as searchItem from "./services/Item/searchItem";
//Image topic files
import * as uploadImage from "./services/Image/uploadImage";

mongoose
  .connect("mongodb://localhost:27017/grubhub", { useNewUrlParser: true})
  .then(() => {
    console.log("Connection to mongo successfull");
  })
  .catch(err => {
    console.log("Connection to mongo failed", err);
  });

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            err
          }),
          partition: 0
        }
      ];
      console.log(payloads);
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// User topics
handleTopicRequest("user.register", userRegistration);
handleTopicRequest("user.login", userLogin);
handleTopicRequest("user.detail.update", userDetailsUpdate);
handleTopicRequest("user.details", getUserDetails);

//Restaurant topics
handleTopicRequest("restaurant.details", getRestaurant);
handleTopicRequest("restaurant.details.update", updateRestaurantDetails);
handleTopicRequest("restaurant.menu", getRestaurantMenu);
handleTopicRequest("restaurant.getdetails", getRestaurantDetails);
handleTopicRequest("update.section", updateSection);
handleTopicRequest("delete.section", deleteSection);

//Order topics
handleTopicRequest("order.restaurant", getOrderByRestaurant);
handleTopicRequest("order.customer", getOrderByCustomer);
handleTopicRequest("order.update", updateOrder);
handleTopicRequest("order.details", getOrderDetail);
handleTopicRequest("order.create", createOrder);
handleTopicRequest("message.create", createMessage);

//Item topics
handleTopicRequest("item.add", addItem);
handleTopicRequest("item.details", getItemDetails);
handleTopicRequest("item.update", updateItem);
handleTopicRequest("item.delete", deleteItem);
handleTopicRequest("item.search", searchItem);

//Upload Image
handleTopicRequest("image.upload", uploadImage);