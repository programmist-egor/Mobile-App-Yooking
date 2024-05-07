import {$api} from "../http"


const FavoriteService = {
    getAllFavorites: async (path,userId) => {
        try {
            console.log("userId",userId);
            const response = await $api.get(`/${path}/get/${userId}`);
            console.log("response.data",response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bookings from booking table');
        }
    },
    getAllFavoriteCorp: async (path,userId) => {
        try {
            const response = await $api.get(`/${path}/get/corp/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bookings from booking table');
        }
    },
    createFavoriteCorp: async (path,dataFavorite) => {
        try {
            const response = await $api.post(`/${path}/add/corp`, {dataFavorite});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create booking from booking table');
        }
    },
    createFavorite: async (path,dataFavorite) => {
        try {
            const response = await $api.post(`/${path}/add`, {dataFavorite});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create booking from booking table');
        }
    },
    deleteFavoriteCorp: async (path,hotelId) => {
        try {
            const response = await $api.delete(`/${path}/delete/corp/${hotelId}`);
            console.log("response bookings", response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete booking from booking table');
        }
    },
    deleteFavorite: async (path,hotelId) => {
        try {
            const response = await $api.delete(`/${path}/delete/${hotelId}`);
            console.log("response bookings", response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete booking from booking table');
        }
    },
}

export default FavoriteService;