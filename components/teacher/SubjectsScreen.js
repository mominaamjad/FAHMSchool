import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { viewSubjects } from '../../api/teacher';

import Subject from '../layouts/Subject';
import Card from '../layouts/Card';
import MarksScreen from './MarksScreen';

const SubjectsScreen = ({ teacher }) => {

  const [subjects, setSubjects] = useState([]);
  const [list, setList] = useState(subjects);

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
  }, []);

   // to navigate to marks screen for each subject
  const showMarks = ()=>{
    
  }

  return (
    <View>
      <ScrollView>
        {list.map((element, index) =>
          <TouchableOpacity key={element} onPress={() => { }}>
            <Subject name={element}></Subject>
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
    backgroundColor: "#8349EA",
    padding: 5,
    borderRadius: 20
  },
})

export default SubjectsScreen