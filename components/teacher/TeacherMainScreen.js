import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import TeacherLogin from "./TeacherLogin.js"
import SubjectsScreen from "./SubjectsScreen.js"
import { MainScreen } from "../MainScreen.js"

const Drawer = createDrawerNavigator();

const TeacherMainScreen = ({ route }) => {
    const { teacher } = route.params;

    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                paddingVertical: 80,
                backgroundColor: "#9C70EA",
                width: 250
            },
            drawerLabelStyle: {
                color: "#FFFFFF",
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
            },
            headerShadowVisible: false,
            headerLeftLabelVisible: true,
            headerTitle: `Welcome, ${teacher.teacherName}!`,
            headerStyle: {
                backgroundColor: "#9C70EA",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: 120,
            },
            headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 22,
            },
            drawerActiveTintColor: "#BFA8E5",
        }}>
            <Drawer.Screen name="Manage Marks"
                options={{ 
                    drawerLabel: 'Manage Marks', 
                     }}
                component={props => <SubjectsScreen {...props} teacher={teacher} />}
            />
            <Drawer.Screen name="Logout" component={MainScreen} options={{headerShown: false}}/>

        </Drawer.Navigator>
    );
}

export default TeacherMainScreen