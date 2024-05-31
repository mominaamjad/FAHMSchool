/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {DataTable} from 'react-native-paper';

import {getMarksByYear, getYears, yearsMap} from '../../api/student';

const MarksSummaryScreen = ({route}) => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const {regNo} = route.params;
  useEffect(() => {
    const fetchYears = async () => {
      setIsLoading(true);
      // console.log(regNo)
      try {
        const fetchedYears = await getYears('2024-001');

        console.log('screen k andar waley');
        console.log(fetchedYears);

        const years = fetchedYears.map(year => ({
          label: yearsMap[year],
          value: year,
        }));

        setYears(years);

        setIsLoading(false);

        console.log('screen k andar waley years');
        console.log(years);

        setValue(years[years.length - 1].value);
      } catch (error) {
        console.error('Error fetching years: ', error);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    const fetchMarks = async () => {
      if (value) {
        try {
          console.log(value);
          // const index = years.findIndex(item => item.value === valueToFind);
          // const selectedYear = 2024 - (years.length - index)
          // console.log(selectedYear);
          const fetchedMarks = await getMarksByYear('2024-001', value);

          console.log('yeh marks screen waley');
          console.log(fetchedMarks);

          setMarks(fetchedMarks);
          // console.log(fetchedMarks);
        } catch (error) {
          console.error('Error fetching marks: ', error);
        }
      }
    };
    fetchMarks();
  }, [value]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        textStyle={styles.dropdownText}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
        open={open}
        value={value}
        // items={years.map(element, index) =>{
        //     {label: }
        // }}

        items={
          years
          // display it like it
        }
        setOpen={setOpen}
        setValue={setValue}
      />

      <DataTable style={styles.table}>
        <DataTable.Header style={styles.head}>
          <DataTable.Title style={{flex: 4}}>
            {' '}
            <Text style={styles.tableTitle}> Subject </Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.tableTitle}>First</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.tableTitle}>Mids</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.tableTitle}>Finals</Text>
          </DataTable.Title>
        </DataTable.Header>

        {isLoading ? (
          <></>
        ) : (
          marks.map((element, index) => (
            <DataTable.Row style={styles.row} key={index}>
              <DataTable.Cell style={{flex: 4}}>
                <Text style={styles.subjTitle}>{element.subjectName}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{element.firstTerm}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{element.mids}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.data}>{element.finals}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}

        {/* <DataTable.Row style= {styles.row}>
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
                    </DataTable.Row> */}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 320,
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    borderColor: '#9C70EA',
    marginTop: 20,
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },

  head: {
    backgroundColor: '#9C70EA',
    borderRadius: 20,
  },

  table: {
    paddingVertical: 40,
    width: 320,
    alignSelf: 'center',
  },

  tableTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    alignSelf: 'center',
  },

  row: {
    height: 40,
    backgroundColor: 'lavender',
    borderRadius: 10,
    width: 310,
    alignSelf: 'center',
    marginTop: 2,
  },

  subjTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: 'black',
  },

  data: {
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});

export default MarksSummaryScreen;
