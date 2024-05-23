import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

 import Card from "../layouts/Card";


const RecordsScreen = () => {

    return(
        <ScrollView>
            <Card cardType="student" name = "Haneen Ehsan" regNo ={"FA21-BCS-024"} > </Card>

           
            
        </ScrollView>


        

    );
}

export default RecordsScreen