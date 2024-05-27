import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Alert,
    TextInput
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from "../layouts/Card";

const FeeScreen = () => {

    // for pop-up 
    const [modalVisible, setModalVisible] = useState(false);

    // students list to be displayed
    const [students, setStudents] = useState([
        {
            class: 'class1', regNo: 'fa21-bcs-011', name: 'amna sohaib', amountDue: 1234,
            amountPaid: 3245, payableAmount: 356, paymentDate: '1/1/2024', lateFees: true, remarks: 'smth'
        },
        {
            class: 'class2', regNo: 'fa21-bcs-011', name: 'amna sohaib', amountDue: 3456,
            amountPaid: 3245, payableAmount: 356, paymentDate: '1/12/2023', lateFees: true, remarks: 'smth'
        },
        {
            class: 'class3', regNo: 'fa21-bcs-011', name: 'amna sohaib', amountDue: 0,
            amountPaid: 3245, payableAmount: 356, paymentDate: '1/11/2023', lateFees: false, remarks: 'smth'
        },
        {
            class: 'class4', regNo: 'fa21-bcs-011', name: 'amna sohaib', amountDue: 0,
            amountPaid: 3245, payableAmount: 356, paymentDate: '1/10/2023', lateFees: false, remarks: 'smth'
        },
    ]);


    // to set index of class array for assigning true or false
    const [index, setIndex] = useState(null);

    const [list, setList] = useState(students);

    const [search, setSearch] = useState("")


    const searchItem = (text) => {

        if (text === "") {
            setList(students)
        }
        else {
            setList(() => students.filter((element) => element.name.toLowerCase().includes(text.toLowerCase())))
        }
        setSearch(text)

    }

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

            {/* fee is displayed month-wise for each student and details in pop-up/*}

            {/* change the function to find fee instead of students  */}

            <View style={styles.searchBar}>
                <TextInput style={styles.search}
                    label="Search" placeholder='Search...' placeholderTextColor="#000000"
                    onChangeText={(text) => { searchItem(text) }}
                    value={search}
                    onBlur={() => { setSearch(""); setList(students); }}
                />
                <Icon name="magnify" size={30} style={styles.searchIcon} />

            </View>


            <ScrollView style={{ zIndex: -1 }}>
                {list.map((element, index) =>
                    <TouchableOpacity key={element.paymentDate} onPress={() => { setModalVisible(true); setIndex(index) }}>
                        <Card name={element.paymentDate} regNo={element.amountDue} paid={!element.lateFees} cardType="fee"></Card>
                    </TouchableOpacity>
                )}
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
                                <Text style={styles.modalText}>{students[index].name}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Amount Due </Text>
                                <Text style={styles.modalText}>{students[index].amountDue}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Amount Paid </Text>
                                <Text style={styles.modalText}>{students[index].amountPaid}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Payable Amount </Text>
                                <Text style={styles.modalText}>{students[index].payableAmount}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Payment Date </Text>
                                <Text style={styles.modalText}>{students[index].paymentDate}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Late Fees </Text>
                                <Text style={styles.modalText}>{(students[index].lateFees ? "yes" : "no")}</Text>
                            </View>

                            <View style={styles.rowStyle}>
                                <Text style={styles.modalText}>Remarks </Text>
                                <Text style={styles.modalText}>{students[index].remarks}</Text>
                            </View>

                            <View style={styles.btnRow}>

                                <TouchableOpacity
                                    style={styles.buttonSubmit}
                                    onPress={() => { setModalVisible(!modalVisible); }}>
                                    <Text style={styles.submitText}>Done</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>)}

        </View>

    );
}

styles = StyleSheet.create({
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
        width: 200,
        height: 40,
        borderRadius: 30

    },
    search: {
        // height: 30,
        width: 160,
        color: "#000000",
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Poppins-Regular'

    },

    searchIcon: {
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

    TextInput: {
        height: 39,
        width: 130,
        fontSize: 14,
        color: '#333333',
        fontFamily: 'Poppins-Regular',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8349EA',
        margin: 2
    },

    btnRow: {
        flexDirection: 'row',
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

    cancelText: {
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
        marginTop: 10,
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

    dropdownText: {
        fontFamily: 'Poppins-Medium'
    }
})

export default FeeScreen