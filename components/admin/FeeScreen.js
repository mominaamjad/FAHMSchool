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


const FeeScreen = () => {

  // for pop-up 
  const [modalVisible, setModalVisible] = useState(false);

  // for dropdown 
  const [value, setValue] = useState('allClasses');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'All Classes', value: 'allClasses' },
    { label: 'Class 1', value: 'class1' },
    { label: 'Class 2', value: 'class2' },
    { label: 'Class 3', value: 'class3' },
    { label: 'Class 4', value: 'class4' },
    { label: 'Class 5', value: 'class5' },
    { label: 'Class 6', value: 'class6' },
  ]);

  // students list to be displayed
  const [students, setStudents] = useState([
    {
      class: 'class1', regNo: 'fa21-bcs-011', name: 'amna sohaib', fathername: 'sohaib ahmed',
      dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
      residence: 'smth', dateOfAdmission: '13/7/2021'
    },
    {
      class: 'class2', regNo: 'fa21-bcs-011', name: 'haneen ehsan', fathername: 'sohaib ahmed',
      dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
      residence: 'smth', dateOfAdmission: '13/7/2021'
    },
    {
      class: 'class3', regNo: 'fa21-bcs-0024', name: 'fasiha arshad', fathername: 'sohaib ahmed',
      dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
      residence: 'smth', dateOfAdmission: '13/7/2021'
    },
  ]);


  // to set index of class array for assigning true or false
  const [index, setIndex] = useState(null);

  const [list, setList] = useState(students);

  const [search, setSearch] = useState("")


  const searchItem = (text) => {

    if (text === "") {
      setList(students)
    }
    else {
      setList(() => students.filter((element) => element.name.toLowerCase().includes(text.toLowerCase())))
    }
    setSearch(text)

  }

  handlePaidClass = () => {
    if (value == null) {
      Alert.alert("pls select teacher");
      return;
    }
    setModalVisible(false);
    const newClass = [...students];
    if (value == 'unassign') {
      newClass[index].paid = false;
    } else {
      newClass[index].paid = true;
    }
    setStudents(newClass);
  }


  handleFilteredList = () => {
    if (value == 'allClasses') {
      setList(students)
    }
    else {
      setList(() => students.filter((element) => element.class.toLowerCase().includes(value)))
    }
  }

  return (
    <View>


      {/* change the function to find fee instead of students  */}

      <View style={styles.searchBar}>
        <TextInput style={styles.search}
          label="Search"
          onChangeText={(text) => { searchItem(text) }}
          value={search}
          onBlur={() => { setSearch(""); setList(students); }}
        />
        <Icon name="magnify" size={30} style={styles.searchIcon} />

        <DropDownPicker
          textStyle={styles.dropdownText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={() => handleFilteredList()}
        />

      </View>


      <ScrollView style={{ zIndex: -1 }}>
        {list.map((element, index) =>
          <TouchableOpacity onPress={() => { setModalVisible(true); setIndex(index) }}>
            <Card name={element.name} regNo={element.regNo} paid={element.paid} cardType="fee"></Card>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
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
              textStyle={styles.dropdownText}
              style={styles.dropdown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />

            <View style={styles.btnRow}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => handlePaidClass()}>
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
    marginTop: 20,
    margin: 10,
    backgroundColor: 'lavender',
    width: 250,
    padding: 3,

    borderRadius: 30

  },
  search: {
    height: 40,
    width: 200,
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

  btnRow: {
    flexDirection: 'row',
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

  cancelText: {
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
    marginLeft: 20,
    width: 120,
    backgroundColor: '#F4F4F4',
    borderColor: '#8349EA'
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium'
  }
})

export default FeeScreen