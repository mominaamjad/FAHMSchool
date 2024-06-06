/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchFees, fetchStudents} from '../../api/admin';

import DropDownPicker from 'react-native-dropdown-picker';

import Card from '../layouts/Card';

const StudentFee = ({student}) => {
  const [allFeeData, setAllFeeData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const regNo = student.regNo;
  const [students, setStudents] = useState([]);
  const [list, setList] = useState(students);
  const [index, setIndex] = useState(null);
  const [filteredStudent, setFilteredStudent] = useState(null);
  const [value, setValue] = useState('Select');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'All', value: 'allFees'},
    {label: 'Paid', value: 'paid'},
    {label: 'Unpaid', value: 'unpaid'},
  ]);

  useEffect(() => {
    const loadFees = async () => {
      try {
        const feeList = await fetchFees();
        setAllFeeData(feeList);
      } catch (error) {
        console.error('Error loading students: ', error);
      }
    };

    loadFees();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentList = await fetchStudents();
        console.log(studentList);
        console.log(studentList.map(s => s.regNo));
        console.log(regNo);
        const newStudent = studentList.find(s => s.regNo === regNo);
        setStudents(newStudent ? [newStudent] : []);
        setList(newStudent ? [newStudent] : []);
        console.log(newStudent);
      } catch (error) {
        console.error('Error loading students: ', error);
      }
    };
    loadStudents();
  }, []);
  const handleFilteredList = () => {
    var check;
    if (value == 'paid') {
      check = false; // fees is not late
    } else if (value == 'unpaid') {
      check = true; // fees is late
    }

    if (value == 'allFees') {
      setList(students);
    } else {
      setList(() => students.filter(element => element.lateFees === check));
    }
  };
  // handlePaidClass = () => {
  //     if (value == null) {
  //         Alert.alert("pls select teacher");
  //         return;
  //     }
  //     setModalVisible(false);
  //     const newClass = [...students];
  //     if (value == 'unassign') {
  //         newClass[index].paid = false;
  //     } else {
  //         newClass[index].paid = true;
  //     }
  //     setStudents(newClass);
  // }

  return (
    <View>
      {/* fee is displayed month-wise for each student and details in pop-up*/}


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

      <ScrollView style={{zIndex: -1}}>
        {list.map((element, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setModalVisible(true);
              setIndex(index);
            }}>
            <Card
              name={allFeeData[index].amountDue}
              regNo={allFeeData[index].payableAmount}
              paid={element.status}
              cardType="fee"></Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {index != null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.rowStyle}>
                <Text style={styles.modalHeading}>Fee Information</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Registration Number </Text>
                <Text style={styles.modalText}>{students[index].regNo}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Name </Text>
                <Text style={styles.modalText}>
                  {students[index].studentName}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Due </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].amountDue}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].amountPaid}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].payableAmount}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].paymentDate}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Late Fees </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].lateFees ? 'yes' : 'no'}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Remarks </Text>
                <Text style={styles.modalText}>
                  {allFeeData[index].remarks}
                </Text>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.submitText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchBar: {
    flexDirection: 'row',
    marginTop: 20,
    margin: 10,
    marginRight: 10,
    backgroundColor: 'lavender',
    width: 330,
    height: 40,
    borderRadius: 30,
    alignSelf: 'center',
  },
  search: {
    // height: 30,
    width: 290,
    color: '#000000',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  searchIcon: {
    alignSelf: 'center',
    backgroundColor: '#9C70EA',
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
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    justifyContent: 'center',
    shadowColor: '#9C70EA',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },

  TextInput: {
    height: 39,
    width: 130,
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9C70EA',
    margin: 2,
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
    backgroundColor: '#9C70EA',
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
    marginTop: 10,
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },

  dropdown: {
    // marginLeft: 250,
    marginVertical: 10,
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    borderColor: '#9C70EA',
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});

export default StudentFee;
