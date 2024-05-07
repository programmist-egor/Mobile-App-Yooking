import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon24LikeOutline, Icon24QuestionOutline, Icon24Search, Icon24UserOutline} from "@vkontakte/icons";
import {Support} from "../../screen/Support";
import {Profile} from "../../screen/Profile";
import {Favorite} from "../../screen/Favorite";
import {Search} from "../../screen/Search";

export const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Поиск"
                component={Search}
                options={{
                    tabBarLabel: 'Поиск',
                    tabBarIcon: () => (
                        <Icon24Search />
                    ),
                }}
            />
            <Tab.Screen
                name="Избранное"
                component={Favorite}
                options={{
                    tabBarLabel: 'Избранное',
                    tabBarIcon: () => (
                        <Icon24LikeOutline />
                    ),
                }}
            />
            <Tab.Screen
                name="Поддержка"
                component={Support}
                options={{
                    tabBarLabel: 'Поддержка',
                    tabBarIcon: () => (
                        <Icon24QuestionOutline />
                    ),
                }}
            />
            <Tab.Screen
                name="Профиль"
                component={Profile}
                options={{
                    tabBarLabel: 'Профиль',
                    tabBarIcon: () => (
                        <Icon24UserOutline />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}