import { View, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoogleAuth() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      "174264598154-e5s6thhnc6b5fvkirh663dql1tqmsbjb.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.signOut();
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = auth().signInWithCredential(googleCredential);
      user_sign_in.then((user) => {

        navigation.navigate("BottomNavigation");
      });
    } catch (error) {
        console.log(error)
    }
  };

  if (initializing) return null;

    return (
      <View>
        <GoogleSigninButton
          style={{ width: "100%", height: 65, borderRadius: 8,}}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  
}