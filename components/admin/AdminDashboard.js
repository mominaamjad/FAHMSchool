import { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native"

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportOne from "./ReportOne";
import ReportTwo from "./ReportTwo";

import RNHTMLtoPDF from 'react-native-html-to-pdf';


const AdminDashboard = () => {

    const [selectedTab, setSelected] = useState(0)


    const createPDF = async () => {
        try {
            console.log("starting pdf generation")
            let PDFOptions = {
                html: '<h1>Generate PDF!</h1>',
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
        <ScrollView>

            <View style={styles.switchBox} >


                <TouchableOpacity style={selectedTab === 0 ? styles.switchOn : styles.switchOff}
                    onPress={() => {
                        setSelected(0)
                    }}>

                    <Text style={selectedTab === 0 ? styles.currentText : styles.otherText} >
                        Report 1
                    </Text>

                </TouchableOpacity>



                <TouchableOpacity style={selectedTab === 1 ? styles.switchOn : styles.switchOff}
                    onPress={() => {
                        setSelected(1)
                    }}>

                    <Text style={selectedTab === 1 ? styles.currentText : styles.otherText}>
                        Report 2
                    </Text>

                </TouchableOpacity >

            </View>


            <ScrollView>
                {selectedTab == 0 ? <ReportOne></ReportOne> : <ReportTwo></ReportTwo>}
            </ScrollView>





        </ScrollView>

    );
}

const styles = StyleSheet.create({

    switchBox: {
        width: 250,
        height: 50,
        display: 'flex',
        flexDirection: 'row',

        borderWidth: 0.3,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20
    },

    switchOn: {
        width: 125,
        height: 50,
        backgroundColor: '#9C70EA',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'


    },

    switchOff: {
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



})

export default AdminDashboard