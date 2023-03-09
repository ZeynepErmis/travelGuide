import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  VirtualizedList,
} from "react-native";
import { places } from "../../components/data";
import Icon from "react-native-vector-icons/MaterialIcons";

const ParkScreen = ({ navigation }) => {
  const renderPark = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon
            name="location-on"
            size={20}
            color="#999"
            style={styles.locationIcon}
          />
          <Text style={styles.location}>{item.location}</Text>
        </View>
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
          <Text style={styles.headerText}>Parks and Forests</Text>
        </View>
      </View>
      <FlatList
        data={places.parks}
        renderItem={renderPark}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginLeft: 90,
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
    marginLeft:-5,

  },
  locationIcon: {
    alignSelf: "center",
  },
  description: {
    paddingBottom: 10,
  },
});

export default ParkScreen;
