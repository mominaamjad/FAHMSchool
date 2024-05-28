/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {getTimetable, uploadTimetable} from '../../api/admin';

const TimetableScreen = () => {

  const [modalVisible, setModalVisible] = useState(false); // for pop-up
  
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [timetableImg, setTimetableImg] = useState(null);

  useEffect(() => {
    if (value) {
      fetchTimetable();
    }
    console.log(timetableImg)
  }, [value]);

  const fetchTimetable = async () => {
    try {
      setIsLoading(true);
      const timetableData = await getTimetable(value);
      if (timetableData && timetableData.timetableImg) {
        console.log("image ka link ", timetableImg)
        setTimetableImg(timetableData.timetableImg);
      } else {
        console.log("image ka link ", timetableImg)
        setTimetableImg(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching timetable: ', error);
    }
  };
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        setIsLoading(true);
        console.log(response)
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setTimetableImg(imageUri);
        console.log("selected image ka link ", imageUri)
        setIsUploaded(true)
        setIsLoading(false);
      }
    });
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      console.log('Please select an image first');
      return;
    }

    try {
      console.log("selected image ki value ", value, "and link ", selectedImage)
      await uploadTimetable({id: value, timetableImg: selectedImage});
      console.log('Timetable uploaded successfully');
      setIsUploaded(false);

    } catch (error) {
      console.error('Error uploading timetable: ', error);
    }
  };

  return (
    <View>
      <DropDownPicker
        textStyle={styles.dropdownText}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
        open={open}
        value={value}
        items={[
          {label: 'Year 2024', value: '2024'},
          {label: 'Year 2023', value: '2023'},
          {label: 'Year 2022', value: '2022'},
          {label: 'Year 2021', value: '2021'},
          {label: 'Year 2020', value: '2020'},
          {label: 'Year 2019', value: '2019'},
        ]}
        setOpen={setOpen}
        setValue={setValue}
      />

      <View>
      {isLoading ? <ActivityIndicator size="large" color= '#8349EA' /> : (
        timetableImg && (
          <Image source={{uri: timetableImg}} style={styles.pic} />
        )
      )}

        <TouchableOpacity style={styles.buttonUpload} onPress={openImagePicker}>
          <Text style={styles.uploadText}>{isUploaded ? 'Upload Again' : 'Upload'}</Text>
        </TouchableOpacity>

        {isUploaded ? (<TouchableOpacity style={styles.buttonUpload} onPress={handleUpload}>
          <Text style={styles.uploadText}>Done</Text>
        </TouchableOpacity>) : (<></>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Poppins-Light',
  },

  pic: {
    width: 340,
    height: 220,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 7,
    marginTop: 70,
  },
  uploadText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },

  buttonUpload: {
    borderRadius: 17,
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#8349EA',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: 200
  },

  dropdown: {
    width: 320,
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    borderColor: '#8349EA',
    marginTop: 20,
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});

export default TimetableScreen;
