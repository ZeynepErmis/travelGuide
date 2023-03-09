import React from "react";
import { View, Image, StyleSheet,Dimensions  } from "react-native";

const SplashScreen = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { width, height }]}
        source={require("../../../assets/splashScreen.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2070bf",
  },
  logo: {
    alignSelf: "center"
  },
});

export default SplashScreen;
