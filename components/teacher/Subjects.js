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


const Subjects = () =>{
    <ScrollView>
        <Subject subject={"Mobile App Dev"}></Subject>
        <Subject subject={"Mobile App Dev"}></Subject>
        <Subject subject={"Mobile App Dev"}></Subject>
    </ScrollView>
}

export default Subjects