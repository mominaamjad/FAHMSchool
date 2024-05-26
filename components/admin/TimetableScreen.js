import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Image

 } from "react-native"


const TimetableScreen = () => {


    return(
        <ScrollView>
            <Text>kuch data</Text>
            <Image src='.\assets\pictures\timetable.jpeg' />
            
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