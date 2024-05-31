import { ScrollView,
    View, 
    Text,
    StyleSheet,
    
 } from "react-native"

 import { TextInput, DataTable } from "react-native-paper";

 import { currMarks, getYears } from "../../api/student";
import { useEffect, useState } from "react";


const StudentDashboard = ({route}) => {
    const [marks, setMarks] = useState([]);
    // const {regNo} = route.params;

    
  useEffect(() => {
    const fetchMarks = async () => {
      try {
          const fetchedMarks = await currMarks('2024-002');
          console.log("data recieved:",fetchedMarks);
          setMarks(fetchedMarks);
      } catch (error) {
        console.error('Error fetching marks: ', error);
      }
    };
    fetchMarks();
  }, []);

  useEffect(() => {
    console.log("marks in dashboard after setting:", marks);
  }, [marks]);

    return(

        <ScrollView style={styles.container}>


                <DataTable style = {styles.table}>
                    <DataTable.Header style={styles.head}>
                        <DataTable.Title style = {{flex: 4}}> <Text style = {styles.tableTitle}> Subject </Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>First</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Mids</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Finals</Text></DataTable.Title>
                        
                    </DataTable.Header>


                    {marks.map((element, index) => (
                        <DataTable.Row style={styles.row} key={index}>
                            <DataTable.Cell style={{ flex: 4 }}>
                            <Text style={styles.subjTitle}>{element.subjectName}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell><Text style={styles.data}>{element.firstTerm}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.data}>{element.mids}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.data}>{element.finals}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))}      
                </DataTable>
            </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    head:{
        backgroundColor: "#9C70EA",
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
        fontSize: 12,
        color: 'black'
    },

    data:{
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    }
})

export default StudentDashboard