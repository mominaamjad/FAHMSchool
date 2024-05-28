import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

 import {DataTable } from "react-native-paper";

 const ReportTwo = () => {


    return(
        <ScrollView horizontal = {true} >

<DataTable style = {styles.table}>
                        <DataTable.Header style={styles.head}>
                            <DataTable.Title><Text style = {styles.tableTitle}>Reg#</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Name</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Class</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>First</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Mids</Text></DataTable.Title>
                            <DataTable.Title><Text style = {styles.tableTitle}>Finals</Text></DataTable.Title>

                            
                        </DataTable.Header>

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Class 2</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>19</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>46</Text></DataTable.Cell>
                        </DataTable.Row> 

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Class 2</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>19</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>46</Text></DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row style= {styles.row}>
                            <DataTable.Cell> <Text style = {styles.regTitle}>21-024</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Haneen Ehsan</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>Class 2</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>19</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>21</Text></DataTable.Cell>
                            <DataTable.Cell><Text style = {styles.data}>46</Text></DataTable.Cell>
                        </DataTable.Row> 

                        
                        

                        
                    </DataTable>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        height: 40,
        backgroundColor: 'lavender',
        borderRadius : 10,
        width: 600,
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

export default ReportTwo