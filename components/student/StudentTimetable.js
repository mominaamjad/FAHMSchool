import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native"

import { launchImageLibrary } from 'react-native-image-picker';
import { getTimetable } from '../../api/student';

const StudentTimetable = () => {

  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [timetableImg, setTimetableImg] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    fetchTimetable();
    console.log(timetableImg)
  });

  // const fetchTimetable = async () => {
  //   try {
  //     // setIsLoading(true)
  //     const timetableData = await getTimetable('2024');
  //     if (timetableData && timetableData.timetableImg) {
  //       setTimetableImg(timetableData.timetableImg);
  //       console.log('found table')
  //     } else {
  //       setTimetableImg(null);
  //       console.log('no table') 
  //     }
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.error('Error fetching timetable: ', error);
  //   }
  // };


  return (
    <View>
      {isLoading ? <ActivityIndicator size="large" color='#9C70EA' /> :
        
          timetableImg ? ( timetableImg &&
            <Image source={{ uri: timetableImg }} style={styles.pic} />
          ) : (
            <View style={styles.NoImage}>

              <Text style={styles.NoImageText}>No timetable found</Text>

            </View>
          )
        
      }
    </View>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: 340,
    height: 220,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 7,
    marginTop: 70,
  },
  NoImage: {
    margin: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#9C70EA',
    borderRadius: 24,
    width: 300,
    height: 300,
  },
  NoImageText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginTop: 120
  }
})

export default StudentTimetable