/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ClassesScreen from './components/admin/ClassesScreen';
import AdminMainScreen from './components/admin/AdminMainScreen';
import TeacherMainScreen from './components/teacher/TeacherMainScreen';
import MyStack from './components/MainScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MyStack);
