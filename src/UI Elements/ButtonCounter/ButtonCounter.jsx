import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BLACK, GREY_WHITE } from '../../theme/colors';

export const ButtonCounter = ({ count, style, handleDel, handleAdd }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={handleDel} style={styles.buttonContainer}>
                <Ionicons name="remove-circle-outline" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>{count}</Text>
            <TouchableOpacity onPress={handleAdd} style={styles.buttonContainer}>
                <Ionicons name="add-circle-outline" size={16} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: GREY_WHITE,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BLACK,
    },
};