import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { fetchStudents } from '../../api/admin';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportTwo = () => {


    const createPDF = async () => {
        try {
            console.log("starting pdf generation")
            let PDFOptions = {
                html: 'htmlContent',
                fileName: 'file',
                directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
            };
            let file = await RNHTMLtoPDF.convert(PDFOptions);
            if (!file.filePath) return;
            alert(file.filePath);
            console.log("ending pdf generation")
        } catch (error) {
            console.log('Failed to generate pdf', error.message);
        }
    };


    return (
        <View>
            <TouchableOpacity
                style={styles.buttonDownload}
                onPress={createPDF}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="download" size={24} color='white' />
                    <Text style={styles.downloadText}> Download Report</Text>
                </View>
            </TouchableOpacity>

            <ScrollView horizontal={true} >

                <DataTable style={styles.table}>
                    <DataTable.Header style={styles.head}>
                        <DataTable.Title><Text style={styles.tableTitle}>Reg#</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableTitle}>Name</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableTitle}>Class</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableTitle}>First</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableTitle}>Mids</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableTitle}>Finals</Text></DataTable.Title>


                    </DataTable.Header>

                    <DataTable.Row style={styles.row}>
                        <DataTable.Cell> <Text style={styles.regTitle}>21-024</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Class 2</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>19</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>21</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>46</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={styles.row}>
                        <DataTable.Cell> <Text style={styles.regTitle}>21-024</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Class 2</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>19</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>21</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>46</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={styles.row}>
                        <DataTable.Cell> <Text style={styles.regTitle}>21-024</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>Class 2</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>19</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>21</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.data}>46</Text></DataTable.Cell>
                    </DataTable.Row>





                </DataTable>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        height: 40,
        backgroundColor: 'lavender',
        borderRadius: 10,
        width: 600,
        alignSelf: 'center',
        marginTop: 2,
        justifyContent: 'center'
    },
    head: {
        backgroundColor: "#9C70EA",
        borderRadius: 20
    },

    buttonDownload: {
        width: 220,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 10,
        backgroundColor: '#9C70EA',
        marginTop: 20,
        marginRight: 12,
        marginBottom: 10,
    },
    
    downloadText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'Poppins-Medium',
      alignSelf: 'center',
      marginTop: 5
    },

    table: {
        paddingVertical: 40,
        // width: 320,
        alignSelf: 'center'

    },

    tableTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        alignSelf: 'center'
    },

    regTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
    },

    data: {
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12,


    }

})

export default ReportTwo