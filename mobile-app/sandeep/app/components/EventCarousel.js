import React, { Component } from 'react'
import { View, FlatList, Text, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window')

class EventCarousel extends Component {
  renderCard = item => {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.eventTitle}>
            Guided Tours of the Old State House
          </Text>
          <Text numberOfLines={2} style={styles.desc}>
            Tour this 1791 building that served as Delaware’s capitol until
            1933…
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <View>
            <Text style={styles.tags}>TOUR, HIST</Text>
            <View style={styles.details}>
              <View style={styles.info}>
                <Icon name="date-range" size={18} color="#4A4A4A" />
                <Text style={styles.det}>JUN 18 – JUN 21</Text>
              </View>
              <View style={[styles.info, { paddingLeft: 16 }]}>
                <Icon name="access-time" size={18} color="#4A4A4A" />
                <Text style={styles.det}>7:30 AM</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.price}>$128</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Upcoming Events</Text>
        <FlatList
          style={{ flex: 1, height: 218 }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]}
          renderItem={({ item }) => this.renderCard()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 26,
    paddingHorizontal: 16
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: width - 48,
    backgroundColor: '#ffffff',
    height: 170,
    shadowColor: '#000000',
    marginHorizontal: 8,
    justifyContent: 'space-between',
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
    fontWeight: '700',
    color: '#000000',
    lineHeight: 22
  },
  desc: {
    paddingTop: 8,
    color: '#9B9B9B',
    fontSize: 15,
    lineHeight: 20
  },
  tags: {
    color: '#0197F6',
    fontSize: 12,
    fontWeight: '700'
  },
  details: { flexDirection: 'row', paddingTop: 8 },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  det: {
    color: '#4A4A4A',
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 8
  },
  price: {
    fontSize: 24,
    lineHeight: 24,
    color: '#6BCC00',
    fontWeight: '700'
  }
})

export default EventCarousel
