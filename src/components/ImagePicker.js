// import React, { useEffect, useState } from "react";
// import { Button, Image, View,Text } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);
//   const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       setHasGalleryPermission(galleryStatus.status === "granted");
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.uri);
//     }
//   };

//   if (hasGalleryPermission === false){
//     return <Text>no access to internal storage</Text>
//   }

//   return (
//     <View style={{ flex: 1, justifyContent:'center'}}>
//       <Button title="Pick an image from camera roll" onPress={() => pickImage()} style={{marginTop:30}}/>
//       {image && <Image source={{ uri: image }} style={{flex:1/2}} />}
//     </View>
//   );
// }
