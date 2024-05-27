import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Image

 } from "react-native"


const StudentTimetable = () => {


    return(
       <View>
         <Image source={require('../assets/timetable.jpeg')} style={styles.pic} />
       </View>
        
    );
}

const styles = StyleSheet.create({
    pic: {
        width: 340,
        height: 220,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 7,
        marginTop: 70,
      },
})

export default StudentTimetable