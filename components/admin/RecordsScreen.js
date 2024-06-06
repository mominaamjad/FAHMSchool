/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {RadioButton} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addStudent,
  createSpecificFeeStatus,
  fetchFees,
  fetchStudents,
  updateFees,
  updateStudent,
} from '../../api/admin';
import Card from '../layouts/Card';
const RecordsScreen = () => {
  const [students, setStudents] = useState([]);
  const [allFeeData, setAllFeeData] = useState([]);

  const [feeData, setFeeData] = useState({
    amountDue: null,
    amountPaid: null,
    lateFees: null,
    payableAmount: null,
    paymentDate: null,
    remarks: '',
    status: '',
    studentRef: '',
  });
  const [list, setList] = useState(students);
  const [index, setIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const [addFeeModalVisible, setAddFeeModalVisible] = useState(false);
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
    {label: 'Nursery', value: '01'},
    {label: 'Prep', value: '02'},
    {label: 'Class 1', value: '03'},
    {label: 'Class 2', value: '04'},
    {label: 'Class 3', value: '05'},
    {label: 'Class 4', value: '06'},
    {label: 'Class 5', value: '07'},
    {label: 'Class 6', value: '08'},
    {label: 'Class 7', value: '09'},
    {label: 'Class 8', value: '10'},
  ]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        const studentList = await fetchStudents();
        setStudents(studentList);
        setList(studentList);
        console.log(list);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading students: ', error);
      }
    };

    loadStudents();
  }, []);

  useEffect(() => {
    const loadFees = async () => {
      try {
        setIsLoading(true);
        const feeList = await fetchFees();
        setAllFeeData(feeList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading students: ', error);
      }
    };

    loadFees();
  }, []);
  const searchItem = text => {
    if (text === '') {
      setList(students);
    } else {
      setList(
        students.filter(element =>
          element.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
    setSearch(text);
  };

  const handleAddStudent = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const currentDate = new Date().getDate();
      let newRegNo;
      console.log(students.length);
      if (students.length > 0) {
        const lastRegNo = students[students.length - 1].regNo;
        const regNoParts = lastRegNo.split('-');
        if (parseInt(regNoParts[0]) === currentYear) {
          const increment = parseInt(regNoParts[1]) + 1;
          const paddedIncrement = String(increment).padStart(3, '0');
          newRegNo = `${currentYear}-${paddedIncrement}`;
        } else {
          newRegNo = `${currentYear}-0001`;
        }
      } else {
        newRegNo = `${currentYear}-0001`;
      }

      const studentWithRegNo = {...newStudent, regNo: newRegNo};
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
        dateOfAdmission: currentDate,
      });
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };

  const handleAddFees = async () => {
    try {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const studentId = students[index].id;
      const feesId = `${studentId}-${currentMonth}-${currentYear}`;
      const addFees = {...feeData, id: feesId};
      await createSpecificFeeStatus(addFees);

      setFeeData({
        amountDue: 0,
        amountPaid: 0,
        lateFees: 0,
        payableAmount: 0,
        paymentDate: '',
        remarks: '',
        status: false,
        createdAt: `${currentMonth}-${currentYear}`,
        studentRef: studentId,
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
      console.log(updatedStudent.regNo);
      console.log(updatedStudent);
      console.log(students);

      await updateStudent(updatedStudent.regNo, updatedStudent);
      console.log('Student updated successfully');
    } catch (error) {
      console.error('Error updating student: ', error);
    }
  };

  const handleChangedFee = async (property, changedValue) => {
    try {
      if (index !== null) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const updatedFeeData = [...allFeeData];
        const newValue = [...students];
        const studentId = newValue[index].regNo;
        updatedFeeData[index][property] = changedValue;
        const feesId = `${studentId}-${currentMonth}-${currentYear}`;
        await updateFees(feesId, updatedFeeData);
        console.log('Fees updated successfully');
        setAllFeeData(updatedFeeData);
      } else {
        console.error('No student selected to update fees');
      }
    } catch (error) {
      console.error('Error updating Fees:', error);
    }
  };

  const handleFilteredList = () => {
    if (value == 'allClasses') {
      setList(students);
    } else {
      setList(() =>
        students.filter(element =>
          element.currentClass.toLowerCase().includes(value),
        ),
      );
    }
  };

  return (
    <View>
      <View style={styles.topBar}>
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
              setList(students);
            }}
          />
          <Icon name="magnify" size={30} style={styles.searchIcon} />
        </View>

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
      <View style={{alignSelf: 'center', zIndex: -1}}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            setAddModalVisible(true);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="plus" size={30} color="white" />
            <Text style={styles.textStyle}> Add Record</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#9C70EA" />
      ) : (
        <ScrollView style={styles.scroll}>
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
        </ScrollView>
      )}

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
                  value={students[index].studentName}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('studentName', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Father Name </Text>
                <TextInput
                  value={students[index].fatherName}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleUpdateStudent('fatherName', text);
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
                  <Text style={styles.submitText}>Current Fee Status</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setModalVisible(false);
                    setEdit(false);
                    setAddFeeModalVisible(true);
                  }}>
                  <Text style={styles.submitText}>Add Fee Status</Text>
                </TouchableOpacity>
              </View>

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

            {/* <ScrollView>
              {Object.keys(newStudent).map((key, index) => (
                <View style={styles.rowStyle} key={index}>
                  <Text style={styles.modalText}>{key}</Text>

                  <TextInput
                    value={newStudent[key]}
                    style={styles.TextInputAdd}
                    onChangeText={text => {
                      setNewStudent({...newStudent, [key]: text});
                    }}
                  />
                </View>
              ))}
            </ScrollView> */}

            <ScrollView>
              {Object.keys(newStudent).map((key, index) => {
                let component;
                // if ( key  === 'dob') {
                //   component = (<DateTimePicker
                //     testID="dateTimePicker"
                //     // value={date}
                //     mode="date"
                //     display="default"
                //     // onChange={onChange}
                //     minimumDate={new Date(2020, 0, 1)} // January 1, 2020
                //     maximumDate={new Date(2030, 11, 31)} // December 31, 2030
                //   />);
                // }
                if (key === 'gender') {
                  component = (
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton
                        value="male"
                        status={checked === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked('male');
                          setNewStudent({...newStudent, [key]: value});
                        }}
                      />
                      <Text style={styles.modalText}>Male</Text>
                      <RadioButton
                        value="female"
                        status={checked === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked('female');
                          setNewStudent({...newStudent, [key]: value});
                        }}
                      />
                      <Text style={styles.modalText}>Female</Text>
                    </View>
                  );
                } else if (key === 'password') {
                  component = (
                    <TextInput
                      value={newStudent[key]}
                      style={styles.TextInputAdd}
                      onChangeText={text => {
                        setNewStudent({...newStudent, [key]: text});
                      }}
                      secureTextEntry
                    />
                  );
                } else {
                  component = (
                    <TextInput
                      value={newStudent[key]}
                      style={styles.TextInputAdd}
                      onChangeText={text => {
                        setNewStudent({...newStudent, [key]: text});
                      }}
                    />
                  );
                }
                return (
                  <View style={styles.rowStyle} key={index}>
                    <Text style={styles.modalText}>{key}</Text>
                    {component}
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={handleAddStudent}
                // onPress={validateInput}
              >
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

      {index != null && allFeeData[index] && (
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
                  value={allFeeData[index].amountDue}
                  style={styles.TextInput}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>
                <TextInput
                  value={allFeeData[index].amountPaid}
                  style={styles.TextInput}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>
                <TextInput
                  value={allFeeData[index].payableAmount}
                  style={styles.TextInput}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <TextInput
                  value={allFeeData[index].paymentDate}
                  style={styles.TextInput}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Late Fees </Text>
                <TextInput
                  value={allFeeData[index].lateFees}
                  style={styles.TextInput}
                  // onChangeText={text => {
                  //   handleChangedFee('lateFees', text);
                  // }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Remarks </Text>
                <TextInput
                  value={allFeeData[index].remarks}
                  style={styles.TextInput}
                  // onChangeText={text => {
                  //   handleChangedFee('remarks', text);
                  // }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setFeeModalVisible(false);
                  }}>
                  <Text style={styles.submitText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {index != null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={addFeeModalVisible}
          onRequestClose={() => {
            setAddFeeModalVisible(!addFeeModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.rowStyle}>
                <Text style={styles.modalHeading}>Create New Fee</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Due </Text>
                <TextInput
                  value={allFeeData.amountDue}
                  style={styles.TextInputAdd}
                  onChangeText={text =>
                    setFeeData({...feeData, amountDue: text})
                  }
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>
                <TextInput
                  value={allFeeData.amountPaid}
                  style={styles.TextInputAdd}
                  onChangeText={text =>
                    setFeeData({...feeData, amountPaid: text})
                  }
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>
                <TextInput
                  value={allFeeData.payableAmount}
                  style={styles.TextInputAdd}
                  onChangeText={text =>
                    setFeeData({...feeData, payableAmount: text})
                  }
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <TextInput
                  value={allFeeData.paymentDate}
                  style={styles.TextInputAdd}
                  onChangeText={text =>
                    setFeeData({...feeData, paymentDate: text})
                  }
                />
              </View>

              <View style={styles.rowStyle}>
                <Text>Late Fees </Text>
                <TextInput
                  value={allFeeData.lateFees}
                  style={styles.TextInputAdd}
                  onChangeText={text =>
                    setFeeData({...feeData, lateFees: text})
                  }
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={feeData.modalText}>Remarks </Text>
                <TextInput
                  value={allFeeData.remarks}
                  style={styles.TextInputAdd}
                  onChangeText={text => setFeeData({...feeData, remarks: text})}
                />
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={async () => {
                    await handleAddFees();
                    setAddFeeModalVisible(!addFeeModalVisible);
                    // setEdit(false);
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
  scroll: {
    height: 520,
    zIndex: -1,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topBar: {
    flexDirection: 'row',
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    // marginBottom: 20,
    margin: 10,
    // marginRight: 10,
    backgroundColor: 'lavender',
    width: 210,
    padding: 3,
    height: 40,
    borderRadius: 30,
  },
  search: {
    // marginTop: 20,
    height: 40,
    width: 160,
    color: '#000000',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  editIcon: {
    paddingTop: 3,
    color: '#9C70EA',
  },

  searchIcon: {
    alignSelf: 'center',
    backgroundColor: '#9C70EA',
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
    height: 40,
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Poppins-Regular',
  },

  TextInputAdd: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9C70EA',
    width: 120,
    color: '#333333',
    marginBottom: 20,
    height: 35,
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

  buttonCancel: {
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#9C70EA',
  },

  buttonAdd: {
    width: 300,
    // alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 17,
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#9C70EA',
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

  cancelButton: {
    marginTop: 20,
    alignSelf: 'center',
  },

  buttonSubmit: {
    borderRadius: 17,
    // paddingHorizontal: 22,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: '#9C70EA',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: 150,
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
    marginTop: 6,
    marginLeft: 20,
    width: 160,
    backgroundColor: '#F4F4F4',
    borderColor: '#9C70EA',
    elevation: 2,
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});
export default RecordsScreen;
