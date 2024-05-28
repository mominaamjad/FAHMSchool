import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

 import {DataTable } from "react-native-paper";


const ReportOne = () => {


    return(

        <ScrollView>

            <ScrollView horizontal={true}>
                    <DataTable style = {styles.table}>
                        <DataTable.Header style={styles.head}>
                            <DataTable.Title><Text style = {styles.tableTitle}>Reg#</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Name</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Father's Name</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>D.O.B</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Age</Text></DataTable.Title>

                            
                        </DataTable.Header>

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Ehsan Awan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>26/12/2002</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                        </DataTable.Row> 

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Ehsan Awan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>26/12/2002</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                        </DataTable.Row> 

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Ehsan Awan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>26/12/2002</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                        </DataTable.Row> 
                        

                        
                    </DataTable>
            </ScrollView>

            <ScrollView>
                <DataTable style = {styles.table}>
                    <DataTable.Header style={styles.head}>
                        <DataTable.Title><Text style = {styles.tableTitle}> Age</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Number</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Boys</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Girls</Text></DataTable.Title>

                            
                    </DataTable.Header>

                    <DataTable.Row style= {[styles.row, {width: 350} ]}>
                        <DataTable.Cell> <Text style = {styles.regTitle}>10</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>30</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>12</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style= {[styles.row, {width: 350} ]}>
                        <DataTable.Cell> <Text style = {styles.regTitle}>10</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>30</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>12</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style= {[styles.row, {width: 350} ]}>
                        <DataTable.Cell> <Text style = {styles.regTitle}>10</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>30</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>12</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style= {[styles.row, {width: 350} ]}>
                        <DataTable.Cell> <Text style = {styles.regTitle}>10</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>30</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>12</Text></DataTable.Cell>
                    </DataTable.Row>
                        

                        
                    </DataTable>
                </ScrollView>


        
            </ScrollView>



    )
}


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
        backgroundColor: "#8349EA",
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
        

    }

})

export default ReportOne