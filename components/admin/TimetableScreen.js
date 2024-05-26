import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity

 } from "react-native"


const TimetableScreen = () => {


    return(
        <ScrollView>


            {/* put the dropdown before this  */}

            <View>
                <Image source = {require('../assets/timetable.jpeg') } style = {styles.pic}/>
            </View>

            <View>
                <TouchableOpacity style={styles.buttonUpload}>
                    <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    
    );
}

const styles = StyleSheet.create({

    main:{
        color: "#000000",
        fontSize: 24,
        fontFamily: "Poppins-Light"
    },

    pic:{ 
        width: 340,
        height: 220,
        alignSelf: "center",
        borderRadius: 10,
        elevation: 7,
        marginTop: 100
    },
    uploadText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    
    },

    buttonUpload: {
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 10,
        elevation: 2,
        backgroundColor: '#8349EA',
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 60
    },
}
   
)

export default TimetableScreen