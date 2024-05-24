import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

import AdminDashboard from "./AdminDashboard.js"
import ClassesScreen from "./ClassesScreen.js"
import RecordsScreen from "./RecordsScreen.js"
import FeeScreen from "./FeeScreen.js"
import TimetableScreen from "./TimetableScreen.js"
import SyllabusScreen from "./SyllabusScreen.js"

const Drawer = createDrawerNavigator();

const AdminMainScreen = () => {

    
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name = "Dashboard" component={AdminDashboard}/>
                <Drawer.Screen name = "Classes" component={ClassesScreen}/>
                <Drawer.Screen name = "Records"  component={RecordsScreen}/>
                <Drawer.Screen name = "Fee"  component={FeeScreen}/>
                <Drawer.Screen name = "Syllabus"  component={SyllabusScreen}/>
                <Drawer.Screen name = "Timetable"  component={TimetableScreen}/>

            </Drawer.Navigator>

        </NavigationContainer>

        // <ScrollView>
        //     <Text>Admin Dashboard</Text>
        // </ScrollView>

    );
}

export default AdminMainScreen