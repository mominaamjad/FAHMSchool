import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { fetchResults, fetchStudents } from '../../api/admin';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportTwo = () => {
    const [result, setResult] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const data = await fetchResults();
                setResult(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false)
        };
        fetchData();
    }, []);

    const createPDF = async () => {
        try {
            console.log("starting pdf generation")
            let PDFOptions = {
                html: htmlContent,
                fileName: 'report2',
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

    let htmlContent = `
  <html>
  <head>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h1>Result List</h1>
    <table>
      <thead>
        <tr>
          <th>Reg No</th>
          <th>Student Name</th>
          <th>Father Name</th>
        </tr>
      </thead>
      <tbody>
`;

    result.forEach(student => {
        htmlContent += `
    <tr>
      <td>${student.studentRef}</td>
      <td>${student.subjectRef}</td>
      <td>${student.result}</td>
    </tr>
  `;
    });

    htmlContent += `
      </tbody>
    </table>
  </body>
  </html>
`;

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

            <ScrollView>
                {isLoading ? <ActivityIndicator size="large" color='#9C70EA' /> :
                    (
                        <ScrollView horizontal={true}>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.head}>
                                    <DataTable.Title>
                                        <Text style={styles.tableTitle}>Reg#</Text>
                                    </DataTable.Title>
                                    <DataTable.Title>
                                        <Text style={styles.tableTitle}>Subject</Text>
                                    </DataTable.Title>
                                    <DataTable.Title>
                                        <Text style={styles.tableTitle}>Result</Text>
                                    </DataTable.Title>
                                </DataTable.Header>

                                {result.map((element, index) => (
                                    <DataTable.Row style={styles.row} key={index}>
                                        <DataTable.Cell>
                                            <Text style={styles.regTitle}>{element.studentRef}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={styles.data}>{element.subjectRef}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={styles.data}>{element.result}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>)}
            </ScrollView>
        </View >
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
        color: "#000000",
    },

    data: {
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12,


    }

})

export default ReportTwo