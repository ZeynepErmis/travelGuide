import { useState, useEffect } from "react";
import { authEmail } from "../auth/firebase";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Icon from "react-native-vector-icons/AntDesign";
import ImagePickerExample from "../components/ImagePicker";

function ProfileScreen({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState(null);
  const [unsubscribeGoogle, setUnsubscribeGoogle] = useState(null);

  useEffect(() => {
    const unsubscribeEmail = onAuthStateChanged(authEmail, (user) => {
      if (user) {
        setLoggedIn(true);
        setEmail(user.email);
      } else {
        setLoggedIn(false);
        setEmail(null);
      }
    });
    setUnsubscribeEmail(() => unsubscribeEmail);
    return () => unsubscribeEmail();
  }, []);

  useEffect(() => {
    const unsubscribeGoogle = auth().onAuthStateChanged((user) => {
      if (user && user.providerData) {
        const providerData = user.providerData.find(
          (provider) =>
            provider.providerId === auth.GoogleAuthProvider.PROVIDER_ID
        );
        if (providerData) {
          setLoggedIn(true);
          setEmail(user.email);
          setUsername(user.displayName);
        }
      }
    });
    setUnsubscribeGoogle(() => unsubscribeGoogle);
    return () => unsubscribeGoogle();
  }, []);

  const handleLogout = async () => {
    try {
      if (authEmail.currentUser) {
        await authEmail.signOut();
      }
      if (
        auth().currentUser &&
        auth().currentUser.providerData.some(
          (provider) =>
            provider.providerId === auth.GoogleAuthProvider.PROVIDER_ID
        ))
        {
          await GoogleSignin.revokeAccess();
          await auth().signOut();
        }
      if (unsubscribeEmail) {
        unsubscribeEmail();
      }
      if (unsubscribeGoogle) {
        unsubscribeGoogle();
      }
      setLoggedIn(false);
      setEmail(null);
      setUsername(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerExample />

      <View style={styles.emailContainer}>
        <View style={styles.emailBox}>
          <View style={[styles.iconContainer]}>
            <Icon name="mail" size={20} style={[styles.icon]} />
          </View>
          <View style={styles.emailTextContainer}>
            <View style={styles.emailLine} />
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>
      </View>

      {loggedIn && username && (
        <View style={styles.usernameContainer}>
          <View style={styles.usernameBox}>
            <View style={[styles.iconContainer]}>
              <Icon name="user" size={20} style={[styles.icon]} />
            </View>
            <View style={styles.emailLine} />
            <Text style={styles.text}>{username}</Text>
          </View>
        </View>
      )}
      {loggedIn ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  emailContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  emailBox: {
    backgroundColor: "#F5F5F5",
    height: 60,
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  emailTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  emailLine: {
    height: 30,
    borderRightColor: "#D3D3D3",
    borderRightWidth: 1,
    marginRight: 10,
    paddingRight: 2,
  },
  emailText: {
    fontSize: 18,
  },
  usernameContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  usernameBox: {
    backgroundColor: "#F5F5F5",
    height: 60,
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderColor: "#1E90FF",
  },
  icon: {
    color: "#1E90FF",
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
