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
            class: 'class2' , regNo: 'fa21-bcs-011', name: 'amna sohaib', fathername: 'sohaib ahmed',
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
    const [value, setValue] = useState();
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

    handleChangedStudent = () => {
        setModalVisible(!modalVisible);
        setEdit(false);
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

            <View style={{flexDirection:'row'}}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.search}
                        label="Search"
                        onChangeText={(text) => { searchItem(text) }}
                        value={search}
                        onBlur={() => { setSearch(""); setList(students); }}
                    />
                    <Icon name="magnify" size={30} style={styles.editIcon} />

                    </View>
                    <DropDownPicker
                        textStyle={styles.dropdownText}
                        style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}

                        onChangeValue={() => handleFilteredList()}
                    />
            </View>

            <ScrollView>
                {list.map((element, index) =>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setIndex(index) }}>
                        <Card name={element.name} regNo={element.regNo} cardType="student"></Card>
                    </TouchableOpacity>
                )}

            </ScrollView>

            {index != null && (
                <Modal
                    animationType='fade'
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
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Father Name </Text>
                                <TextInput
                                    value={students[index].fathername}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Date of Birth </Text>
                                <TextInput
                                    value={students[index].dob}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Gender </Text>
                                <TextInput
                                    value={students[index].gender}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Caste </Text>
                                <TextInput
                                    value={students[index].caste}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Occupation </Text>
                                <TextInput
                                    value={students[index].occupation}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Residence </Text>
                                <TextInput
                                    value={students[index].residence}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Date of Admission </Text>
                                <TextInput
                                    value={students[index].dateOfAdmission}
                                    style={styles.TextInput}
                                    editable={edit}
                                    underlineColor='transparent'
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                <TouchableOpacity
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={() => { handleChangedStudent() }}>
                                    <Text style={styles.textStyle}>{edit ? 'Done' : 'Close'}</Text>
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
        margin: 10,
        backgroundColor: 'lavender',
        width: 250,
        flexDirection: 'row-reverse'
    },
    search: {
        height: 40,
        width: 200,

    },
    editIcon: {
        paddingTop: 3,
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
        color: '#333333'
    },
    modalView: {
        width: 370,
        // margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 45,
        // alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'lavender'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        margin: 30
    },
    buttonSubmit: {
        backgroundColor: '#2196F3',
    },
    buttonCancel: {
        marginTop: 10,
        padding: 13,
        backgroundColor: '#7239D6'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
    modalText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: 'left',
        color: 'black',
    },
})

export default RecordsScreen