import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {stylesFlex} from "../../styles/stylesFlex";
import {stylesText} from "../../styles/stylesText";
import {Ionicons} from '@expo/vector-icons';
import {stylesMargin} from "../../styles/stylesMargin";
import {BLACK, ORANGE, WHITE} from "../../theme/colors";
import CalendarPicker from "react-native-calendar-picker";
import {dateFormater, dayMonth} from "../../utils/dataFormater";
import {handlerDataRange} from "../../store/Search";
import {useDispatch} from "react-redux";
import {calculateNights} from "../../utils/calculateNights";



const DateRangeModal = ({isVisible, onClose, dataSearchHandler, page}) => {
    const dispatch = useDispatch()
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const minDate = new Date(); // Today
    const maxDate = new Date(2028, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate : "";
    const endDate = selectedEndDate ? selectedEndDate : "";

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date)

        } else {
            setSelectedStartDate(date)
        }
    }

    const chooseDateRange = () => {
        if (page === "search") {
            const nights = calculateNights(startDate, endDate);
            const end = dateFormater(endDate)
            const start = dateFormater(startDate)
            //Сохранение даты заезда и отъезда, а также количество ночей
            const dataRange = {
                checkIn: startDate.toLocaleDateString().substr(0, 2),
                checkOut: endDate.toLocaleDateString().substr(0, 2),
                month:
                    startDate.toLocaleDateString().substr(3, 2) === endDate.toLocaleDateString().substr(3, 2) ?
                        dayMonth(startDate.toLocaleDateString()) :
                        `(${dayMonth(startDate.toLocaleDateString())} - ${dayMonth(endDate.toLocaleDateString())})`,
                countNight: nights
            }

            dispatch(handlerDataRange({checkIn: start, checkOut: end, dataRange: dataRange}))
        }

        dataSearchHandler("DataRange")
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={[stylesFlex.rowSBC, stylesMargin.MB_10]}>
                        <Text style={stylesText.textContentWhite20}>Выберите дату</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={WHITE}/>
                        </TouchableOpacity>
                    </View>

                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        weekdays={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
                        months={[
                            "Январь",
                            "Февраль",
                            "Март",
                            "Апрель",
                            "Май",
                            "Июнь",
                            "Июль",
                            "Август",
                            "Сентябрь",
                            "Октябрь",
                            "Ноябрь",
                            "Декабрь",
                        ]}
                        dayShape="circle"
                        previousTitle="Предыдущий"
                        nextTitle="Следующий"
                        scaleFactor={375}
                        textStyle={{
                            fontFamily: "Roboto",
                            color: WHITE,
                        }}
                        todayBackgroundColor={ORANGE}
                        selectedDayColor={ORANGE}
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                    />
                    <TouchableOpacity
                        onPress={chooseDateRange}
                        style={[stylesMargin.MT_MB_15, styles.buttonChoose]}
                    >
                        <Text style={[stylesText.textContentWhite16]}>Выбрать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: BLACK,

        marginLeft: 10,
        marginRight: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    months: {
        height: 350,
        width: "100%",
        padding: 5
    },
    buttonChoose: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 45,
        borderRadius: 5,
        backgroundColor: ORANGE
    }
});

export default DateRangeModal;