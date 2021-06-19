import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
//import SwipeableFlatlist from "../components/SwipeableFlatlist";
import db from "../config";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: []
    };

    this.notificationRef = null;
  }

  getNotifications = () => {
    this.notificationRef = db
      .collection("allNotifications")
      .where("notificationStatus", "==", "unread")
      .where("targetedUserId", "==", this.state.userId)
      .onSnapshot(snapshot => {
        var allNotifications = [];
        snapshot.docs.map(doc => {
          var notification = doc.data();
          notification["docId"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          allNotifications: allNotifications
        });
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        bottomDivider
      >
          <ListItem.Content>
         <ListItem.Title>{item.book_name}</ListItem.Title>
         <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
          </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader
            title={"Notifications"}
            navigation={this.props.navigation}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          {this.state.allNotifications.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 25 }}>You have no notifications</Text>
            </View>
          ) : (
         /*   <SwipeableFlatlist allNotifications={this.state.allNotifications} />*/<View/>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});