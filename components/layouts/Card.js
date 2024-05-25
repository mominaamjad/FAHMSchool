import {View, ScrollView, Text, Image, StyleSheet} from 'react-native'



const Card = ({name,regNo,assigned=false,pic,cardType}) => {
    const a = 12
    return(
        <View style = {styles.mainCard}>
            <View>
                <Text style={styles.title}>{name}</Text>
                {cardType == "student" ? <Text style= {styles.reg}>{regNo}</Text> : <></>}
            </View>
            <View style = {styles.cardLeft}>
                {cardType == "student" ? <Image source={pic}></Image> : <Text style={[styles.assignedText, {color : assigned ? "green" : "red"}]}>{assigned ? "Assigned" : "Not Assigned"}</Text>}   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainCard: {
        display: "flex",
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
        textAlignVertical: "center"
    },

    reg:{
        color: "#555555",
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
        
    },

    assignedText: {
        alignSelf: "flex-end",
        fontFamily: 'Poppins-Regular'
    }


})

export default Card