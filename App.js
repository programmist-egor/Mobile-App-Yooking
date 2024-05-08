import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {Support} from "./src/screen/Support.jsx"
import {Profile} from "./src/screen/Profile.jsx";
import {Favorite} from "./src/screen/Favorite.jsx";
import {Search} from "./src/screen/Search.jsx";
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator
                initialRouteName={"Поиск"}
            >
                <Stack.Screen name="Поиск" component={Search} options={{ title: 'Поиск'}}/>
                <Stack.Screen name="Избранное" component={Favorite} options={{ title: 'Избранное'}}/>
                <Stack.Screen name="Поддержка" component={Support} options={{ title: 'Поддержка'}}/>
                <Stack.Screen name="Профиль" component={Profile} options={{ title: 'Профиль'}}/>
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar/>
            <MyStack/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
