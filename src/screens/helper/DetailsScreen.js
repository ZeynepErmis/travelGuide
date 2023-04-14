import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DetailsScreen = ({ navigation, route }) => {
  const place = route.params;

  const goToNavigationScreen = () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={place.image}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="#ffffff"
            onPress={navigation.goBack}
          />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: "70%",
              fontSize: 30,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 20,
            }}
          >
            {place.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <TouchableOpacity onPress={goToNavigationScreen}>
            <Icon name="directions" size={28} color="#1E90FF" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <Icon
            style={{ marginTop: 5 }}
            name="place"
            size={28}
            color="#1E90FF"
          />
          <Text
            style={{
              marginTop: 10,
              marginLeft: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {place.location}
          </Text>
        </View>
        <ScrollView>
          <Text style={{ marginTop: 20, fontSize: 15 }}>{place.details}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 200,
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default DetailsScreen;
