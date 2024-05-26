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
            <Image source = {require('../assets/adminLogin.png') }/>
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