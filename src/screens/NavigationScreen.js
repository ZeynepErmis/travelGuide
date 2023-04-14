import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function NavigationScreen({ route }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originPredictions, setOriginPredictions] = useState([]);
  const [destinationPredictions, setDestinationPredictions] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [distanceText, setDistanceText] = useState(null);
  const [durationText, setDurationText] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [transitDetails, setTransitDetails] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  console.log(transitDetails);

  const { place } = route.params || {};

  const handleSearchButtonPress = () => {
    setShowSearch(true);
  };

  const handleCancelButtonPress = () => {
    setShowSearch(false);
    setOrigin(null);
    setDestination(null);
    setOriginPredictions([]);
    setDestinationPredictions([]);
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setOriginCoords(null);
    setDestinationCoords(null);
    setRouteCoords(null);
  };

  const handleOriginChange = async (value) => {
    setOrigin(value);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyAReFuIL5WMdBM1OFwJQ5N3s4uZVfDCVGU&location=41.0082,28.9784&radius=20000&strictbounds`
      );
      const responseJson = await response.json();
      setOriginPredictions(responseJson.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDestinationChange = async (value) => {
    setDestination(value);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyAReFuIL5WMdBM1OFwJQ5N3s4uZVfDCVGU&location=41.0082,28.9784&radius=20000&strictbounds`
      );
      const responseJson = await response.json();
      setDestinationPredictions(responseJson.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOriginPredictionPress = async (prediction) => {
    console.log("handleOriginPredictionPress called");

    setSelectedOrigin(prediction);
    setOrigin(prediction.description);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=AIzaSyAReFuIL5WMdBM1OFwJQ5N3s4uZVfDCVGU`
      );
      const responseJson = await response.json();
      console.log(responseJson); // log the response
      const { lat, lng } = responseJson.result.geometry.location;
      setOriginCoords({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error(error);
    }
    setOriginPredictions([]);
  };

  const handleDestinationPredictionPress = async (prediction) => {
    setSelectedDestination(prediction);
    setDestination(prediction.description);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=AIzaSyAReFuIL5WMdBM1OFwJQ5N3s4uZVfDCVGU`
      );
      const responseJson = await response.json();
      const { lat, lng } = responseJson.result.geometry.location;
      setDestinationCoords({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error(error);
    }
    setDestinationPredictions([]);
  };

  const handleSearch = async (selectedIndex = null) => {
    if (!originCoords || !destinationCoords) {
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&mode=${travelMode}&alternatives=true&avoid=highways&key=AIzaSyAReFuIL5WMdBM1OFwJQ5N3s4uZVfDCVGU`
      );
      const responseJson = await response.json();

      if (responseJson.routes && responseJson.routes.length > 0) {
        const selectedRoute =
          selectedIndex !== null
            ? responseJson.routes[selectedIndex]
            : responseJson.routes[0];
        const { distance, duration } = selectedRoute.legs[0];

        const distanceText = distance.text;
        const durationText =
          duration &&
          (duration.text ||
            `${duration.hours ? duration.hours + " saat " : ""}${
              duration.minutes
            } dakika`);

        setDistanceText(distanceText);
        setDurationText(durationText);

        if (
          travelMode === "transit" &&
          responseJson.routes &&
          responseJson.routes.length > 0
        ) {
          const transitDetails = responseJson.routes.map((route) => {
            const { distance, duration } = route.legs[0];
            const steps = route.legs[0].steps.filter(
              (step) => step.travel_mode === "TRANSIT"
            );

            return {
              distance: distance.text,
              duration: duration.text,
              steps: steps.map((step) => ({
                line:
                  step.transit_details.line.short_name ||
                  step.transit_details.line.name,
                departureStop: step.transit_details.departure_stop.name,
                arrivalStop: step.transit_details.arrival_stop.name,
              })),
              overview_polyline: route.overview_polyline,
            };
          });

          setTransitDetails(transitDetails);
        } else {
          setTransitDetails([]);
        }

        const points = polyline.decode(selectedRoute.overview_polyline.points);
        const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setRouteCoords(coords);
      } else {
        console.log("No routes found for the given origin and destination");
      }
      if(selectedIndex!==null || travelMode==="driving" ||travelMode==="walking" ){
      setShowSearch(false);
    }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (originCoords && destinationCoords) {
      handleSearch();
    }
  }, [originCoords, destinationCoords]);

  useEffect(() => {
    // Eğer place varsa, destination ve destinationCoords'u güncelleyin
    if (place) {
      setDestination(place.name);
      setDestinationCoords(place.coordinate);
      setOrigin(null)
      setSelectedOrigin(null);
      setOriginCoords(null)
      setRouteCoords(null)
    }
  }, [place]);

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
  };

  useEffect(() => {
    handleSearch();
  }, [travelMode]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 41.0151,
          longitude: 28.9795,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        }}
        // showsTraffic={true}
      >
        {routeCoords && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={6}
            strokeColor={"#1E90FF"}
          />
        )}
        {originCoords && (
          <Marker
            coordinate={{
              latitude: originCoords.latitude,
              longitude: originCoords.longitude,
            }}
            title="Origin"
          />
        )}
        {destinationCoords && (
          <Marker
            coordinate={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
            title="Destination"
          />
        )}
      </MapView>
      {!showSearch && (
        <TouchableOpacity
          style={styles.searchMapsButton}
          onPress={handleSearchButtonPress}
        >
          <MaterialIcon
            name="directions"
            size={25}
            color="#fff"
            style={{ marginTop: 12 }}
          />
        </TouchableOpacity>
      )}
      {showSearch ? (
        <View style={{ margin: 5 }}>
          <TouchableOpacity onPress={handleCancelButtonPress}>
            <MaterialIcon name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}

      {showSearch && (
        <View style={styles.fullScreenSearch}>
          <View style={styles.inputContainer}>
            <Icon name="circle" size={13} color="#1E90FF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Origin"
              onChangeText={handleOriginChange}
              value={origin}
            />
          </View>

          <MaterialCommunityIcons
            name="dots-vertical"
            size={25}
            color="#000"
            style={styles.dotIcon}
          />

          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} color="red" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Destination"
              onChangeText={handleDestinationChange}
              value={destination}
            />
          </View>

          {originPredictions.length > 0 && (
            <FlatList
              style={styles.predictionsContainer}
              data={originPredictions}
              keyboardShouldPersistTaps="handled" // eklenen prop
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.predictionItem}
                  onPress={() => handleOriginPredictionPress(item)}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.place_id}
            />
          )}
          {destinationPredictions.length > 0 && (
            <FlatList
              style={styles.predictionsContainer}
              data={destinationPredictions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.predictionItem}
                  onPress={() => handleDestinationPredictionPress(item)}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.place_id}
            />
          )}
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                travelMode === "driving" && styles.selectedModeButton,
                { marginRight: 30 },
              ]}
              onPress={() => handleTravelModeChange("driving")}
            >
              <View style={styles.iconTextContainer}>
                <Icon
                  name="car"
                  size={15}
                  color={travelMode === "driving" ? "white" : "#000"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                travelMode === "walking" && styles.selectedModeButton,
                { marginRight: 30 },
              ]}
              onPress={() => handleTravelModeChange("walking")}
            >
              <View style={styles.iconTextContainer}>
                <Icon
                  name="male"
                  size={15}
                  color={travelMode === "walking" ? "white" : "#000"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                travelMode === "transit" && styles.selectedModeButton,
              ]}
              onPress={() => {
                handleTravelModeChange("transit");
              }}
            >
              <View style={styles.iconTextContainer}>
                <Icon
                  name="subway"
                  size={15}
                  color={travelMode === "transit" ? "white" : "#000"}
                />
              </View>
            </TouchableOpacity>
          </View>
          {showSearch &&
              travelMode === "transit" &&
              transitDetails.length > 0 && (
                <FlatList
                  style={styles.transitDetailsContainer}
                  data={transitDetails}
                  renderItem={({ item, index }) => (
                    <View style={styles.transitDetailItem} key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          handleSearch(index);
                        }}
                        style={styles.transitDetailItem}
                        key={index}
                      >
                        <Text style={styles.transitDetailHeader}>
                          Option {index + 1}: {item.distance} - {item.duration}
                        </Text>
                        {item.steps.map((step, stepIndex) => (
                          <Text
                            key={stepIndex}
                            style={styles.transitDetailText}
                          >
                            {step.line} - {step.departureStop} -{" "}
                            {step.arrivalStop}
                          </Text>
                        ))}
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled
                />
              )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (!origin || !destination) {
                alert("Please enter origin and destination");
              } else {
                handleSearch();
              }
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      {routeCoords && (
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance:</Text>
            <Text style={styles.infoText}>{distanceText}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Estimated Time:</Text>
            <Text style={styles.infoText}>{durationText}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    width: "75%",
    paddingHorizontal: 12,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    left: 50,
    top: 30,
  },
  map: {
    flex: 1,
  },
  predictionsContainer: {
    bottom: 30,
    marginTop: 10,
    marginHorizontal: 10,
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  predictionItem: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  modeContainer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modeButton: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D3D3D3",
  },
  selectedModeButton: {
    backgroundColor: "#1E90FF",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  Icon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  iconTextContainer: {

    flexDirection: "column",
    alignItems: "center",
    width: 35,
    height: 15,
  },
  searchButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 50,
    width: "78%",
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    left: 50,
    zIndex: 999,
  },
  searchMapsButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 22,
    zIndex: 999,
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    bottom: 50,
  },
  icon: {
    left: 40,
    top: 30,
  },
  dotIcon: {
    position: "absolute",
    left: 43,
    top: 15,
  },
  fullScreenSearch: {
    width: "100%",
    height: "100%",
  },
  transitDetailsContainer: {
    // position: "relative",
    top: 15, // arac, yaya ve tranzit ikonunun altında yer almasını istediğiniz değeri girin
    left:20,
    width: "90%",
    maxHeight: "60%", // İstediğiniz maksimum yüksekliği ayarlayın
    zIndex: 1,
    backgroundColor: "white",

  },
  transitDetailItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  transitDetailHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  transitDetailText: {
    fontSize: 14,
  },
  transitDetailsWrapper:{
    position:"absolute"
  }
});
