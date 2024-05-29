/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addStudent, createSpecificFeeStatus, fetchStudents, updateFees, updateStudent } from '../../api/admin';
import Card from '../layouts/Card';
const RecordsScreen = () => {
  const [students, setStudents] = useState([]);
  const [feeData, setFeeData] = useState({
    amountDue: '',
    amountPaid: '',
    lateFees: '',
    payableAmount: '',
    paymentData: '',
    remarks: '',
    status: '',
    studentRef: '',
  });
  const [list, setList] = useState(students);
  const [index, setIndex] = useState(null);
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    admissionClass: '',
    currentClass: '',
    studentName: '',
    fatherName: '',
    dob: '',
    gender: '',
    caste: '',
    occupation: '',
    residence: '',
    email: '',
    password: '',
    remarks: '',
  });


  const [edit, setEdit] = useState(false);
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


  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true)
        const studentList = await fetchStudents();
        setStudents(studentList);
        setList(studentList);
        console.log(list);
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading students: ', error);
      }
    };

    loadStudents();
  }, []);
  const searchItem = text => {
    if (text === '') {
      setList(students);
    } else {
      setList(() =>
        students.filter(element =>
          element.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
    setSearch(text);
  };
  const handleAddFees = async () => {
    try {
      const addFees = { ...feeData };
      await createSpecificFeeStatus(addFees);
      setFeeData({
        admissionClass: '',
        currentClass: '',
        studentName: '',
        fatherName: '',
        dob: '',
        gender: '',
        caste: '',
        occupation: '',
        residence: '',
        email: '',
        password: '',
        remarks: '',
      });
    } catch (error) {
      console.error('Error adding fees: ', error);
    }
  };
  const handleUpdateStudent = async (property, changedValue) => {
    try {
      const newValue = [...students];
      newValue[index][property] = changedValue;
      setStudents(newValue);

      const updatedStudent = newValue[index];
      await updateFees(updatedStudent.id, updatedStudent);
      console.log('Student updated successfully');
    } catch (error) {
      console.error('Error updating student: ', error);
    }
  };

  const handleChangedFee = async (property, changedValue) => {
    try {
      const newValue = [...feeData];
      newValue[index][property] = changedValue;
      setFeeData(newValue);

      const updatesFees = newValue[index];
      await updateStudent(updatesFees.id, updatesFees);
      console.log('Fees updated successfully');
    } catch (error) {
      console.error('Error updating Fees: ', error);
    }
  };

  const handleFilteredList = () => {
    if (value == 'allClasses') {
      setList(students);
    } else {
      setList(() =>
        students.filter(element => element.class.toLowerCase().includes(value)),
      );
    }
  };
  const handleAddStudent = async () => {
    try {
      const currentYear = new Date().getFullYear();
      let newRegNo = `${currentYear}-0`;
      if (students.length > 0) {
        const lastRegNo = students[students.length - 1].id;
        if (lastRegNo) {
          const regNoParts = lastRegNo.split('-');
          if (parseInt(regNoParts[0]) === currentYear) {
            const increment = parseInt(regNoParts[1]) + 1;
            newRegNo = `${currentYear}-${increment}`;
          }
        }
      }

      const studentWithRegNo = { ...newStudent, regNo: newRegNo };
      await addStudent(studentWithRegNo);
      setStudents([...students, studentWithRegNo]);
      setAddModalVisible(false);
      setNewStudent({
        admissionClass: '',
        currentClass: '',
        studentName: '',
        fatherName: '',
        dob: '',
        gender: '',
        caste: '',
        occupation: '',
        residence: '',
        email: '',
        password: '',
        remarks: '',
      });
    } catch (error) {
      console.error('Error adding student: ', error);
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
          onChangeText={text => {
            searchItem(text);
          }}
          value={search}
          onBlur={() => {
            setSearch('');
            setList(students);
          }}
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
      <View style={{alignSelf: 'center'}}>
        

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            setAddModalVisible(true);
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="plus" size={30} color="white" />
            <Text style={styles.textStyle}> Add Record</Text>
          </View>
        </TouchableOpacity>
      </View>


      {isLoading ? <ActivityIndicator size="large" color='#8349EA' /> :
        <ScrollView style={{ zIndex: -1 }}>
          {list.map((element, index) => (
            <TouchableOpacity
              key={element.regNo}
              onPress={() => {
                setModalVisible(true);
                setIndex(index);
              }}>
              <Card
                name={element.name}
                regNo={element.regNo}
                cardType="student"></Card>
            </TouchableOpacity>
          ))}
        </ScrollView>}

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
                <Text style={styles.modalHeading}>Student Record</Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Icon name="pencil" size={20} style={styles.editIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Registration Number </Text>
                <Text style={styles.modalText}>{students[index].regNo}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Name </Text>
                <TextInput
                  value={students[index].name}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('name', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Father Name </Text>
                <TextInput
                  value={students[index].fathername}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('fathername', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Date of Birth </Text>
                <TextInput
                  value={students[index].dob}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('dob', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Gender </Text>
                <TextInput
                  value={students[index].gender}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('gender', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Caste </Text>
                <TextInput
                  value={students[index].caste}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('caste', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Occupation </Text>
                <TextInput
                  value={students[index].occupation}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('occupation', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Residence </Text>
                <TextInput
                  value={students[index].residence}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('residence', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Date of Admission </Text>
                <TextInput
                  value={students[index].dateOfAdmission}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('dateOfAdmission', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setModalVisible(false);
                    setEdit(false);
                    setFeeModalVisible(true);
                  }}>
                  <Text style={styles.submitText}>Add Fee Status</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={async () => {
                    await handleUpdateStudent();
                    setModalVisible(false);
                    setEdit(false);
                  }}>
                  <Text style={styles.cancelText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rowStyle}>
              <Text style={styles.modalHeading}>Add Student Record</Text>
            </View>

          <ScrollView>
            {Object.keys(newStudent).map((key, index) => (

              // if ({key} == 'dob') {

              // }
              <View style={styles.rowStyle} key={index}>
                <Text style={styles.modalText}>{key}</Text>
             
                <TextInput
                  value={newStudent[key]}
                  style={styles.TextInputAdd}
                  onChangeText={text => {
                    setNewStudent({ ...newStudent, [key]: text })
                  }
                }
                />
              </View>
            ))}
            </ScrollView>

            {/* <ScrollView>
              {Object.keys(newStudent).map((key, index) => {

                let component;
                if ( key  === 'dob') {
                  component = (<DateTimePicker
                    testID="dateTimePicker"
                    // value={date}
                    mode="date"
                    display="default"
                    // onChange={onChange}
                    minimumDate={new Date(2020, 0, 1)} // January 1, 2020
                    maximumDate={new Date(2030, 11, 31)} // December 31, 2030
                  />);
                }
                else {
                  component =
                    (<TextInput
                      value={newStudent[key]}
                      style={styles.TextInputAdd}
                      onChangeText={text => {
                        setNewStudent({ ...newStudent, [key]: text })
                      }
                      }
                    />);
                }
                return(
                <View style={styles.rowStyle} key={index}>
                  <Text style={styles.modalText}>{key}</Text>
                  {component}
                </View>
                )
              })}
            </ScrollView> */}

            
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={handleAddStudent}>
                <Text style={styles.submitText}>Add Record</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={async () => {
                    setAddModalVisible(false);
                  }}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {index != null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={feeModalVisible}
          onRequestClose={() => {
            setFeeModalVisible(!feeModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.rowStyle}>
                <Text style={styles.modalHeading}>Fee Information</Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Icon name="pencil" size={20} style={styles.editIcon} />
                </TouchableOpacity>
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
                <TextInput
                  value={String(feeData[index].amountDue)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('amountDue', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>
                <TextInput
                  value={String(feeData[index].amountPaid)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('amountPaid', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>
                <TextInput
                  value={String(feeData[index].payableAmount)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('payableAmount', parseInt(text));
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <TextInput
                  value={feeData[index].paymentDate}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('paymentDate', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={feeData.modalText}>Late Fees </Text>
                <TextInput
                  value={String(students[index].lateFees)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('lateFees', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={feeData.modalText}>Remarks </Text>
                <TextInput
                  value={students[index].remarks}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedFee('remarks', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setFeeModalVisible(!feeModalVisible);
                    setEdit(false);
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
    width: 200,
    height: 40,
    borderRadius: 30,
  },
  search: {
    // height: 30,
    width: 160,
    color: '#000000',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  editIcon: {
    paddingTop: 3,
    color: '#8349EA',
  },

  searchIcon: {
    alignSelf: 'center',
    backgroundColor: '#8349EA',
    padding: 5,
    borderRadius: 20,
  },

  dropdownAndAdd: {
    flexDirection: 'row',
    marginVertical: 10,

  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  TextInput: {
    height: 36,
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Poppins-Regular',
  },

  TextInputAdd: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8349EA',
    width: 120,
    marginBottom: 20,
    height: 35,
  },

  modalView: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    justifyContent: 'center',
    shadowColor: '#8349EA',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },

  buttonCancel: {
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#8349EA',
  },

  buttonAdd: {
    width: 300,
    // alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 17,
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#8349EA',
    marginTop: 20,
    marginRight: 12,
    marginBottom: 10,
    zIndex: -1,
  },

  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: 5,
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
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },

  dropdown: {
    marginLeft: 20,
    width: 150,
    backgroundColor: '#F4F4F4',
    borderColor: '#8349EA',
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});
export default RecordsScreen;
