import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { places } from "../components/data";

function RestaurantScreen({ navigation }) {

  const [selectedCategory, setSelectedCategory] = useState("Restaurants");
  const goToNavigationScreen = (place) => {
    navigation.navigate("BottomNavigation", {
      screen: "Navigation",
      params: {
        place: {
          places_id: place.id,
          name: place.name,
          coordinate: place.coordinate,
        },
      },
    });
  };

  const renderCategoryInfo = () => {
    if (selectedCategory === "Restaurants") {
      const restaurants = places.restaurants.filter(
        (restaurant) => restaurant.category === "Restaurants"
      );
      return (
        <ScrollView>
          {restaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantContainer}>
              <Image source={restaurant.image} style={styles.image} />
              <View style={{ padding: 5 }}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                    onPress={() => Linking.openURL(restaurant.website)}
                  >
                    <Icon name="external-link" size={20} color="#1E90FF" />
                    <Text
                      style={{
                        color: "#1E90FF",
                        textDecorationLine: "underline",
                        left: 5,
                      }}
                    >
                      {restaurant.website}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.details}>{restaurant.details}</Text>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => goToNavigationScreen(restaurant)}
                >
                  <MaterialIcons name="directions" size={28} color="#1E90FF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    } else if (selectedCategory === "Cafes") {
      const cafes = places.cafes.filter(
        (restaurant) => restaurant.category === "Cafes"
      );
      return (
        <ScrollView>
          {cafes.map((cafe) => (
            <View style={styles.restaurantContainer} key={cafe.id}>
              <Image source={cafe.image} style={styles.image} />
              <View style={{ padding: 5 }}>
                <Text style={styles.title}>{cafe.name}</Text>

                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(cafe.website)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Icon
                      name="external-link"
                      size={20}
                      color="#1E90FF"
                      style={styles.locationIcon}
                    />
                    <Text
                      style={{
                        color: "#1E90FF",
                        textDecorationLine: "underline",
                        left: 5,
                      }}
                    >
                      {cafe.website}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.details}>{cafe.details}</Text>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => goToNavigationScreen(cafe)}
                >
                  <MaterialIcons name="directions" size={28} color="#1E90FF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    } else if (selectedCategory === "Nightclubs") {
      const nightClubs = places.nightClubs.filter(
        (nightClub) => nightClub.category === "Nightclubs"
      );
      return (
        <ScrollView>
          {nightClubs.map((nightClub) => (
            <View style={styles.restaurantContainer} key={nightClub.id}>
              <Image source={nightClub.image} style={styles.image} />
              <View style={{ padding: 5 }}>
                <Text style={styles.title}>{nightClub.name}</Text>
                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(nightClub.website)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Icon
                      name="external-link"
                      size={20}
                      color="#1E90FF"
                      style={styles.locationIcon}
                    />
                    <Text
                      style={{
                        color: "#1E90FF",
                        textDecorationLine: "underline",
                        left: 5,
                      }}
                    >
                      {nightClub.website}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.details}>{nightClub.details}</Text>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => goToNavigationScreen(cafe)}
                >
                  <MaterialIcons name="directions" size={28} color="#1E90FF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          paddingHorizontal: "5%",
        }}
      >
        <TouchableOpacity
          style={[
            styles.categoryContainer,
            selectedCategory === "Restaurants" ? styles.selectedCategory : null,
          ]}
          onPress={() => setSelectedCategory("Restaurants")}
        >
          <Icon
            name="cutlery"
            size={24}
            color={selectedCategory === "Restaurants" ? "white" : "#999999"}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "Restaurants" ? styles.selectedText : null,
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryContainer,
            selectedCategory === "Cafes" ? styles.selectedCategory : null,
          ]}
          onPress={() => setSelectedCategory("Cafes")}
        >
          <Icon
            name="coffee"
            size={24}
            color={selectedCategory === "Cafes" ? "white" : "#999999"}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "Cafes" ? styles.selectedText : null,
            ]}
          >
            Cafes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryContainer,
            selectedCategory === "Nightclubs" ? styles.selectedCategory : null,
          ]}
          onPress={() => setSelectedCategory("Nightclubs")}
        >
          <Icon
            name="glass"
            size={24}
            color={selectedCategory === "Nightclubs" ? "white" : "#999999"}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "Nightclubs" ? styles.selectedText : null,
            ]}
          >
            Nightclubs
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>{renderCategoryInfo()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    width: "29%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#999999",
  },
  selectedCategory: {
    backgroundColor: "#1E90FF",
  },
  selectedText: {
    color: "white",
  },
  restaurantContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  details: {
    marginLeft: 10,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    position: "absolute",
    top: -30,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default RestaurantScreen;
