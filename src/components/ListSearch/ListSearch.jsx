import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {stylesText} from "../../styles/stylesText";
import {stylesFlex} from "../../styles/stylesFlex";

export const ListSearch = ({style, handle, city}) => {
    return (
        <View style={style}>
            <View style={styles.modalContentListSearch}>
                <View style={styles.modalBody}>
                    <View style={[stylesFlex.columnFS, {marginBottom: 10}]}>
                        {city.map(item => (
                            <TouchableOpacity
                                key={item.hotelId}
                                onPress={() => handle("city", {city: item.city, hotelId: item.hotelId, location: item.location})}
                                style={styles.listSearch}
                            >
                                <Text style={stylesText.textContentBlack14}>{item.city}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContentListSearch: {
        position: 'relative',
        padding: 10,
        backgroundColor: '#ffffff',
        height: 270,
        marginTop: 30,
        borderRadius: 10,
        shadowColor: 'rgba(51, 51, 51, 0.42)',
        zIndex: 10000,
        flex: 1.2,
    },
    modalBody: {
        padding: 0.5,
    },
    listSearch: {
        paddingBottom: 10,
        paddingTop: 10,
        cursor: 'pointer',
        paddingLeft: 10,
    },
});