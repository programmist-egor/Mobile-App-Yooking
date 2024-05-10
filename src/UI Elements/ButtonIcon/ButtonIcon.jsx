import React from 'react';
import {TouchableOpacity, Text} from 'react-native';


export const ButtonIcon = ({icon, name, ml, mt, navigation, handler, background, mr, mb, style, styleText, flexGrow, width, screenName}) => {


    const handlePress = () => {
        navigation.navigate(screenName);
        if (handler) {
            handler();
        }
    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: background,
                width: width,
                marginLeft: ml,
                flexGrow: flexGrow,
                marginBottom: mb,
                marginTop: mt,
                marginRight: mr,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={handlePress}
        >
            <Text style={{color: 'white', fontSize: 16}}>{icon}</Text>
            <Text style={{color: 'white', fontSize: 16}}>{name}</Text>
        </TouchableOpacity>
    );
};