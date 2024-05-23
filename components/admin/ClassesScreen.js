import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

 import Card from "../layouts/Card";


const ClassesScreen = () => {


    return(
        <ScrollView>
            <Card name = "Class 8" assigned = {true} cardType= "class"></Card>
            <Card name = "Class 8" assigned = {true} cardType= "class"></Card>
            <Card name = "Class 8" assigned = {false} cardType= "class"></Card>
        </ScrollView>
    );
}

export default ClassesScreen