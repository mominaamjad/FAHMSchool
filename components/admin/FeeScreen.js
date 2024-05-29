import React, {useState} from 'react';
import {
  Alert,
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
import Card from '../layouts/Card';


const FeeScreen = () => {
  // for pop-up
  const [modalVisible, setModalVisible] = useState(false);

  const [edit, setEdit] = useState(false);

  // for dropdown
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

  // students list to be displayed
  const [students, setStudents] = useState([
    {
      class: 'class1',
      regNo: 'fa21-bcs-011',
      name: 'amna sohaib',
      amountDue: 3456,
      amountPaid: 3245,
      payableAmount: 356,
      paymentDate: '1/1/2024',
      lateFees: false,
      remarks: 'smth',
    },
    {
      class: 'class2',
      regNo: 'fa21-bcs-012',
      name: 'amna sohaib',
      amountDue: 3456,
      amountPaid: 3245,
      payableAmount: 356,
      paymentDate: '1/1/2024',
      lateFees: false,
      remarks: 'smth',
    },
    {
      class: 'class3',
      regNo: 'fa21-bcs-013',
      name: 'amna sohaib',
      amountDue: 3456,
      amountPaid: 3245,
      payableAmount: 356,
      paymentDate: '1/1/2024',
      lateFees: false,
      remarks: 'smth',
    },
    {
      class: 'class4',
      regNo: 'fa21-bcs-014',
      name: 'amna sohaib',
      amountDue: 3456,
      amountPaid: 3245,
      payableAmount: 356,
      paymentDate: '1/1/2024',
      lateFees: false,
      remarks: 'smth',
    },
  ]);

  // to set index of class array for assigning true or false
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

      <ScrollView style={{zIndex: -1}}>
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
              paid={element.paid}
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
                <Text style={styles.modalText}>Name </Text>
                <TextInput
                  value={students[index].name}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('name', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Due </Text>
                <TextInput
                  value={String(students[index].amountDue)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('amountDue', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Amount Paid </Text>
                <TextInput
                  value={String(students[index].amountPaid)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('amountPaid', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payable Amount </Text>
                <TextInput
                  value={String(students[index].payableAmount)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('payableAmount', parseInt(text));
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Payment Date </Text>
                <TextInput
                  value={students[index].paymentDate}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('paymentDate', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Late Fees </Text>
                <TextInput
                  value={String(students[index].lateFees)}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('lateFees', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
              </View>

              <View style={styles.rowStyle}>
                <Text style={styles.modalText}>Remarks </Text>
                <TextInput
                  value={students[index].remarks}
                  style={styles.TextInput}
                  onChangeText={text => {
                    handleChangedStudent('remarks', text);
                  }}
                  editable={edit}
                  underlineColor="transparent"
                />
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
    </View>
  );
};

styles = StyleSheet.create({
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
