import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { TextInput, DataTable } from "react-native-paper";

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Main = () => {
    const [edit, setEdit] = useState(false);

    const [value, setValue] = useState('first');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'First', value: 'first' },
        { label: 'Mids', value: 'mids' },
        { label: 'Finals', value: 'finals' }
    ]);

    const [students, setStudent] = React.useState([
        { name: 'std1', first: 20, mids: 30, finals: 40 },
        { name: 'std1', first: 20, mids: 30, finals: 40 },
        { name: 'std1', first: 20, mids: 30, finals: 40 },
        { name: 'std1', first: 20, mids: 30, finals: 40 },
    ]);

    handleMidMarks = (value, index) => {
        const newStudent = [...students];
        const numericValue = parseInt(value, 10);
        newStudent[index].mids = isNaN(numericValue) ? '' : numericValue;
        setStudent(newStudent);
    }

    handleFinalMarks = (value, index) => {
        const newStudent = [...students];
        const numericValue = parseInt(value, 10);
        newStudent[index].finals = isNaN(numericValue) ? '' : numericValue;
        setStudent(newStudent);
    }

    handleFirstMarks = (value, index) => {
        const newStudent = [...students];
        const numericValue = parseInt(value, 10);
        newStudent[index].first = isNaN(numericValue) ? '' : numericValue;
        setStudent(newStudent);
    }

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Student Marks</Text>
            <View style={styles.topBar}>
                {(edit) ? (
                    <Icon name="check" size={20} style={styles.editIcon} onPress={() => setEdit(false)} />
                ) : (
                    <Icon name="pencil" size={20} style={styles.editIcon} onPress={() => setEdit(true)} />
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
                        <Text style={styles.tableTitle}>Name</Text>
                        <Text style={styles.tableTitle}>Marks</Text>
                    </DataTable.Header>

                    <ScrollView style={styles.listBackground}>
                        {students.map((element, index) => {
                            // Define the TextInput component based on the condition
                            let inputComponent;

                            if (value === 'mids') {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.mids)}
                                        editable={edit}
                                        onChangeText={(text) => handleMidMarks(text, index)}
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            } else if (value === 'finals') {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.finals)}
                                        editable={edit}
                                        onChangeText={(text) => handleFinalMarks(text, index)}
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            } else {
                                inputComponent = (
                                    <TextInput
                                        value={String(element.first)}
                                        editable={edit}
                                        onChangeText={(text) => handleFirstMarks(text, index)}
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric"
                                        style={styles.TextInput}
                                    />
                                );
                            }

                            return (
                                <DataTable.Row key={index} style={styles.row}>
                                    <DataTable.Cell>{element.name}</DataTable.Cell>
                                    <DataTable.Cell>{inputComponent}</DataTable.Cell>
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
        backgroundColor: 'lavender',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderRadius: 20,
        marginTop: 65
    },
    tableTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        marginHorizontal: 13,
        marginTop: 13
    },
    row: {
        height: 40,
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
        flexDirection: 'row',
        margin: 10,
        marginLeft: 240,
        // elevation: 10
    },
    editIcon: {
        paddingTop: 13,
        marginRight: 10
    },
    TextInput: {
        marginLeft: 80,
        backgroundColor: 'lavender',
    },
    dropdown: {
        marginLeft: 20,
        width: 120,
        backgroundColor: '#F4F4F4',
        borderColor: '#8349EA'
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