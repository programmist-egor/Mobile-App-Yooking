import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {BLACK, GREY, GREY_2, GREY_BANNER, WHITE} from "../../theme/colors";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab} from "../../store/router";


export const BottomTabs = ({navigation}) => {
    const activeTab = useSelector(state => state.router.activeTab)
    const dispatch = useDispatch()

    const tabHandler = (screen) => {
        if (screen === "Поиск") {
            navigation.navigate('Поиск')
            dispatch(setActiveTab('Поиск'))
        }
        if (screen === "Избранное") {
            navigation.navigate('Избранное')
            dispatch(setActiveTab('Избранное'))
        }
        if (screen === "Поддержка") {
            navigation.navigate('Поддержка')
            dispatch(setActiveTab('Поддержка'))
        }
        if (screen === "Профиль") {
            navigation.navigate('Профиль')
            dispatch(setActiveTab('Профиль'))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                touchSoundDisabled={false}
                accessibilityRole="button"
                onPress={() => tabHandler("Поиск")}
            >
                <View style={styles.tabButtonContainer}>
                    <MaterialIcons name="search" size={24} color={activeTab === "Поиск" ? WHITE : GREY_2}/>
                    <Text style={activeTab === "Поиск" ? styles.textActiveTab : styles.textTab}>Поиск</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                touchSoundDisabled={false}
                accessibilityRole="button"
                onPress={() => tabHandler("Избранное")}
            >
                <View style={styles.tabButtonContainer}>
                    <MaterialCommunityIcons name="cards-heart-outline" size={24}
                                            color={activeTab === "Избранное" ? WHITE : GREY_2}/>
                    <Text style={activeTab === "Избранное" ? styles.textActiveTab : styles.textTab}>Избранное</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                touchSoundDisabled={false}
                accessibilityRole="button"
                onPress={() => tabHandler("Поддержка")}
            >
                <View style={styles.tabButtonContainer}>
                    <Feather name="help-circle" size={24} color={activeTab === "Поддержка" ? WHITE : GREY_2}/>
                    <Text style={activeTab === "Поддержка" ? styles.textActiveTab : styles.textTab}>Поддержка</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                touchSoundDisabled={false}
                accessibilityRole="button"
                onPress={() => tabHandler("Профиль")}
            >
                <View style={styles.tabButtonContainer}>
                    <Feather name="user" size={24} color={activeTab === "Профиль" ? WHITE : GREY_2}/>
                    <Text style={activeTab === "Профиль" ? styles.textActiveTab : styles.textTab}>Профиль</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: BLACK,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 50,

    },
    tabButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    textActiveTab: {
        color: WHITE,
        fontSize: 12
    },
    textTab: {
        color: GREY_BANNER,
        fontSize: 12
    }
});