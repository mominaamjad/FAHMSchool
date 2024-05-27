import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, DataTable } from "react-native-paper";

 

const MarksSummaryScreen = () => {

    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [timetableImg, setTimetableImg] = useState(null);
    useEffect(() => {
        if (value) {
            fetchTimetable();
        }
    }, [value]);

    return(

        <View style={styles.container}>
            <DropDownPicker
            textStyle={styles.dropdownText}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdown}
            open={open}
            value={value}
            items={[
            {label: 'Class 7', value: 'class7'},
            {label: 'Class 6', value: 'class6'},
            {label: 'Class 5', value: 'class5'},
            ]}
            setOpen={setOpen}
            setValue={setValue}
      />

                <DataTable style = {styles.table}>
                    <DataTable.Header style={styles.head}>
                        <DataTable.Title style = {{flex: 4}}> <Text style = {styles.tableTitle}> Subject </Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>First</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Mids</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Finals</Text></DataTable.Title>
                        
                    </DataTable.Header>

                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 5}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row> 
                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 5}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 5}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row>

                    
                </DataTable>
            </View>
        
    );
}

const styles = StyleSheet.create({

    dropdown: {
        width: 320,
        alignSelf: 'center',
        backgroundColor: '#F4F4F4',
        borderColor: '#8349EA',
        marginTop: 20,
      },
    
      dropdownText: {
        fontFamily: 'Poppins-Medium',
      }, 

    head:{
        backgroundColor: "#8349EA",
        borderRadius : 20
    },

    table:{
        paddingVertical: 40,
        width: 320,
        alignSelf: 'center'

    },

    tableTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        alignSelf: 'center'
    },

    row: {
        height: 40,
        backgroundColor: 'lavender',
        borderRadius : 10,
        width: 310,
        alignSelf: 'center',
        marginTop: 2
    },

    subjTitle:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12
    },

    data:{
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    }
})

export default MarksSummaryScreen