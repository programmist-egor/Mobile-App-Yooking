import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../UI Elements/Button/Button';
import { useDispatch } from 'react-redux';
import {
    handlerAddChild,
    handlerAddGuest,
    handlerDelChild,
    handlerDelGuest,
    handlerEditOldChild
} from "../../store/Search";
import {ButtonCounter} from "../../UI Elements/ButtonCounter/ButtonCounter";
import {stylesFlex} from "../../styles/stylesFlex";
import {stylesText} from "../../styles/stylesText";

export const GuestHotel = ({ style, guest, child, handler, checkOld }) => {
    const dispatch = useDispatch();
    const old = [
        { id: 0, name: 'до года' }, { id: 1, name: '1 год' }, { id: 2, name: '2 года' },
        {id: 3, name: "3 года",}, {id: 4, name: "4 года",}, {id: 5, name: "5 лет",},
        {id: 6, name: "6 лет",}, {id: 7, name: "7 лет",}, {id: 8, name: "8 лет",},
        {id: 9, name: "9 лет",}, {id: 10, name: "10 лет",}, {id: 11, name: "11 лет",},
        {id: 12, name: "12 лет",}, {id: 13, name: "13 лет",}, {id: 14, name: "14 лет",},
        {id: 15, name: "15 лет",}, {id: 16, name: "16 лет",}, {id: 17, name: "17 лет",},
    ];

    const handlerChooseOld = (value, id) => {
        dispatch(handlerEditOldChild({ idChild: id, old: value }));
    };

    return (
        <View style={style}>
            <View style={[styles.modalContentGuest]}>
                <View style={styles.modalBody}>
                    <View style={[stylesFlex.columnFS, { marginBottom: 10, marginLeft: 5, marginRight: 10 }]}>
                        <View>
                            <View style={stylesFlex.columnFS}>
                                <View style={stylesFlex.rowSBC}>
                                    <View style={stylesFlex.columnFS}>
                                        <Text style={styles.textContentBlack14}>Взрослые</Text>
                                        <Text style={styles.textContentGrey12}>от 18 лет</Text>
                                    </View>
                                    <ButtonCounter
                                        count={guest}
                                        style={[stylesFlex.rowSBC, styles.counterGuestBtn]}
                                        handleAdd={() => dispatch(handlerAddGuest(1))}
                                        handleDel={() => dispatch(handlerDelGuest(1))}
                                    />
                                </View>
                                <View style={stylesFlex.rowSBC}>
                                    <View style={stylesFlex.columnFS}>
                                        <Text style={stylesText.textContentBlack14}>Дети</Text>
                                        <Text style={stylesText.textContentGrey12}>до 17 лет</Text>
                                    </View>
                                    <ButtonCounter
                                        handleAdd={() => dispatch(handlerAddChild(child.length + 1))}
                                        handleDel={() => dispatch(handlerDelChild(child.length - 1))}
                                        count={child.length}
                                        style={[stylesFlex.rowSBC, styles.counterGuestBtn]}
                                    />
                                </View>
                                {child.length === 0 ? null : child.map(item => (
                                    <View key={item.id} style={stylesFlex.rowSBC}>
                                        {/*<FormControl style={styles.formControl} size="small">*/}
                                        {/*    <InputLabel>Возраст</InputLabel>*/}
                                        {/*    <Select*/}
                                        {/*        value={item.old}*/}
                                        {/*        onValueChange={(value) => handlerChooseOld(value, item.id)}*/}
                                        {/*    >*/}
                                        {/*        <MenuItem value="Возраст">*/}
                                        {/*            {checkOld ? <Text style={{ color: 'red' }}>Укажите возраст</Text> : <Text>Возраст</Text>}*/}
                                        {/*        </MenuItem>*/}
                                        {/*        {old.map(oldItem => (*/}
                                        {/*            <MenuItem key={oldItem.id} value={oldItem.id}>{oldItem.name}</MenuItem>*/}
                                        {/*        ))}*/}
                                        {/*    </Select>*/}
                                        {/*</FormControl>*/}
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={stylesFlex.rowCC}>
                            <Button
                                style={styles.doneBtn}
                                name="Применить"
                                onPress={handler}
                                textStyle={stylesText.textContentWhite16}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    modalContentGuest: {
        backgroundColor: '#ffffff',
        minHeight: 160,
        maxHeight: 370,
        marginTop: 32,
        borderRadius: 10,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.42,
        zIndex: 10,
        overflow: 'scroll'
    },
    modalBody: {
        padding: 8
    },
    counterGuestBtn: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 5,
        height: 20,
        width: 80
    },
    doneBtn: {
        display: 'flex',
        marginTop: 10,
        width: 220,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        cursor: 'pointer',
        height: 35,
        borderRadius: 5
    }
});