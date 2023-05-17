import $api from "../http"

export default class AuthService {
    static async login(username, password) {
        return $api.post('/login', { username, password })
    }

    static async signup(username, email, password) {
        return $api.post('/signup', { username, email, password })
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async addToFavorite(flat_id, userId) {
        return $api.post('/favoriteFlat/create', { flat_id, userId })
    }

    static async getFavoriteFlats(userId) {
        return $api.get(`/favoriteFlat/getAllFlats/${userId}`)
    }

    static async deleteFlatFromFavorite(flat_id, userId) {
        return $api.delete(`/favoriteFlat/deleteFlat/user/${userId}/flat/${flat_id}`)
    }

    static async requestPasswordReset(email) {
        return $api.post('/user/reset/request', { email })
    }

    static async resetPassword(reset_link, newPassword, verifyNewPassword) {
        return $api.post(`/user/reset/${reset_link}`, { newPassword, verifyNewPassword })
    }

    static async getResetPasswordPage(reset_link) {
        return $api.get(`/user/reset/${reset_link}`);
    }

    static async changePassword(id, password, newPassword) {
        return $api.put(`/user/refreshPass`, { id, password, newPassword })
    }

    static async getUserById(id) {
        return $api.get(`/user/${id}`)
    }

    static async bookFlat(userId, flatId, check_in_date, check_out_date, first_name, last_name, passport_data) {
        return $api.post('/booking/bookflat', { userId, flatId, check_in_date, check_out_date, first_name, last_name, passport_data })
    }

    static async getBookingById(userId) {
        return $api.get(`/booking/getbooking/${userId}`)
    }

    static async cancelBooking(id) {
        return $api.delete(`/booking/cancel/${id}`)
    }

    static async createPurchase(userId, flatId, purchase_date, first_name, last_name) {
        return $api.post('/purchase/purchaseflat', { userId, flatId, purchase_date, first_name, last_name })
    }

    static async getOnePurchase(userId) {
        return $api.get(`/purchase/getonepurchase/${userId}`)
    }

    static async deleteUser(id) {
        return $api.delete(`/user/delete/${id}`)
    }

    static async resetUsername(email) {
        return $api.post('/user/resetUsername', {email})
    }

    static async refreshUsername(id, username) {
        return $api.put(`/user/refreshusername/${id}`, { newUsername: username })
    }

}
