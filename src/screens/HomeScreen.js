import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ViewBase,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { places } from "../components/data";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {


  const categoryIcons = [
    {
      name: "park",
      icon: <Icon name="park" size={25} color="#1E90FF" />,
      route: "ParkScreen",
    },
    {
      name: "beach",
      icon: <Icon name="beach-access" size={25} color="#1E90FF" />,
      route: "BeachScreen",
    },
    {
      name: "bike",
      icon: <Icon name="directions-bike" size={25} color="#1E90FF" />,
      route: "ActivityScreen",
    },
    {
      name: "mall",
      icon: <Icon name="local-mall" size={25} color="#1E90FF" />,
      route: "ShoppingScreen",
    },
  ];
  const handleCategoryPress = (route) => {
    navigation.navigate(route);
  };

  const ListCategories = () => {
    return (
      <View style={styles.categoryContainer}>
        {categoryIcons.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconContainer}
            onPress={() => handleCategoryPress(category.route)}
          >
            {category.icon}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({ place }) => {
    return (
      <View style={[styles.boxItemContainer]}>
        <TouchableOpacity
          style={styles.sectionContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("DetailsScreen", place)}
        >
          <Image style={styles.sectionImage} source={place.image} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.imageTitle}>{place.name}</Text>
            <Text style={styles.description}>{place.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={[styles.headerTitleContainer, { marginTop: 30 }]}>
              <Text style={[styles.headerTitle]}> Discover</Text>
              <Text style={[styles.headerTitle]}> Istanbul with us</Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon
                  name="search"
                  size={20}
                  color="#999"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search places"
                />
              </View>
            </View>
          </View>
        </View>
        <ListCategories />
        <View>
          <Text style={styles.historicalPlacesText}>Historical Places</Text>
          <FlatList
            horizontal
            data={places.historicalPlaces}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Card place={item} />}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={styles.historicalPlacesText}>Museums</Text>
          <FlatList
            horizontal
            data={places.museums}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Card place={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  // header: {
  //   height: width / 2.5,
  //   // backgroundColor: "#1E90FF",
  // },
  headerContent: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitleContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    // color: "#fff",
    color: "black",
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
  // boxList: {
  //   paddingHorizontal: 10,
  // },
  boxItemContainer: {
    paddingHorizontal: 11,
  },
  historicalPlacesContainer: {
    position: "absolute",
    top: 200,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  historicalPlacesText: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionImage: {
    width: 180,
    height: 260,
    borderRadius: 10,
  },
  sectionTextContainer: {
    position: "absolute",
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  imageTitle: {
    fontSize: 21,
    color: "#fff",
    fontWeight: "bold",
  },
  categoryContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default HomeScreen;
