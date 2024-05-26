import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal

} from "react-native"

import { TextInput } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from "../layouts/Card";


const RecordsScreen = () => {


    const [students, setStudents] = useState([
        {
            class: 'class1' , regNo: 'fa21-bcs-011', name: 'amna sohaib', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
        {
            class: 'class2' , regNo: 'fa21-bcs-011', name: 'haneen ehsan', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
        {
            class: 'class3' , regNo: 'fa21-bcs-0024', name: 'fasiha arshad', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
    ]);

    const [list, setList] = useState(students);

    const [index, setIndex] = useState(null);

    const [search, setSearch] = useState("")

    const [modalVisible, setModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);


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

    const searchItem = (text) => {

        if (text === "") {
            setList(students)
        }
        else {
            setList(() => students.filter((element) => element.name.toLowerCase().includes(text.toLowerCase())))
        }
        setSearch(text)

    }

    handleChangedStudent = (property, changedValue) => {
        const newValue = [...students];
        newValue[index][property] = changedValue;
        setStudents(newValue);
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

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.search}
                    label="Search"
                    onChangeText={(text) => { searchItem(text) }}
                    value={search}
                    onBlur={() => { setSearch(""); setList(students); }}
                />
                <Icon name="magnify" size={30} style={styles.searchIcon}/>

                <DropDownPicker
                        textStyle = {styles.dropdownText}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={()=>handleFilteredList()}
                    />

            </View>

            <ScrollView style={{zIndex: -1}}>
                {list.map((element, index) =>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setIndex(index) }}>
                        <Card name={element.name} regNo={element.regNo} cardType="student"></Card>
                    </TouchableOpacity>
                )}

            </ScrollView>

            {index != null && (
            <Modal
                animationType='slide'
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
                                    onChangeText={(text) => {handleChangedStudent('name',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Father Name </Text>
                                <TextInput
                                    value={students[index].fathername}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('fathername',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Date of Birth </Text>
                                <TextInput
                                    value={students[index].dob}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('dob',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Gender </Text>
                                <TextInput
                                    value={students[index].gender}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('gender',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Caste </Text>
                                <TextInput
                                    value={students[index].caste}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('caste',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Occupation </Text>
                                <TextInput
                                    value={students[index].occupation}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('occupation',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Residence </Text>
                                <TextInput
                                    value={students[index].residence}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('residence',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Date of Admission </Text>
                                <TextInput
                                    value={students[index].dateOfAdmission}
                                    style={styles.TextInput}
                                    onChangeText={(text) => {handleChangedStudent('dateOfAdmission',text)}}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            

                                <View style = {styles.btnRow}>

                                    <TouchableOpacity
                                        style={styles.buttonSubmit}
                                        onPress={() => handleAssignedClass()}>
                                        <Text style={styles.submitText}>Add Fee Status</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.cancelText}>OK</Text>
                                    </TouchableOpacity>

                                </View>
                            
                    </View>
                </View>
            </Modal>
            )}


        </View>


    );
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: 20,
        margin: 10,
        marginRight: 10,
        backgroundColor: 'lavender',
        width: 250,
        padding: 3,
        height: 50,
        borderRadius: 30
        
    },
    search: {
        height: 30,
        width: 200,
        color: "#000000",
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
        
    },
    editIcon: {
        paddingTop: 3,
        color: "#8349EA"
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
    TextInput: {
        height: 36,
        fontSize: 14,
        color: '#333333',
        fontFamily: 'Poppins-Regular'
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
        backgroundColor: '#FFFFFF'
    },

    
    buttonCancel: {
        marginTop: 10,
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: '#8349EA'

    },

    textStyle: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
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
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'left',
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },

    dropdown: {
        marginLeft: 20,
        width: 120,
        backgroundColor: '#F4F4F4',
        borderColor: '#8349EA'
      },

      dropdownText:{
        fontFamily: 'Poppins-Medium'
      }
})

export default RecordsScreen