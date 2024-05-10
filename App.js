import {NavigationContainer} from "@react-navigation/native";
import {Support} from "./src/screen/Support.jsx"
import {Profile} from "./src/screen/Profile.jsx";
import {Favorite} from "./src/screen/Favorite.jsx";
import {Search} from "./src/screen/Search.jsx";
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from "react-redux";
import store from './src/store/index';
import {Registration} from "./src/screen/Registration.jsx";
import {Login} from "./src/screen/Login.jsx";

export default function App() {
    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator
                initialRouteName={"Поиск"}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Поиск" component={Search} options={{title: 'Поиск', animationEnabled: false}}/>
                <Stack.Screen name="Избранное" component={Favorite} options={{title: 'Избранное', animationEnabled: false}}/>
                <Stack.Screen name="Поддержка" component={Support} options={{title: 'Поддержка', animationEnabled: false}}/>
                <Stack.Screen name="Профиль" component={Profile} options={{title: 'Профиль', animationEnabled: false}}/>
                <Stack.Screen name="Войти" component={Login} options={{title: 'Войти', animationEnabled: false}}/>
                <Stack.Screen name="Регистрация" component={Registration} options={{title: 'Регистрация', animationEnabled: false}}/>
            </Stack.Navigator>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        </Provider>
    );
}


