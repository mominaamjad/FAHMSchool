/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import RecordsScreen from './components/admin/RecordsScreen';
import MyStack from './components/MainScreen';
import App from './App';

AppRegistry.registerComponent(appName, () => MyStack);
