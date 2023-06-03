//This is working project
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Camera, enableLatestRenderer, Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGlE_API_KEY } from './environments';

//There google api key setup and also enabled places at googlecloud but billing account is not created so it would not work  
function InputAutoComplete({ label, placeholder, onPlaceSelected, }) {
  return (
    <>

      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder}
        fetchDetails
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          onPlaceSelected(details);
        }}
        query={{
          key: "AIzaSyBJolhKzA6X_5hcQn6ZJjgFay8VSafkfdM",
          language: 'en',
        }}
      />
    </>

  )
}



const App = () => {
  // const [origin, setOrigin] = useState(null);
  // const [destination, setDestination] = useState(null);

  const [origin, setOrigin] = useState({
    latitude: 37.386051,
    longitude: -122.083855,
  });

  const [destination, setDestination] = useState({
    latitude: 37.389081,
    longitude: -122.083855,
  });

  //All details about <MapView /> below
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(mapRef);
    enableLatestRenderer();

    console.log('origin: ', origin);
    console.log('destination: ', destination);

  }, [])


  return (

    //1- In first way implementation of google places auto complete

    // <View style={{flex: 1}}>
    //   <GooglePlacesAutocomplete
    //     placeholder='Search'
    //     onPress={(data, details = null) => {
    //       // 'details' is provided when fetchDetails = true
    //       console.log(data, details);
    //     }}
    //     query={{
    //       key: 'https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters',
    //       language: 'en',
    //     }}
    //   />
    // </View>


    //2- In second way implementation of google places auto complete with MapView

    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={{ latitude: 37.386051, longitude: -122.083855, latitudeDelta: 0.09, longitudeDelta: 0.04 }} >
        <Marker coordinate={origin} draggable onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} image={require('./assets/car.png')} style={{ width: 80, height: 80 }} />
        <Marker coordinate={destination} draggable onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)} image={require('./assets/car.png')} />
        <Polyline coordinates={[origin, destination]} strokeColor="blue" strokeWidth={8} />
      </MapView>

      {/* Its not working details above */}
      < View style={styles.searchContainer} >
        <InputAutoComplete label={'Origin'} placeholder={'Search'} onPlaceSelected={() => { }} />
        <InputAutoComplete label={'Destination'} placeholder={'Search'} onPlaceSelected={() => { }} />
      </View >

    </View >


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: "white",
    shadowColor: 'black',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: '100%',                         These for ios
    // shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 40
  },
  input: {
    borderColor: 'black',
    borderWidth: 1
  }
});

export default App;
