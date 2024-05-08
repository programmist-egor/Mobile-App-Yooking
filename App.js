import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {Support} from "./src/screen/Support.jsx"
import {Profile} from "./src/screen/Profile";
import {Favorite} from "./src/screen/Favorite";
import {Search} from "./src/screen/Search";
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator
                initialRouteName={"Поиск"}
            >
                <Stack.Screen name="Поиск" component={Search}/>
                <Stack.Screen name="Избранное" component={Favorite}/>
                <Stack.Screen name="Поддержка" component={Support}/>
                <Stack.Screen name="Профиль" component={Profile}/>
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
