import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  TouchableOpacity,
  Icon,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Footer from '../components/Footer';

const trips = [
  {
    departure: 'Accra',
    destination: 'Kumasi',
    departureTime: '9:00am',
    estimatedArrivalTime: '1:00pm',
    ticketPrice: 65,
    busCompany: 'VIP',
  },
  {
    departure: 'Accra',
    destination: 'Tamale',
    departureTime: '7:00am',
    estimatedArrivalTime: '8:00pm',
    ticketPrice: 100,
    busCompany: 'VIP',
    date: '',
  },
  {
    departure: 'Kumasi',
    destination: 'Accra',
    departureTime: '1:00pm',
    estimatedArrivalTime: '6:00pm',
    ticketPrice: 65,
    busCompany: 'VIP',
    date: '',
  },
];

export default function Tickets({ navigation, route }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { travelFrom, travelTo } = route.params;
  const [location, setLocation] = React.useState(travelFrom);
  const [destination, setDestination] = React.useState(travelTo);
  const [dateQuery, setDateQuery] = React.useState('Thur 30 Dec 2021');
  const [noPassengers, setNoPassengers] = React.useState(2);

  return (
    <View style={(styles.container, screenHeight)}>
      <View style={styles.top}>
        <View style={styles.inputIcon}>
          <Ionicons
            name="chevron-back"
            size={32}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.topData}>
          <Text style={{ color: 'white', paddingBottom: 10 }}>
            {location} - {destination}
          </Text>
        </View>

        <View style={styles.topData}>
          <Text style={{ color: '#A8D2A0' }}>
            {dateQuery} - {noPassengers} Passengers
          </Text>
        </View>
      </View>

      <View style={styles.body}></View>

      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    height: '12%',
    backgroundColor: '#1C458A',
  },
  topData: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1C458A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: '81%',
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
    height: '7%',
  },
  inputIcon: {
    paddingTop: 10,
    height: 40,
  },
});
