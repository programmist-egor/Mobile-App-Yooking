import {StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback} from "react-native";
import {stylesText} from "../../styles/stylesText";
import {stylesFlex} from "../../styles/stylesFlex";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    cityOrHotelHandler,
    handlerDataRange,
    showCalendarHandler,
    showGuestHandler,
    showListSearchHandler
} from "../../store/Search";
import {BLACK, GREY, RED, WHITE} from "../../theme/colors";
import {ListSearch} from "../ListSearch/ListSearch.jsx";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import ObjectService from "../../services/object.service";
import {stylesMargin} from "../../styles/stylesMargin";
import {wordDeclensionNight} from "../../utils/word-declensions";
import DateRangeModal from "../DateRangeModal/DateRangeModal";
import axios from "axios";


export const SearchPanelMain = ({navigation}) => {
    const dispatch = useDispatch()
    const requestParameters = useSelector(state => state.search.cityOrHotel)
    const [objectList, setObjectList] = useState([])
    const [filterData, setFilterData] = useState([])
    const [searchCity, setSearchCity] = useState(requestParameters.city.city || "")
    const [isVisible, setIsVisible] = useState(false)

    const [checkOld, setCheckOld] = useState(false)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const showListSearch = useSelector(state => state.search.showListSearch)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const [isWriteCity, setIsWriteCity] = useState(false)


    //Загрузка объектов
    const getObjectList = () => {
        ObjectService.getAllObject()
            .then(data => {
                const parsedData = parseJSONPropertiesInArray(data);
                setObjectList(parsedData);

            })
            .catch(error => {
                console.log(error);
            })

    }


    const fetchData = async () => {
        fetch('http://localhost:5005/obj')
            .then((response) => response.json())
            .then((json) => {
                console.log("json",json);
            })
            .catch(error => {
                console.log(error)
            })
    };

    useEffect(() => {
        if (objectList.length === 0) {
            getObjectList()
        }
        fetchData()
    }, []);
    console.log("objectList",objectList);



    const handleClickOutsideGuestHotel = () => {
        setGuest(false);
        dispatch(showGuestHandler(false));
        handlerOpenGuest();
    };
    const handlerDate = () => {
        setIsVisible(true)
    }
    const handleClickOutsideDataRange = () => {
        setIsVisible(false)
    };

    const handlerOpenGuest = () => {
        setGuest(!openGuest)
        dispatch(showGuestHandler(!showGuest))
    }

    const checkingHandler = () => {
        if (requestParameters.guest.child.map(child => child.old === "Возраст")[0]) {
            setCheckOld(true)
        } else {
            setGuest(!openGuest)
            dispatch(showGuestHandler(!showGuest))
            setCheckOld(false)
        }
    }

    const handlerText = (e) => {
        console.log("TEXT", e);
        if (e !== "") {
            dispatch(showListSearchHandler(true));
            const searchText = e.toLocaleLowerCase();
            setSearchCity(e);
            if (searchText.length !== 0) {
                // Фильтруем userData по имени, фамилии, телефону или email
                const filteredCity = objectList.filter(item => {
                    const cityMatch = item.city && item.city.toLocaleLowerCase().includes(searchText);
                    return cityMatch;
                });
                // Создаем множество уникальных городов
                const uniqueCities = new Set(filteredCity.map(item => item.city));
                // Фильтруем уникальные города и сохраняем целые объекты
                const uniqueCitiesArray = Array.from(uniqueCities).map(city => {
                    return filteredCity.find(item => item.city === city);
                });
                setFilterData(uniqueCitiesArray);
            } else {
                // Если строка поиска пустая, возвращаем пустой массив
                setFilterData([]);
                dispatch(showListSearchHandler(false));
            }
        } else {
            setSearchCity("");
            dispatch(showListSearchHandler(false));
        }
    }

    const handleClickOutsideListSearch = (city) => {
        dispatch(showListSearchHandler(false));
        setSearchCity(city)
    };

    const dataSearchHandler = (type, value) => {
        if (type === "city") {
            dispatch(cityOrHotelHandler(value))
            handleClickOutsideListSearch(value.city)
        }
        if (type === "DataRange") {
            handleClickOutsideDataRange()
        }
    }


    return (
        <View style={[stylesFlex.columnFSC, stylesMargin.ML_MR_15]}>
            <View style={styles.inputSearch}>
                <TextInput
                    style={[styles.textInput]}
                    inputMode="text"
                    id="search__input"
                    placeholder={"Введите название города"}
                    value={searchCity}
                    onChangeText={text => handlerText(text)}
                    required={true}
                />
                <ListSearch
                    style={showListSearch ? styles.modalListSearch : styles.modalNone}
                    city={filterData}
                    handle={(type, value) => dataSearchHandler(type, value)}
                />
            </View>
            <TouchableOpacity style={[styles.inputSearch, stylesMargin.MT_10, {zIndex: 10}]} onPress={() => handlerDate()}>
                <Text style={[styles.textDateRange, stylesFlex.rowCFS]}>
                    {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                    <Text
                        style={styles.textCountNight}> - {requestParameters.dataRange.countNight} {wordDeclensionNight(requestParameters.dataRange.countNight)}</Text>
                </Text>
            </TouchableOpacity>
            <DateRangeModal isVisible={isVisible} onClose={() => setIsVisible(false)}
                            dataSearchHandler={(type) => dataSearchHandler(type)} page={"search"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        paddingLeft: 10,
        color: WHITE,
        fontSize: 14,
        border: "none",
        outline: "none",
        backgroundColor: false,
        width: "100%",
    },
    modalListSearch: {
        position: "absolute",
        top: 10,
        left: 0,
        height: 300,
        width: "100%",
        zIndex: 10000,
    },
    modalNone: {
        display: "none"
    },
    inputSearch: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderBottomColor: GREY,
        borderWidth: 1,
        zIndex: 1000,
    },
    textDateRange: {
        color: WHITE,
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        paddingLeft: 10,
        zIndex: 1000,
    },
    textCountNight: {
        color: GREY,
        fontSize: 14,
    }
})

