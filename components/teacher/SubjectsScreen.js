import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { viewSubjects } from '../../api/teacher';

import Subject from '../layouts/Subject';

const Stack = createStackNavigator();

const SubjectsScreen = ({ teacher }) => {

  const [subjects, setSubjects] = useState([]);
  const [list, setList] = useState(subjects);
  const navigation = useNavigation();

  // for getting subject listtt
  const fetchSubjects = async () => {
    try {
      const subjectData = await viewSubjects(teacher);
      console.log(subjectData);
      setSubjects(subjectData);
      setList(subjectData);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    return () => { };
  }, [teacher]);

   // to navigate to marks screen for each subject
  const showMarks = (subject)=>{
    navigation.navigate('MarksScreen', { subject });
  }

  return (
    <View>
      <ScrollView>
        {list.map((element, index) =>
          <TouchableOpacity key={element.subjectId} onPress={() => showMarks(element)}>
            <Subject name={element.name}></Subject>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'lavender',
    width: 340,
    padding: 3,
    borderRadius: 30
  },
  search: {
    height: 40,
    width: 295,
    color: "#000000",
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  searchIcon: {
    alignSelf: "center",
    backgroundColor: "#9C70EA",
    padding: 5,
    borderRadius: 20
  },
})

export default SubjectsScreen;