import {Text, View, StyleSheet} from "react-native";
import {WHITE} from "../../theme/colors";

export const HeaderMain = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ЖИВИ ТАМ, ГДЕ НРАВИТСЯ
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 30
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: WHITE
    }
});