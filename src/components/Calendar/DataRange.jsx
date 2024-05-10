import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {dateFormater, dayMonth} from '../../utils/dataFormater';
import {useDispatch} from 'react-redux';
import * as dataRange from "../../store/HotelItem";
import {checkInDateHandler, handlerDataRange, checkOutDateHandler} from '../../store/dataBooking';

export const DataRange = ({style, handle, page}) => {
    const dispatch = useDispatch();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [message, setMessage] = useState('');
    const [nightsCount, setNightsCount] = useState(0);

    // Остальной код остается без изменений, только стили применяются из предоставленного объекта styles


    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getMonthsList = () => {
        const allMonths = [
            {name: "Январь", days: 31},
            {name: "Февраль", days: 28},
            {name: "Март", days: 31},
            {name: "Апрель", days: 30},
            {name: "Май", days: 31},
            {name: "Июнь", days: 30},
            {name: "Июль", days: 31},
            {name: "Август", days: 31},
            {name: "Сентябрь", days: 30},
            {name: "Октябрь", days: 31},
            {name: "Ноябрь", days: 30},
            {name: "Декабрь", days: 31},
        ];
        const monthsList = [];
        const currentYear = new Date().getFullYear();
        const currentMonthIndex = new Date().getMonth(); // Получить текущий номер месяца (0-11)

        for (let year = currentYear; year <= currentYear + 5; year++) {
            for (let index = 0; index < allMonths.length; index++) {
                // Для первого года добавить только месяцы, начиная с текущего месяца
                if (year === currentYear && index < currentMonthIndex) {
                    continue;
                }

                const month = allMonths[index];
                // Если индекс месяца равен 1 (Февраль) и данный год високосный, то количество дней будет 29
                const daysInMonth = index === 1 && isLeapYear(year) ? 29 : month.days;
                monthsList.push({
                    year: year,
                    name: month.name,
                    days: daysInMonth,
                    index: index,
                });
            }
        }
        return monthsList;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const calculateNights = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const timeDifference = Math.abs(endDate - startDate);
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };


    const handleDateSelect = (day) => {
        if (isGrayedOut(day)) {
            return;
        }

        if (!selectedStartDate) {
            setSelectedStartDate(day);

            console.log("Выбор даты заезда ")
            setIsSelectingEndDate(true);
        } else if (!selectedEndDate) {
            if (day < selectedStartDate) {
                setSelectedStartDate(day);
            } else {
                const maxEndDate = new Date(selectedStartDate);
                maxEndDate.setDate(selectedStartDate.getDate() + 30);
                const endDate = day > maxEndDate ? maxEndDate : day;
                setSelectedEndDate(endDate);
                //Закрыть модальное окно
                handle()
                saveDataRange(selectedStartDate, endDate)
                console.log("Выбор даты отъезда")
                setIsSelectingEndDate(false);
                // setNightsCount(nights);
            }
        } else {
            setSelectedStartDate(day);
            setSelectedEndDate(null);
            setIsSelectingEndDate(true);
        }
    };

    const dateText = selectedStartDate
        ? `Check-In: ${selectedStartDate}`
        : "Check-In: -";
    const endDateText = selectedEndDate
        ? `Check-Out: ${selectedEndDate}`
        : "Check-Out: -";
    const nightsText = nightsCount ? `${nightsCount} Nights` : "";


    const saveDataRange = (startDate, endDate) => {
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

            handle("DataRange", {checkIn: start, checkOut: end, dataRange: dataRange})
        }
        if (page === "hotel") {
            const nights = calculateNights(startDate, endDate);
            const end = dateFormater(endDate)
            dispatch(dataRange.checkOutHandler(end))
            const start = dateFormater(startDate)
            dispatch(dataRange.checkInHandler(start))
            //Сохранение даты заезда и отъезда, а также количество ночей
            dispatch(dataRange.handlerDataRange(
                {
                    checkIn: startDate.toLocaleDateString().substr(0, 2),
                    checkOut: endDate.toLocaleDateString().substr(0, 2),
                    month:
                        startDate.toLocaleDateString().substr(3, 2) === endDate.toLocaleDateString().substr(3, 2) ?
                            dayMonth(startDate.toLocaleDateString()) :
                            `(${dayMonth(startDate.toLocaleDateString())} - ${dayMonth(endDate.toLocaleDateString())})`,
                    countNight: nights
                }))
        }
        if (page === "booking") {
            const nights = calculateNights(startDate, endDate);
            const end = dateFormater(endDate)
            dispatch(checkOutDateHandler(end))
            const start = dateFormater(startDate)
            dispatch(checkInDateHandler(start))
            //Сохранение даты заезда и отъезда, а также количество ночей
            dispatch(handlerDataRange(
                {
                    checkIn: startDate.toLocaleDateString().substr(0, 2),
                    checkOut: endDate.toLocaleDateString().substr(0, 2),
                    month:
                        startDate.toLocaleDateString().substr(3, 2) === endDate.toLocaleDateString().substr(3, 2) ?
                            dayMonth(startDate.toLocaleDateString()) :
                            `(${dayMonth(startDate.toLocaleDateString())} - ${dayMonth(endDate.toLocaleDateString())})`,
                    countNight: nights
                }))
        }
    }


    const isFirstSelectedDay = (day) => {
        if (!selectedStartDate) return false;
        return day.getTime() === selectedStartDate.getTime();
    };

    const isLastSelectedDay = (day) => {
        if (!selectedEndDate) return false;
        return day.getTime() === selectedEndDate.getTime();
    };

    const isSelectedDay = (day) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        return day > selectedStartDate && day < selectedEndDate;
    };

    const isGrayedOut = (day) => {
        if (isBeforeToday(day)) {
            return true;
        }

        if (selectedStartDate) {
            const daysAfterStartDate = Math.floor((day.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
            return daysAfterStartDate > 30;
        }

        return false;
    };


    const isBeforeToday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isTemporarySelectedDay = (day) => {
        if (!selectedStartDate || !hoveredDate || !isSelectingEndDate || isBeforeToday(day)) return false;
        if (isGrayedOut(day)) return false;
        return day.getTime() > selectedStartDate.getTime() && day.getTime() < hoveredDate.getTime();
    };

    const handleMouseEnter = (day) => {
        if (isSelectingEndDate && !isBeforeToday(day)) {
            setHoveredDate(day);

            if (isGrayedOut(day)) {
                setMessage("* Нельзя выбрать даты с периодом больше 30 дней");
            } else if (day.getTime() === new Date().setHours(0, 0, 0, 0) && selectedEndDate !== null) {
                setMessage("* Нельзя выбрать дату раньше заезда");
            } else {
                setMessage("");
            }
        } else if (isBeforeToday(day)) {
            setMessage("* Нельзя выбрать даты из прошлого");
        }
    };

    const renderMonthDays = (month) => {
        const days = [];
        const firstDayOfMonth = new Date(month.year, month.index, 1);
        for (let i = 1; i <= (firstDayOfMonth.getDay() + 6) % 7; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayEmpty}></View>);
        }
        for (let i = 1; i <= month.days; i++) {
            const day = new Date(month.year, month.index, i);
            days.push(
                <TouchableOpacity
                    key={day.toString()}
                    style={[
                        styles.day,
                        isFirstSelectedDay(day) && styles.selectedStart,
                        isLastSelectedDay(day) && styles.selectedEnd,
                        isBeforeToday(day) && styles.textGray,
                        isToday(day) && styles.today,
                        isSelectedDay(day) && styles.betweenSelected,
                        isTemporarySelectedDay(day) && styles.betweenHovered,
                        isGrayedOut(day) && styles.grayedOut,
                        isGrayedOut(day) && styles.noPointer,
                        styles.nonEmpty
                    ]}
                    onPress={() => handleDateSelect(day)}
                    onMouseEnter={() => handleMouseEnter(day)}
                    onMouseLeave={() => {
                        isSelectingEndDate && !isBeforeToday(day) && setHoveredDate(null);
                        setMessage("");
                    }}
                >
                    <Text>{i}</Text>
                </TouchableOpacity>
            );
        }
        return days;
    };
    const monthsList = getMonthsList();

    return (
        <View style={style}>
            <View style={styles.calendar}>
                <View style={styles.calendarHeader}>
                    <View style={styles.weekdays}>
                        <Text style={styles.weekdaysText}>Пн</Text>
                        <Text style={styles.weekdaysText}>Вт</Text>
                        <Text style={styles.weekdaysText}>Ср</Text>
                        <Text style={styles.weekdaysText}>Чт</Text>
                        <Text style={styles.weekdaysText}>Пт</Text>
                        <Text style={styles.weekdaysText}>Сб</Text>
                        <Text style={styles.weekdaysText}>Вс</Text>
                    </View>
                </View>
                <View style={styles.calendarBody}>
                    <ScrollView style={styles.months}>
                        {monthsList.map((month, index) => (
                            <View key={index} style={styles.monthContainer}>
                                <View style={styles.monthLabel}>
                                    <Text style={styles.monthLabel}>{month.name} {month.year}</Text>
                                </View>
                                <View style={styles.monthGrid}>
                                    {renderMonthDays(month)}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{padding: 5, height: 14}}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    selectCustom: {
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingLeft: 10,
    },
    calendar: {
        flexDirection: 'column',
        width: '100%',
    },
    day: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: 'pointer',
        color: '#333',
    },
    weekend: {
        color: '#999',
    },
    selected: {
        backgroundColor: '#ff9a00',
    },
    dayEmpty: {
        cursor: 'default',
    },
    nonEmpty: {
        backgroundColor: '#cccccc',
    },
    selectedNonEmpty: {
        backgroundColor: '#ffb94e',
    },
    todayNonEmpty: {
        backgroundColor: '#ff9a00',
        color: '#fff',
    },
    today: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    grayedOut: {
        color: '#d0d0d0',
    },
    textGray: {
        color: '#d0d0d0',
    },
    betweenSelected: {
        backgroundColor: '#f4f4f4',
        color: '#000',
    },
    selectedStart: {
        backgroundColor: '#ff9a00',
        color: '#fff',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    selectedEnd: {
        backgroundColor: '#ff9a00',
        color: '#fff',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    betweenHovered: {
        backgroundColor: '#f4f4f4',
    },
    noPointer: {
        cursor: 'default',
    },
    message: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 10,
        color: 'red',
        marginBottom: 10,
    },
    calendarHeader: {
        padding: 0,
        width: '100%',


    },
    weekdays: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: '#fff',
    },
    weekdaysText: {

        textAlign: 'center',
        color: '#808080',
    },
    calendarBody: {
        padding: 4,
    },
    monthContainer: {
        borderRadius: 4,
        backgroundColor: '#fff',
        overflow: "hidden",
        marginBottom: 20
    },
    monthLabel: {
        padding: 6,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#ff9800',
    },
    monthGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },
    months: {
        height: 140 * 3,
        width: "100%",
        paddingRight: 10,
    }
});