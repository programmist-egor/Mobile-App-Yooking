import {Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard} from "react-native";
import {BottomTabs} from "../components/BottomTabs/BottomTabs.jsx";
import {BLACK, WHITE} from "../theme/colors";
import {HeaderMain} from "../UI Elements/HeaderMain/HeaderMain.jsx";
import {SearchPanelMain} from "../components/SearchPanelMain/SearchPanelMain.jsx";

export const Search = ({navigation}) => {
    const handleEndEditing = () => {
        Keyboard.dismiss(); // Скрывает клавиатуру
    };


    return (
        <TouchableWithoutFeedback onPress={() => handleEndEditing()}>
            <View style={styles.blockList}>
                <StatusBar style="light"/>
                <View style={styles.header}>
                    <HeaderMain/>
                </View>
                <View style={styles.content}>
                    <SearchPanelMain navigation={navigation}/>
                </View>
                <View style={styles.footer}>
                    <BottomTabs navigation={navigation}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    blockList: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: BLACK
    },
    header: {
        flex: 0,
        marginTop: 20
    },
    content: {
        flex: 1
    },
    footer: {
        flex: 0
    },
})