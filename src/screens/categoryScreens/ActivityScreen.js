import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  VirtualizedList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { places } from "../../components/data";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const ActivityScreen = ({ navigation }) => {
  const goToNavigationScreen = (item) => {
    navigation.navigate("BottomNavigation", {
      screen: "Navigation",
      params: {
        place: {
          places_id: item.id,
          name: item.name,
          coordinate: item.coordinate,
        },
      },
    });
  };

  const renderActiviy = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity
        onPress={() => goToNavigationScreen(item)}
        style={styles.iconContainer}
      >
        <Icon name="directions" size={28} color="#1E90FF" />
      </TouchableOpacity>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.details}>{item.details}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon
            name="arrow-back-ios"
            size={20}
            color="#000000"
            onPress={navigation.goBack}
          />
          <Text style={styles.headerText}> Recommended Activities </Text>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={places.activities}
          renderItem={renderActiviy}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor:"#1E90FF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 50,
    fontFamily: "San Francisco",
  },
  card: {
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
    marginBottom: 5,
  },
  location: {
    color: "#999",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: -5,
  },
  locationIcon: {
    alignSelf: "center",
  },
  description: {
    paddingBottom: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 195,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivityScreen;
