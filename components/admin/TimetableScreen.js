import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity

} from "react-native"


import DropDownPicker from 'react-native-dropdown-picker';

const TimetableScreen = () => {

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

    // const [classes, setClass] = useState([
    //     // example data for now
    //         { class: 'Class1', table: '../assets/timetable.jpeg'},
    //         { class: 'Class2', table: '../assets/timetable.jpeg'},
    //         { class: 'Class3', table: '../assets/timetable.jpeg'},
    //     ])

    // handleFilteredList = () => {

    //     setClass(() => classes.filter((element) => element.class.toLowerCase().includes(value)))

    //   }


    return (
        <View >
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

            <View>
                <View>
                    <Image source={require('../assets/timetable.jpeg')} style={styles.pic} />
                </View>

                <View>
                    <TouchableOpacity style={styles.buttonUpload}>
                        <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    main: {
        color: "#000000",
        fontSize: 24,
        fontFamily: "Poppins-Light"
    },

    pic: {
        width: 340,
        height: 220,
        alignSelf: "center",
        borderRadius: 10,
        elevation: 7,
        marginTop: 100
    },
    uploadText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',

    },

    buttonUpload: {
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 10,
        elevation: 2,
        backgroundColor: '#8349EA',
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 60
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
}

)

export default TimetableScreen