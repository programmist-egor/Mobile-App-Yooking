import {Text, View, StyleSheet, StatusBar} from "react-native";
import {BottomTabs} from "../components/BottomTabs/BottomTabs.jsx";
import {BLACK, WHITE} from "../theme/colors";
import {HeaderMain} from "../UI Elements/HeaderMain/HeaderMain";

export const Search = ({navigation}) => {

    return (
        <View style={styles.blockList}>
            <StatusBar style="light"/>
            <View style={styles.header}>
                <HeaderMain/>
            </View>
            <View style={styles.content}>
                <Text style={{color: WHITE}}> - 100000000</Text>
            </View>
            <View style={styles.footer}>
                <BottomTabs navigation={navigation}/>
            </View>
        </View>
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