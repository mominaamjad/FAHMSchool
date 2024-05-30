import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, DataTable } from "react-native-paper";

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { editMarks, fetchClassStudents } from '../../api/teacher';

// what we want in this screen is for example i click on english
// this markss screen opens
// it show me a list of students which are in this class
// how willl i get the students.
// 1:
// i have subject id, i can go to marks and retrieve all records with that subject id and current yeaar
// pre-condition: when adding a student record, genrerate the marks document for each subject
// 2:
// from the class ref of teacher, i matvch all students having that class ref in current class
// load all those students and when teacher saves marks, the marks document is generated for all of them with that subjectID
// and curretn year

// second better

const Main = ({route}) => {
    const { subject , classRef } = route.params;

    const [edit, setEdit] = useState(false);
    const [students, setStudent] = useState([]);
    const [value, setValue] = useState('first');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'First', value: 'first' },
        { label: 'Mids', value: 'mid' },
        { label: 'Finals', value: 'final' }
    ]);

    const fetchStudents = async () => {
        try {
          const studentData = await fetchClassStudents(subject, classRef);
          setStudent(studentData);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      useEffect(() => {
        fetchStudents();
        return () => { };
      }, [subject]);

      const updateMarks = async () => {
        try {
          await editMarks(students, subject);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      useEffect(() => {
        if (!edit) {
            console.log("console ke ander wala students:",students);
          updateMarks();
        }
        return () => {};
      }, [edit]);

    handleMidMarks = (value, index) => {
        const newStudent = [...students];
        const marks=value>subject.firstMid?"0":value;
        const numericValue = parseInt(marks, 10);
        newStudent[index].mids = isNaN(numericValue) ? '0' : numericValue;
        setStudent(newStudent);
    }

    handleFinalMarks = (value, index) => {
        const newStudent = [...students];
        const marks=value>subject.final?"0":value;
        const numericValue = parseInt(marks, 10);
        newStudent[index].finals = isNaN(numericValue) ? '0' : numericValue;
        setStudent(newStudent);
    }

    handleFirstMarks = (value, index) => {
        const newStudent = [...students];
        const marks=value>subject.firstMid?"0":value;
        const numericValue = parseInt(marks, 10);
        newStudent[index].firstTerm = isNaN(numericValue) ? '0' : numericValue;
        setStudent(newStudent);
    }

    return (
        <View style={styles.main}>
            <View style={styles.topBar}>
                {(edit) ? (
                    <Icon name="check" size={25} style={styles.editIcon} onPress={() => setEdit(false)} />
                ) : (
                    <Icon name="pencil" size={25} style={styles.editIcon} onPress={() => setEdit(true)} />
                )}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdown}
                    textStyle={styles.dropdownText}
                />
            </View>
            <View style={styles.container}>
                <DataTable>
                    <DataTable.Header style={styles.head}>
                        <Text style={styles.tableTitle}>Registration No</Text>
                        <Text style={styles.tableTitle}>Marks</Text>
                    </DataTable.Header>

                    <ScrollView style={styles.listBackground}>
                        {students.map((element, index) => {
                            let inputComponent;

                            if (value === 'mid') {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.mids)}
                                        editable={edit}
                                        onChangeText={(text) => handleMidMarks(text, index)}
                                        underlineColor="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            } else if (value === 'final') {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.finals)}
                                        editable={edit}
                                        onChangeText={(text) => handleFinalMarks(text, index)}
                                        underlineColor="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            } else {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.firstTerm)}
                                        editable={edit}
                                        onChangeText={(text) => handleFirstMarks(text, index)}
                                        underlineColor="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            }

                            return (
                                <DataTable.Row key={index} style={styles.row}>
                                    <DataTable.Cell> <Text style = {styles.names}> {element.regNo}</Text></DataTable.Cell>
                                    <DataTable.Cell>{inputComponent}</DataTable.Cell>
                                    {/* <TouchableOpacity>
                                        <Icon name="delete" size={20} onPress = { ()=>{} } style = {styles.deleteIcon}/>
                                    </TouchableOpacity> */}
                                </DataTable.Row>
                            );
                        })}
                    </ScrollView>
                </DataTable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 30
    },
    head: {
        zIndex: -1,
        height: 50,
        backgroundColor: '#9C70EA',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderRadius: 20,
        marginTop: 10
    },
    tableTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        marginHorizontal: 13,
        marginTop: 13
    },

    names: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },

    deleteIcon: {
        marginTop: 13,
        marginLeft: 15,
        color: 'red'
    },
    row: {
        // height: 40,
        backgroundColor: 'lavender'
    },
    main: {
        flex: 1,
        //   alignItems: 'center',
    },
    heading: {
        margin: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    topBar: {
        display: "flex",
        flexDirection: 'row',
        margin: 10,
        marginTop: 30
        // elevation: 10
    },
    editIcon: {
        paddingTop: 13,
        paddingLeft: 20,
        color: "#9C70EA",
        alignSelf: "flex-start"
    },
    TextInput: {
        fontFamily: 'Poppins-Regular',
        marginLeft: 70,
        backgroundColor: 'lavender',
        height: 20
    },
    dropdown: {
        marginLeft: 20,
        width: 220,
        align: "center",
        backgroundColor: '#F4F4F4',
        borderColor: '#9C70EA'
    },

    dropdownText: {
        fontFamily: 'Poppins-Medium'
    },
    selectedLabel: {
        fontWeight: 'bold'
    },
    listBackground: {
        backgroundColor: "lavender",
        opacity: .5,
        padding: 10,
        margin: 10,
        borderRadius: 25,
    },
    list: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    listItem: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontWeight: "bold",
        color: 'grey',
    },
})

export default Main