import React, { useState } from 'react';
import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Modal, 
    TouchableOpacity,
    Alert
 } from "react-native";

 import  DropDownPicker  from 'react-native-dropdown-picker';
 import Card from "../layouts/Card";

// import { TouchableOpacity } from "react-native-gesture-handler";




const ClassesScreen = () => {

    // for pop-up 
    const [modalVisible, setModalVisible] = useState(false);

    // for dropdown 
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Sir', value: 'sir'},
        {label: 'Ma\'am', value: 'maam'}
    ]);

    // classes list to be displayed
    const [classes, setClass] = useState([
        // example data for now

        { class: 'class 8', assigned: false},
        { class: 'class 9', assigned: false},
        { class: 'class 10', assigned: false},
    ])

    // to set index of class array for assigning true or false
    const [index, setIndex] = useState();
           
    handleAssignedClass = () => {
        if (value == null) {
            Alert.alert("pls select teacher");
            return;
        }
        setModalVisible(false);
        const newClass = [...classes];
        newClass[index].assigned = true;
        setClass(newClass);   
    }

    return(
        <View>

        <ScrollView>
            {classes.map((element, index) => 
            <TouchableOpacity onPress={()=> {setModalVisible(true); setIndex(index)}}>
                <Card name = {element.class} assigned = {element.assigned} cardType= "class"></Card>
            </TouchableOpacity>
            )}
        </ScrollView>

        <Modal
            animationType= "fade"   
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>Class Name</Text>
                    <Text style={styles.modalText}>Choose Teacher</Text>
        
                    <DropDownPicker
                        style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonSubmit]}
                        onPress={() => handleAssignedClass()}>
                        <Text style={styles.textStyle}>Submit</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        
        </View>
    );
}

styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
      buttonSubmit: {
        backgroundColor: '#7239D6',
      },
      buttonCancel: {
        backgroundColor: 'gray'
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
        marginBottom: 15,
        textAlign: 'left',
        color: 'black'
      },
      dropdown: {
        // width: 150,
        marginBottom: 10,
      }
})

export default ClassesScreen