import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon24MinusOutline, Icon24Add } from '@vkontakte/icons';
import { BLACK, GREY_WHITE } from '../../theme/colors';

export const ButtonCounter = ({ count, style, handleDel, handleAdd }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={handleDel} style={styles.buttonContainer}>
                <Icon24MinusOutline width={16} height={16} fill={BLACK} />
            </TouchableOpacity>
            <Text style={styles.text}>{count}</Text>
            <TouchableOpacity onPress={handleAdd} style={styles.buttonContainer}>
                <Icon24Add width={16} height={16} fill={BLACK} />
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