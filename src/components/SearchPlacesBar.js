import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { places } from "../components/data";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const SearchPlacesBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    setSearchQuery("");
  }, [isFocused]);

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", place)}
      >
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={place.image} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardText}>{place.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPlaces =
    () =>
    ({ item }) => {
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return null;
      }
      return <Card place={item} />;
    };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search places"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onClear={handleClearSearch}
          />
        </View>
      </View>

      {searchQuery ? (
        <View style={styles.placesContainer}>
          {Object.keys(places).map((category) => (
            <View key={category}>
              <FlatList
                horizontal
                data={places[category]}
                showsHorizontalScrollIndicator={false}
                renderItem={renderPlaces()}
              />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default SearchPlacesBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 25,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 100,
    elevation: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  placesContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 5,
    width: 355,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImageContainer: {
    width: "50%",
    height: "142%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 10,
  },
  cardImage: {
    width: "50%",
    height: "70%",
    borderRadius: 10,
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    right: 100,
  },
});
