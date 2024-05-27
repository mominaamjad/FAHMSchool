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

    return(
    <ScrollView>

        <TouchableOpacity>
            <Subject name="Mobile App Dev"></Subject>
        </TouchableOpacity>
        <TouchableOpacity>
            <Subject name="Mobile App Dev"></Subject>
        </TouchableOpacity>
        <TouchableOpacity>
            <Subject name="Mobile App Dev"></Subject>
        </TouchableOpacity>
            
      
    </ScrollView>

    )
}

export default SubjectsScreen