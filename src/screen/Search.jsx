import {Text, View, StyleSheet} from "react-native";
import {BottomTabs} from "../components/BottomTabs/BottomTabs";

export const Search = () => {
    return (
        <View style={styles.blockList}>
            <View style={styles.header}>
                <Text>header</Text>
            </View>
            <View style={styles.content}>
                <Text>content</Text>
            </View>
            <View style={styles.footer}>
                <BottomTabs/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blockList: {
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    },
    header: {
        flex: 0
    },
    content: {
        flex: 1
    },
    footer: {
        flex: 0
    },
})