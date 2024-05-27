import {View, ScrollView, Text, Image, StyleSheet} from 'react-native'



const Subject = ({name}) => {
    return(
        <View style = {styles.mainCard}>

            <View>
                <Text style={styles.title}>{name}</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 24,
        width: 330,
        alignSelf: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginVertical: 5,
        elevation: 4,
        shadowColor: '#8349EA'

    },


    title:{
        color: "#000000",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: 'Poppins-SemiBold',
    }


})

export default Subject