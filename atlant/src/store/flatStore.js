import { makeAutoObservable } from 'mobx'
import UserService from '../service/userService'
import AdminService from '../service/adminService'
import { showErrorToast, showSuccessToast } from '../notifications/Toast'

export default class FlatStore {
  flats = []
  flat = {}
  totalFlatsCount = 0
  purchasedCount = 0
  reservedCount = 0

  constructor() {
    makeAutoObservable(this)
  }

  async createFlat(data) {
    try {
      const flat = await AdminService.createFlat(data)
      showSuccessToast('Квартира успешно добавлена!')
      this.flats.push(flat)
    } catch(e) {
      showErrorToast(e.response.data.message)
    }
  }

  async fetchFlats(category_id) {
    try {
      const response = await UserService.fetchFlats(category_id);
      console.log(response.data)
      this.flats = response.data;
      this.updateCounts();
    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  async fetchFlatById(id) {
    try {
      const response = await UserService.fetchFlat(id)
      this.flat = response.data
    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  async updateFlat(id, data) {
    try {
      await AdminService.updateFlat(id, data);
      await this.fetchFlats(data.get('category_id'));
      await this.fetchFlatById(id)
      showSuccessToast('Изменения сохранены')
    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  async deleteFlat(id) {
    try {
      await AdminService.deleteFlat(id);
      this.flats = this.flats.filter(flat => flat.id !== id);
      this.updateCounts();
    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  updateCounts() {
    this.totalFlatsCount = this.flats.length;
    this.purchasedCount = this.flats.filter(flat => flat.status === 'not available').length;
    this.reservedCount = this.flats.filter(flat => flat.status === 'reserved').length;
  }
}