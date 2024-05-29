/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  assignClassToTeacher,
  fetchClasses,
  fetchTeachers,
} from '../../api/admin';
import Card from '../layouts/Card';

const ClassesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); // for pop-up
  const [value, setValue] = useState(null); // for dropdown value
  const [open, setOpen] = useState(false); // for dropdown open state
  const [teachers, setTeachers] = useState([]); // to store teachers
  const [classes, setClasses] = useState([]); // to store classes
  const [list, setList] = useState([]); // to store filtered list of classes
  const [search, setSearch] = useState(''); // to store search text
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTeachersData() {
      try {
        setIsLoading(true);
        const teachersList = await fetchTeachers();
        setTeachers(teachersList);
        const classesList = await fetchClasses();
        setClasses(classesList);
        setList(classesList);
        setIsLoading(false);
        list.forEach(classObj => {
          console.log(classObj.assigned); // Output the value of the 'assigned' property
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchTeachersData();
  }, []);

  const searchItem = text => {
    if (text === '') {
      setList(classes);
    } else {
      setList(
        classes.filter(element =>
          element.className.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
    setSearch(text);
  };

  const handleAssignedClass = async () => {
    if (value === null) {
      Alert.alert('Please select a teacher');
      return;
    }
    setModalVisible(false);

    const newClasses = [...classes];
    newClasses[selectedClassIndex].assigned = value !== 'unassign';
    newClasses[selectedClassIndex].teacher =
      value === 'unassign' ? null : value;

    const classData = {
      classId: newClasses[selectedClassIndex].id.toString(),
      teacherId: value === 'unassign' ? null : value,
    };

    setList(newClasses);

    try {
      const outputString = await assignClassToTeacher(classData);
      setClasses(newClasses);
      setList(newClasses);
      Alert.alert(outputString);
    } catch (error) {
      console.error('Error assigning class:', error);
      Alert.alert('Error assigning class');
    }
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.search}
          label="Search"
          placeholder="Search..."
          placeholderTextColor="#000000"
          onChangeText={text => searchItem(text)}
          value={search}
          onBlur={() => {
            setSearch('');
            setList(classes);
          }}
        />
        <Icon name="magnify" size={30} style={styles.searchIcon} />
      </View>

      {isLoading ? <ActivityIndicator size="large" color= '#8349EA' /> : 
      <ScrollView style={styles.scroll}>
        {list.map((element, index) => (
          <TouchableOpacity
            key={element.id}
            onPress={() => {
              setModalVisible(true);
              setSelectedClassIndex(index);
              setValue(element.teacher ? element.teacher : null);
            }}>
              
            <Card
              name={element.className}
              assigned={element.assigned}
              teacher={
                element.teacher
                  ? `Assigned to ${
                      teachers.find(t => t.value === element.teacher)?.label
                    }`
                  : 'Not Assigned'
              }
              cardType="class"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>}
      

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
              items={[{label: 'Unassign', value: 'unassign'}, ...teachers]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setTeachers}
              placeholder="Select a teacher"
            />

            <View style={styles.btnRow}>
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
};

const styles = StyleSheet.create({
  scroll: {
    height: 600,
  },
  searchBar: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'lavender',
    width: 340,
    padding: 3,

    borderRadius: 30,
  },
  search: {
    height: 40,
    width: 295,
    color: '#000000',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  searchIcon: {
    alignSelf: 'center',
    backgroundColor: '#8349EA',
    padding: 5,
    borderRadius: 20,
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
    backgroundColor: '#FFFFFF',
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonSubmit: {
    borderRadius: 17,
    paddingHorizontal: 22,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: '#8349EA',
    marginLeft: 10,
    marginRight: 10,
  },

  cancelText: {
    color: '#6D6D6D',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Poppins-Light',
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
    color: 'black',
  },

  modalText: {
    marginBottom: 15,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
    color: 'black',
  },

  dropdown: {
    // width: 200,
    marginBottom: 10,
    backgroundColor: '#F4F4F4',
    borderColor: '#8349EA',
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});

export default ClassesScreen;
