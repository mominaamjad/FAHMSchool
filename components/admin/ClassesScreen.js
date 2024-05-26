import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from "../layouts/Card";



const ClassesScreen = () => {

  // for pop-up 
  const [modalVisible, setModalVisible] = useState(false);

  // for dropdown 
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Unassign', value: 'unassign' },
    { label: 'Sir', value: 'sir' },
    { label: 'Ma\'am', value: 'maam' },
  ]);

  // classes list to be displayed
  const [classes, setClass] = useState([
    // example data for now

        { id: 1, class: 'Class 8', assigned: false},
        { id: 2, class: 'Class 9', assigned: false},
        { id: 3, class: 'Class 10', assigned: false},
    ])

  // to set index of class array for assigning true or false
  const [index, setIndex] = useState(null);

  const [list, setList] = useState(classes);

  const [search, setSearch] = useState("")


  const searchItem = (text) => {

    if (text === "") {
      setList(classes)
    }
    else {
      setList(() => classes.filter((element) => element.class.toLowerCase().includes(text.toLowerCase())))
    }
    setSearch(text)

  }

  handleAssignedClass = () => {
    if (value == null) {
      Alert.alert("pls select teacher");
      return;
    }
    setModalVisible(false);
    const newClass = [...classes];
    if (value == 'unassign') {
      newClass[index].assigned = false;
    } else {
      newClass[index].assigned = true;
    }
    setClass(newClass);
  }

  return (
    <View>

      <View style={styles.searchBar}>
        <TextInput style={styles.search} 
        label="Search" placeholder='Search...' placeholderTextColor="#000000"
        onChangeText={(text) => { searchItem(text) }}
        value={search}
        onBlur={() => { setSearch(""); setList(classes); }}
            />
         <Icon name="magnify" size={30} style={styles.searchIcon}/>
      </View>


      <ScrollView>
        {list.map((element, index) =>
          <TouchableOpacity key={element.id} onPress={() => { setModalVisible(true); setIndex(index) }}>
            <Card name={element.class} assigned={element.assigned} cardType="class"></Card>
          </TouchableOpacity>
        )}
      </ScrollView>

        <Modal
            animationType= "slide"   
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>Class Name</Text>
                    <Text style={styles.modalText}>Choose Teacher</Text>
        
                    <DropDownPicker
                        textStyle = {styles.dropdownText}
                        style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                    <View style = {styles.btnRow}>

                      <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          style={styles.buttonSubmit}
                          onPress={() => handleAssignedClass()}>
                          <Text style={styles.submitText}>Submit</Text>
                      </TouchableOpacity>
                    
                    </View>
                </View>
            </View>
        </Modal>
        
        </View>
    );
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },


      modalView: {
        margin: 20,
        padding: 35,
        backgroundColor: 'white',
        borderRadius: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#8349EA',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#FFFFFF'
      },

      btnRow:{
        flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20
      },

      buttonSubmit: {
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 10,
        elevation: 2,
        backgroundColor: '#8349EA',
        marginLeft: 10,
        marginRight: 10
      },
    
      cancelText:{ 
        color: '#6D6D6D',
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Poppins-Light'
      
      },

      submitText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    
      },


      modalHeading: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
      },


      modalText: {
        marginBottom: 15,
        fontFamily: 'Poppins-Medium',
        textAlign: 'left',
        color: 'black'
      },


      dropdown: {
        // width: 150,
        marginBottom: 10,
        backgroundColor: '#F4F4F4',
        borderColor: '#8349EA'
      },

      dropdownText:{
        fontFamily: 'Poppins-Medium'
      }
})

export default ClassesScreen