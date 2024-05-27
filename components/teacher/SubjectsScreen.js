import React, { useState } from 'react';
import {
    ScrollView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal

} from "react-native"


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Subject from '../layouts/Subject';
import Card from '../layouts/Card';

import MarksScreen from './MarksScreen';

const SubjectsScreen = () => {

    const [subjects, setSubjects] = useState([
        // example data for now
    
            { subjectid: 1, name: 'Mobile App Development'},
            { subjectid: 1, name: 'Discrete Structures'},
            { subjectid: 1, name: 'Machine Learning'},
            { subjectid: 1, name: 'Numerical Computing'},
            { subjectid: 1, name: 'Web Development'},
            { subjectid: 1, name: 'Software Engineering Concepts'},
        ])

    const [index, setIndex] = useState(null);

  const [list, setList] = useState(subjects);

  const [search, setSearch] = useState("")


  const searchItem = (text) => {

    if (text === "") {
      setList(subjects)
    }
    else {
      setList(() => subjects.filter((element) => element.name.toLowerCase().includes(text.toLowerCase())))
    }
    setSearch(text)
}


    return (

        <View>

            <View style={styles.searchBar}>
                <TextInput style={styles.search}
                    label="Search" placeholder='Search...' placeholderTextColor="#000000"
                    onChangeText={(text) => { searchItem(text) }}
                    value={search}
                    onBlur={() => { setSearch(""); setList(subjects); }}
                />
                <Icon name="magnify" size={30} style={styles.searchIcon} />
            </View>


            <ScrollView>
            {list.map((element, index) =>
          <TouchableOpacity key={element.name} onPress={() => { }}>
            <Subject name={element.name}></Subject>
          </TouchableOpacity>
        )}

                {/* <TouchableOpacity onPress={() => { }}>
                    <Subject name="Mobile App Dev"></Subject>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Subject name="Mobile App Dev"></Subject>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Subject name="Mobile App Dev"></Subject>
                </TouchableOpacity> */}


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
  
    searchIcon:{
      alignSelf: "center",
      backgroundColor: "#8349EA",
      padding: 5,
      borderRadius: 20
      
    },
})

export default SubjectsScreen