import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authEmail } from "../auth/firebase";
import BottomNavigation from "../components/BottomNavigation";
import GoogleAuth from "../auth/GoogleAuth";

function LoggedIn() {
  const logout = async () => {
    try {
      await signOut(authEmail);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logged in</Text>
      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

function Signup({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const addUser = (user) => {
    firebase
      .app()
      .database("https://travelguide-f8278-default-rtdb.firebaseio.com")
      .ref("/users")
      .push({ email: user.email, password: user.password });
  };

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(authEmail, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError("There was a problem creating your account");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <Text style={styles.header}>Signup</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity onPress={() => setScreen("login")}>
              <Text style={styles.link}>Login to existing account</Text>
            </TouchableOpacity>

            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter password"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm password"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />

            <TouchableOpacity
              onPress={createAccount}
              style={styles.button}
              disabled={!email || !password || !confirmPassword}
            >
              <Text style={styles.buttonText}>Create Acoount</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Login({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(authEmail, email, password);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/login_background.jpg")}
        style={{
          height: Dimensions.get("window").height / 2,
        }}
      />
      <View style={styles.bottomView}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <Text style={styles.header}>Login</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={() => setScreen("signup")}>
              <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter password"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setScreen("reset-password")}>
              <Text style={[styles.link]}>Forget Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={loginUser}
              style={styles.button}
              disabled={!email || !password}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <Text style={{ textAlign: "center", paddingHorizontal: 5 }}>
                or
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>
            <GoogleAuth />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ResetPassword({ setScreen }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(authEmail, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Reset Password</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen("login")}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>

        {submitted ? (
          <Text>Please check your email for a reset password link.</Text>
        ) : (
          <View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={resetUserPassword}
              style={styles.button}
              disabled={!email}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default function LoginScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  onAuthStateChanged(authEmail, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    if (screen === "reset-password")
      return <ResetPassword setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  if (loggedIn) {
    return <BottomNavigation />;
  }
  return <View style={{ flex: 1 }}>{getScreen()}</View>;
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  inner: {
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    marginBottom: 20,
    color: "red",
  },
  link: {
    color: "#1E90FF",
    marginBottom: 20,
    fontSize: 14,
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#ffffff",
    bottom: 100,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  "@media (max-width: 480px)": {
    inner: {
      width: "100%",
      paddingHorizontal: 20,
    },
    header: {
      fontSize: 20,
      marginTop: 30,
    },
    input: {
      marginBottom: 8,
      fontSize: 16,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    error: {
      marginBottom: 16,
      fontSize: 14,
    },
    link: {
      marginBottom: 16,
      fontSize: 14,
    },
    bottomView: {
      flex: 1.5,
      backgroundColor: "#ffffff",
      bottom: 55,
      borderTopStartRadius: 50,
      borderTopEndRadius: 50,
    },
  },
});
