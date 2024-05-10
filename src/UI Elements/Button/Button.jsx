import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export const Button = (
    {
        name, handler, style, styleText, padding, marginLeft, marginTop, color, height
    }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: color,
                marginLeft: marginLeft,
                marginTop: marginTop,
                height: height,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={handler}
        >
            <Text
                style={{
                    paddingLeft: padding,
                    paddingRight: padding,
                    color: 'white',
                    fontSize: 16
                }}
            >{name}</Text>
        </TouchableOpacity>
    )
}