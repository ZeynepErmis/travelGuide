import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
;

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

  });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>no access to internal storage</Text>;
  }
  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.editIconContainer}>
          <Icon name="mode-edit" size={20} color="#1E90FF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center", 
    overflow: "visible",
    margin: 20,
    marginHorizontal: 125,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: -2,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: "center", 
    alignItems: "center", 
    borderWidth: 1,
    borderColor: "#999",
    overflow: "visible",
  },
});
