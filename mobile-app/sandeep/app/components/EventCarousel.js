/*
 * This component creates a horizontal carousel of informational cards for the user to swipe through.
 */
import React, { Component } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as firebase from "firebase";
import moment from "moment";

const { width } = Dimensions.get("window");

class EventCarousel extends Component {
  state = { events: null, loading: true };
  componentDidMount() {
    //initiate firebase DB reference
    const ref = firebase.database().ref("/events");

    //query for data about a specific park
    const data = ref
      .orderByChild("park")
      .equalTo(this.props.location)
      .on("value", snapshot => {
        this.setState(
          {
            events: snapshot.val(),
            loading: false
          },
          () => {
            console.log(this.state.events);
          }
        );
      });
    // const events = await firebase
    //   .database()
    //   .ref()
    //   .child('events')
    // const query = events
    //   .orderByChild('Park')
    //   .equalTo('First State Heritage Park')
  }
  renderCard = item => {
    console.log(item);
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.eventTitle}>{this.state.events[item].programtitle}</Text>
          <Text numberOfLines={2} style={styles.desc}>
            {this.state.events[item].description}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <View>
            <Text style={styles.tags}>{this.state.events[item].category}</Text>
            <View style={styles.details}>
              <View style={styles.info}>
                <Icon name="date-range" size={18} color="#4A4A4A" />
                <Text style={styles.det}>
                  {moment(this.state.events[item].start_date).format("MMM DD")}
                  – {moment(this.state.events[item].end_date).format("MMM DD")}
                </Text>
              </View>
              {this.state.events[item].start_time !== "NULL" ? (
                <View style={[styles.info, { paddingLeft: 16 }]}>
                  <Icon name="access-time" size={18} color="#4A4A4A" />
                  <Text style={styles.det}>{this.state.events[item].start_time}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View>
            <Text style={styles.price}>{this.state.events[item].cost}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!this.state.loading && this.state.events === null) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Upcoming Events</Text>
        <FlatList
          style={{ flex: 1, height: 218 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Object.keys(this.state.events)}
          renderItem={({ item }) => this.renderCard(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 26,
    paddingHorizontal: 16
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: width - 48,
    backgroundColor: "#ffffff",
    height: 170,
    shadowColor: "#000000",
    marginHorizontal: 8,
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 22
  },
  desc: {
    paddingTop: 8,
    color: "#9B9B9B",
    fontSize: 15,
    lineHeight: 20
  },
  tags: {
    color: "#0197F6",
    fontSize: 12,
    fontWeight: "700"
  },
  details: { flexDirection: "row", paddingTop: 8 },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  det: {
    color: "#4A4A4A",
    fontSize: 12,
    fontWeight: "700",
    paddingLeft: 8
  },
  price: {
    fontSize: 24,
    lineHeight: 24,
    color: "#6BCC00",
    fontWeight: "700"
  }
});

export default EventCarousel;
