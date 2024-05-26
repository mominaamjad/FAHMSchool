import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Image

 } from "react-native"


const TimetableScreen = () => {


    return(
        <ScrollView>


            {/* put the dropdown before this  */}

            <View>
                <Image source = {require('../assets/timetable.jpeg') } style = {styles.pic}/>
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
    }
}
   
)

export default TimetableScreen