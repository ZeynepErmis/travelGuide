import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import BottomNavigation from "./src/components/BottomNavigation";
import DetailsScreen from "./src/screens/helper/DetailsScreen";
import ParkScreen from "./src/screens/categoryScreens/ParkScreen";
import BeachScreen from "./src/screens/categoryScreens/BeachScreen";
import ActivityScreen from "./src/screens/categoryScreens/ActivityScreen";
import ShoppingScreen from "./src/screens/categoryScreens/ShoppingScreen";
import SplashScreen from "./src/screens/helper/SplashScreen";
import "expo-dev-client";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
            />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="ParkScreen" component={ParkScreen} />
            <Stack.Screen name="BeachScreen" component={BeachScreen} />
            <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
            <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
