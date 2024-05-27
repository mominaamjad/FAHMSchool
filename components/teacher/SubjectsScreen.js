import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal

} from "react-native"

import Subject from '../layouts/Subject';
import Card from '../layouts/Card';


const SubjectsScreen = () => {
    <ScrollView>
        <Text>kuch data</Text>
        
        <Subject subject={"Mobile App Dev"}></Subject>
        <Subject subject={"Mobile App Dev"}></Subject>
        <Subject subject={"Mobile App Dev"}></Subject>
    </ScrollView>
}

export default SubjectsScreen