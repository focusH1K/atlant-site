import { makeAutoObservable } from "mobx";
import AuthService from "../service/authService";
import UserService from "../service/userService";
import AdminService from "../service/adminService";
import { showErrorToast, showSuccessToast } from "../components/Toast";

export default class PurchaseStore {
    purchases = []

    constructor() {
        makeAutoObservable(this)
    }

    async createPurchase(userId, flatId, purchase_date, first_name, last_name) {
        try {
            const purchase = await AuthService.createPurchase(userId, flatId, purchase_date, first_name, last_name)
            showSuccessToast('Заявка успешно отправлена! Проверьте свою эл.почту')
            this.purchases.push(purchase)
            return true
        } catch (e) {
            showErrorToast(e.response.data.message)
            return false
        }
    }

    async getOnePurchase(userId) {
        try {
            const purchases = await AuthService.getOnePurchase(userId)
            this.purchases = purchases.data

            for (let i = 0; i < this.purchases.length; i++) {
                const purchaseFlat = this.purchases[i]
                const flat = await UserService.fetchFlat(purchaseFlat.flatId)
                purchaseFlat.flat = flat.data
            }
        } catch(e) {
            showErrorToast(e.response.data.message)
        }
    }

    async getAllPurchases() {
        try {
            const purchases = await AdminService.getAllPurchases()
            this.purchases = purchases.data

            for (let i = 0; i < this.purchases.length; i++) {
                const purchase = this.purchases[i]
                const flat = await UserService.fetchFlat(purchase.flatId)
                purchase.flat = flat.data
                const user = await AuthService.getUserById(purchase.userId)
                purchase.user = user.data
            }
        } catch(e) {
            showErrorToast(e.response.data.message)
        }
    }
}
