import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  TouchableOpacity,
  Icon,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import BottomDrawer from 'react-native-bottom-drawer-view';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
//import image from '../assets/bus-move.gif';
import image from '../assets/bus.jpg';
import Footer from '../components/Footer';
import CustomListItem from '../components/CustomListItem';

const Stack = createNativeStackNavigator();

const places = [
  { key: 'Accra' },
  { key: 'Kumasi' },
  { key: 'Takoradi' },
  { key: 'Tamale' },
  { key: 'Techiman' },
  { key: 'Sunyani' },
  { key: 'Wa' },
  { key: 'Ho' },
  { key: 'Cape Coast' },
];

export default function Destination({ navigation }) {
  const [queryData, setqueryData] = React.useState({
    departure: '',
    destination: '',
  });
  const [locResults, setLocResults] = React.useState([]);
  const [isBottomNavShowing, setIsBottomNavShowing] = React.useState(false);
  const [bottomNavProps, setBottomNavProps] = React.useState({
    color: 'orange',
    placeholder: 'placeholder',
    type: 'departure',
  });

  React.useEffect(() => {
    //console.log(queryData);
    //console.log('Location List:', locResults);
    //console.log('Bottom Props', bottomNavProps);
  }, [queryData, locResults, bottomNavProps]);

  const liveSearch = (value, type) => {
    if (type === 'departure') {
      setqueryData({ ...queryData, departure: value.nativeEvent.text });
    } else {
      setqueryData({
        ...queryData,
        destination: value.nativeEvent.text,
      });
    }

    let res = places.filter((place) =>
      place.key.toLowerCase().includes((value.nativeEvent.text).toLowerCase())
    );

    setLocResults(res);
  };

  const renderContent = ({ bottomNavProps }) => {
    //console.log('departure')
    return (
      <View style={{ padding: 0 }}>
        <View
          style={{
            height: 60,
            backgroundColor: bottomNavProps.color,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <TextInput
            style={{
              borderRadius: 10,
              height: 40,
              backgroundColor: 'white',
              paddingLeft: 10,
            }}
            placeholder={bottomNavProps.placeholder}
            keyboardType="text"
            clearButtonMode={true}
            contextMenuHidden
            onChange={(value) => liveSearch(value, bottomNavProps.type)}
            value={
              bottomNavProps.type === 'destination'
                ? queryData.destination
                : queryData.departure
            }
          />
        </View>

        <FlatList
          data={locResults}
          renderItem={({ item }) => (
            <CustomListItem
              itemName={item.key}
              setIsBottomNavShowing={setIsBottomNavShowing}
              setqueryData = {setqueryData}
            />
          )}
        />
      </View>
    );
  };

  const setUpDesination = () => {
    setIsBottomNavShowing(true);
    setBottomNavProps({
      color: '#1c458a',
      placeholder: 'Travelling To',
      type: 'destination',
    });
  };

  const setUpDeparture = () => {
    setIsBottomNavShowing(true);
    setBottomNavProps({
      color: '#8cd9e3',
      placeholder: 'Travelling From',
      type: 'departure',
    });
  };

  return (
    <View style={(styles.container)}>
      <View style={styles.top}>
        <ImageBackground  style={styles.image} source={image} />
        <Text style={{ marginTop: 250, marginLeft: 10, fontStyle: 'bold' }}>
          Where to?
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.inputSection}>
          <FontAwesome
            style={styles.inputIcon}
            name="map-marker"
            size={20}
            color="red"
          />
          <TextInput
            style={styles.input}
            placeholder="Travelling From"
            keyboardType="text"
            clearButtonMode={true}
            contextMenuHidden
            onFocus={setUpDeparture}
            onChange={(value) =>
              setqueryData({ ...queryData, departure: value.nativeEvent.text })
            }
            value={queryData.departure}
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome
            style={styles.inputIcon}
            name="map-marker"
            size={20}
            color="red"
          />
          <TextInput
            style={styles.input}
            clearButtonMode={true}
            placeholder="Travelling To"
            keyboardType="text"
            onFocus={setUpDesination}
            onChange={(value) =>
              setqueryData({
                ...queryData,
                destination: value.nativeEvent.text,
              })
            }
            value={queryData.destination}
          />
        </View>

        <View style={styles.inputSection}>
          <Ionicons
            style={styles.inputIcon}
            name="calendar"
            size={20}
            color="red"
          />
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            keyboardType="text"
          />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() =>
            navigation.navigate('Tickets', {
              travelFrom: queryData.departure,
              travelTo: queryData.destination,
            })
          }>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>

      {isBottomNavShowing ? (
        <BottomDrawer
          backgroundColor={'#f4f6f8'}
          containerHeight={550}
          offset={0}
          roundedEdges={true}
          shadow={true}
          onCollapsed={() => console.log('collapsed')}
          onExpanded={() => console.log('expanded')}>
          {renderContent({ bottomNavProps })}
        </BottomDrawer>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    height: '43%',
    backgroundColor: '#fff',
  },
  body: {
    height: '50%',
    backgroundColor: '#f4f6f8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
    height: '7%',
  },
  image: {
    flex: 0.6,
    justifyContent: 'center',
    height: 250,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    height: 40,
    borderRadius: 10,
  },

  inputIcon: {
    padding: 10,
    height: 40,
  },

  searchButton: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#82B479',
    padding: 15,
    height: 45,
    borderRadius: 50,
  },
});
