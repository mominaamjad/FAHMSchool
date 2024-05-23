import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"


const TimetableScreen = () => {


    return(
        <ScrollView>
            <Text style = {styles.main}>Manage Timetable</Text>
        </ScrollView>
        

    );
}

const styles = StyleSheet.create({

    main:{
        color: "#000000",
        fontSize: 24,
        fontFamily: "Poppins-Light"
    }
}
   
)

export default TimetableScreen