import { useState } from "react";
import { ScrollView,
    View, 
    Text,
    StyleSheet,
    TouchableOpacity

 } from "react-native"

 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 import ReportOne from "./ReportOne";
 import ReportTwo from "./ReportTwo";


const AdminDashboard = () => {

    const [selectedTab, setSelected] = useState(0)


    return(
        <ScrollView>

            <View style = {styles.switchBox} >

                
                <TouchableOpacity style={selectedTab === 0 ? styles.switchOn : styles.switchOff} 
                    onPress={() => {
                    setSelected(0)
                    }}>

                    <Text style={selectedTab === 0 ? styles.currentText : styles.otherText} > 
                        Report 1
                    </Text>

                </TouchableOpacity>

                

                <TouchableOpacity style={selectedTab === 1 ? styles.switchOn : styles.switchOff} 
                    onPress={() =>{
                    setSelected(1)
                    }}>

                    <Text style={selectedTab === 1 ? styles.currentText : styles.otherText}> 
                        Report 2
                    </Text>

                </TouchableOpacity >

            </View>

            <View>
                <TouchableOpacity
                    style={styles.buttonDownload}
                    onPress={() => { setAddModalVisible(true); }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="download" size={24} color='white' />
                        <Text style={styles.downloadText}> Download Report</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
                 {selectedTab == 0? <ReportOne></ReportOne> : <ReportTwo></ReportTwo> }
            </ScrollView>

            

        

        </ScrollView>
        
    );
}

const styles = StyleSheet.create({

    switchBox:{
        width: 250,
        height: 50,
        display:'flex',
        flexDirection:'row',

        borderWidth: 0.3,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20
    },

    switchOn:{
        width: 125,
        height: 50,
        backgroundColor: '#8349EA',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'


    },

    switchOff:{
        width: 125,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    currentText: {
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#FFFFFF'

    },

    otherText: {
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000000'

    },

    buttonDownload: {
        width: 150,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 10,
        backgroundColor: '#8349EA',
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



})

export default AdminDashboard