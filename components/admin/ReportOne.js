/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {DataTable} from 'react-native-paper';
import {fetchStudents} from '../../api/admin';
const ReportOne = () => {

  const [students, setStudents] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const student = await fetchStudents();
        const groupedData = student.reduce((acc, std) => {
          const {dob, gender} = std;
          const age = calculateAge(dob);
          if (!acc[age]) {
            acc[age] = {total: 0, boys: 0, girls: 0};
          }
          acc[age].total++;
          if (gender === 'male') {
            acc[age].boys++;
          } else if (gender === 'female') {
            acc[age].girls++;
          }
          return acc;
          
        }, {});
        console.log(groupedData);
        
        setIsLoading(false);
        setAgeGroups(Object.entries(groupedData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoading(true);
        const studentData = await fetchStudents();
        setStudents(studentData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };

    getStudents();
  }, []);

  const calculateAge = dob => {
    //getting data in format dd-mm-yyyy

    const [day, month, year] = (dob===null||dob===undefined||dob==="")?"01-01-2000".split('-').map(Number):dob.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let age = currentYear - year;
    if (
      currentMonth < month ||
      (currentMonth === month && currentDate.getDate() < day)
    ) {
      age--;
    }
    console.log(age);
    return age;
  };
  return (
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
              <Text style={styles.tableTitle}>Name</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Father's Name</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>D.O.B</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Age</Text>
            </DataTable.Title>
          </DataTable.Header>

          {students.map((student, index) => (
            <DataTable.Row style={styles.row} key={index}>
              <DataTable.Cell>
                <Text style={styles.regTitle}>{student.regNo}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{student.studentName}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{student.fatherName}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{student.dob}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{calculateAge(student.dob)}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>)  }

      {isLoading ? <ActivityIndicator size="large" color='#9C70EA' style={{marginVertical: 80}}/> :
       (<ScrollView>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.head}>
            <DataTable.Title>
              <Text style={styles.tableTitle}> Age</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Number</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Boys</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Girls</Text>
            </DataTable.Title>
          </DataTable.Header>
          {ageGroups.map(([age, {total, boys, girls}]) => (
            <DataTable.Row style={[styles.row, {width: 350}]} key={age}>
              <DataTable.Cell>
                <Text style={styles.regTitle}>{age}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{total}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{boys}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{girls}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>) }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    row: {
        height: 40,
        backgroundColor: 'lavender',
        borderRadius : 10,
        width: 570,
        alignSelf: 'center',
        marginTop: 2,
        justifyContent: 'center'
    },
    head:{
        backgroundColor: "#9C70EA",
        borderRadius : 20
    },

    table:{
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

    regTitle:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
    },

    data:{
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
  },
});

export default ReportOne;
