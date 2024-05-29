import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useNavigation } from '@react-navigation/native';

import MarksScreen from "./MarksScreen"
import TeacherLogin from "./TeacherLogin.js"
import SubjectsScreen from "./SubjectsScreen.js"

const Drawer = createDrawerNavigator();

const TeacherMainScreen = ({ route }) => {
    const { teacher } = route.params;

    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                paddingVertical: 80,
                backgroundColor: "#8349EA",
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
                backgroundColor: "#8349EA",
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
                options={{ drawerLabel: 'Manage Marks' }}
                component={props => <SubjectsScreen {...props} teacher={teacher} />}
            />
            {/* <Drawer.Screen name="Table yahan nae aaye ga" component={MarksScreen} /> */}
            {/* yahan pe iss ko logout karao  */}
            <Drawer.Screen name="Logout" component={TeacherLogin} />

        </Drawer.Navigator>
    );
}

export default TeacherMainScreen

// </NavigationContainer>

        // <ScrollView>
        //     <Text>Admin Dashboard</Text>
        // </ScrollView>