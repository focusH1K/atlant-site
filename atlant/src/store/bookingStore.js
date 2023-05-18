import { makeAutoObservable } from "mobx";
import AuthService from "../service/authService";
import UserService from "../service/userService";
import AdminService from "../service/adminService";
import { showErrorToast, showSuccessToast, showWarningToast } from "../notifications/Toast";

export default class BookingStore {
    bookings = []

    constructor() {
        makeAutoObservable(this)
    }

    async bookFlat(userId, flatId, check_in_date, check_out_date, first_name, last_name, passport_data) {
        try {
            const booking = await AuthService.bookFlat(userId, flatId, check_in_date, check_out_date, first_name, last_name, passport_data)
            showSuccessToast('Квартира успешно забронирована! Проверьте свою эл.почту') 
            this.bookings.push(booking)
            return true
        } catch (e) {
            showErrorToast(e.response.data.message)
            return false
        }
    }

    async getBookingById(userId) {
        try {
            const bookings = await AuthService.getBookingById(userId);
            this.bookings = bookings.data;

            for (let i = 0; i < this.bookings.length; i++) {
                const bookingFlat = this.bookings[i];
                const flat = await UserService.fetchFlat(bookingFlat.flatInfo.flatId);
                bookingFlat.flat = flat.data;
            }
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    }

    async cancelBooking(id) {
        try {
            await AuthService.cancelBooking(id)
            showWarningToast('Бронирование отменено')
            this.bookings = this.bookings.filter(booking => booking.id !== id)
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    }

    async getAllBookings() {
        try {
            const bookings = await AdminService.getAllBookings();
            
            this.bookings = bookings.data;
            for (let i = 0; i < this.bookings.length; i++) {
                const booking = this.bookings[i];
                const flat = await UserService.fetchFlat(booking.flatId);
                booking.flat = flat.data;
                const user = await AuthService.getUserById(booking.userId);
                booking.user = user.data;
            }
        } catch(e) {
            showErrorToast(e.response.data.message)
        }
    }
}