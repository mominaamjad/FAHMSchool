/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchFees, fetchStudents} from '../../api/admin';
import Card from '../layouts/Card';

const FeeScreen = () => {
  // for pop-up
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  // for dropdown
  const [allFeeData, setAllFeeData] = useState([]);
  const [value, setValue] = useState('allClasses');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'All Classes', value: 'allClasses'},
    {label: 'Class 1', value: 'class1'},
    {label: 'Class 2', value: 'class2'},
    {label: 'Class 3', value: 'class3'},
    {label: 'Class 4', value: 'class4'},
    {label: 'Class 5', value: 'class5'},
    {label: 'Class 6', value: 'class6'},
  ]);

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
  const [students, setStudents] = useState([]);
  const [index, setIndex] = useState(null);
  const [list, setList] = useState(students);
  const [search, setSearch] = useState('');

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

  // handlePaidClass = () => {
  //   if (value == null) {
  //     Alert.alert("pls select teacher");
  //     return;
  //   }
  //   setModalVisible(false);
  //   const newClass = [...students];
  //   if (value == 'unassign') {
  //     newClass[index].paid = false;
  //   } else {
  //     newClass[index].paid = true;
  //   }
  //   setStudents(newClass);
  // }

  const handleFilteredList = () => {
    if (value == 'allClasses') {
      setList(students);
    } else {
      setList(() =>
        students.filter(element => element.class.toLowerCase().includes(value)),
      );
    }
  };

  return (
    <View>
      {/* change the function to find fee instead of students  */}

      <View style={styles.topBar}>
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
      </View>

      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            setFeeModalVisible(true);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="plus" size={30} color="white" />
            <Text style={styles.textStyle}> Add Record</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{zIndex: -1, height: 500}}>
        {list.map((element, index) => (
          <TouchableOpacity
            key={element.regNo}
            onPress={() => {
              setModalVisible(true);
              setIndex(index);
            }}>
            <Card
              name={element.studentName}
              regNo={element.regNo}
              paid={() => {
                allFeeData.find(element.id) ? allFeeData.status : 'none';
              }}
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
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Icon name="pencil" size={20} style={styles.editIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Registration Number </Text>
                <Text style={styles.modalText}>{students[index].regNo}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Names </Text>
                <Text style={styles.modalText}>
                  {students[index].studentName}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Due </Text>

                <Text style={styles.modalText}>
                  {students[index].amountDue}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>

                <Text style={styles.modalText}>
                  {students[index].amountPaid}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>

                <Text style={styles.modalText}>
                  {students[index].payableAmount}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <Text style={styles.modalText}>
                  {students[index].paymentDate}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Late Fees </Text>

                <Text style={styles.modalText}>{students[index].lateFees}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Remarks </Text>

                <Text style={styles.modalText}>{students[index].remarks}</Text>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setEdit(false);
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
                  value={String(allFeeData.amountDue)}
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
                  value={String(allFeeData.amountPaid)}
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
                  value={String(allFeeData.payableAmount)}
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
                <Text>{allFeeData.paymentDate}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={allFeeData.modalText}>Late Fees </Text>
                <Text>{String(students[index].lateFees)}</Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={allFeeData.modalText}>Remarks </Text>
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
                  onPress={async () => {
                    await handleChangedFee();
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

  topBar: {
    flexDirection: 'row',
    marginTop: 20,
  },

  search: {
    // height: 30,
    width: 160,
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
    marginLeft: 20,
    width: 120,
    backgroundColor: '#F4F4F4',
    borderColor: '#9C70EA',
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});

export default FeeScreen;
