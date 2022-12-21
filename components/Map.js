//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
// create a component
const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType="mutedStandard"
                initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                }}>

                    {origin && destination && (
                        <MapViewDirections 
                            origin={origin.description}
                            destination={destination.description}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="black"
                            
                        />
                    )}
                    
                    {origin?.location && (
                        <Marker 
                            coordinate={{
                                latitude: origin.location.lat,
                                longitude: origin.location.lng,
                            }}
                            title="Origin"
                            description={origin.description}
                            identifier="origin"
                        />
                    )}
            </MapView>
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default Map;
