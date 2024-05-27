import {View, ScrollView, Text, Image, StyleSheet} from 'react-native'



const Subject = ({subject}) => {
    return(
        <View style = {styles.mainCard}>

            <View>
                <Text style={styles.title}>{subject}</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainCard: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 18,
        marginLeft: 8,
        marginRight: 8,
        marginVertical: 5,
        elevation: 4

    },


    title:{
        color: "#000000",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: 'Poppins-SemiBold',
    }


})

export default Subject