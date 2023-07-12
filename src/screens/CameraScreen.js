import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { places } from "../components/data";

const images = [
  require("../../assets/cameraScreen1.jpg"),
  require("../../assets/cameraScreen2.jpg"),
  require("../../assets/cameraScreen3.jpg"),
  require("../../assets/cameraScreen5.jpg"),
  require("../../assets/cameraScreen7.jpg"),
];

const apiEndpoint = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBZIxMZ3UrRe-gNQ5IC9NuqKLiRRJTS05o`;

const CameraScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [animatedText, setAnimatedText] = useState("");
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [recognizedLandmark, setRecognizedLandmark] = useState(null);

  const navigateToDetailsScreen = (landmarkDescription) => {
    const allPlaces = Object.values(places).flat();

    const foundPlace = allPlaces.find(
      (place) => place.name.toLowerCase() === landmarkDescription.toLowerCase()
    );
    try {
      if (foundPlace) {
        navigation.navigate("DetailsScreen", foundPlace);
      }
    } catch (error) {
      console.error(`No place found with the name "${recognizedLandmark}"`);
    }
  };

  const sendImageForRecognition = async (imageUri) => {
    try {
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios.post(apiEndpoint, {
        requests: [
          {
            image: {
              content: imageBase64,
            },
            features: [
              {
                type: "LANDMARK_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
      });

      try {
        const landmarkDescription =
          response.data.responses[0].landmarkAnnotations[0].description;
        navigateToDetailsScreen(landmarkDescription);
      } catch (error) {
        if (response.data.responses[0].error) {
          console.error(
            "Image recognition error: ",
            response.data.responses[0].error
          );
        }
        alert("Could not recognise the image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const demoText =
    "Explore Istanbul's rich history by uploading a photo using the 'Pick Image' button. We will quickly recognise the city's historical places and provide information about it!";

  useEffect(() => {
    if (!animationInProgress) {
      setAnimationInProgress(true);
      const addText = async () => {
        for (let i = 0; i <= demoText.length; i++) {
          await new Promise((resolve) =>
            setTimeout(() => {
              setAnimatedText(demoText.slice(0, i));
              resolve();
            }, 1)
          );
        }
      };

      const clearText = async () => {
        await new Promise((resolve) =>
          setTimeout(() => {
            setAnimatedText("");
            resolve();
          }, 1000)
        );
      };

      const animateText = async () => {
        await addText();
        await clearText();
        setAnimationInProgress(false);
      };

      animateText();
    }
  }, [animatedText, animationInProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentImage(images[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [20, 20],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      sendImageForRecognition(result.assets[0].uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>no access to internal storage</Text>;
  }

  return (
    <>
      {image !== null ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={currentImage} style={styles.image} />
            <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Click Here to Pick Image</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.demoText}>{animatedText}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image source={currentImage} style={styles.image} />
            <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Click Here to Pick Image</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.demoText}>{animatedText}</Text>
          </View>
        </>
      )}
    </>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 30,
    zIndex: 1,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  textContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "flex-start",
    padding: 20,
  },
  demoText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
