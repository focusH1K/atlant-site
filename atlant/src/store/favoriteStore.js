import { makeAutoObservable } from "mobx"
import AuthService from "../service/authService"
import UserService from "../service/userService"
import { showErrorToast, showSuccessToast } from "../components/Toast"

export default class FavoriteStore {
  favorites = []

  constructor() {
    makeAutoObservable(this)
  }

  async addToFavorite(flat_id, userId) {
    try {
      const favorite = await AuthService.addToFavorite(flat_id, userId)
      this.favorites.push(favorite)
      return true
    } catch (e) {
      return false
    }
  }

  isFavorite(flat_id) {
    return this.favorites.some((favorite) => favorite.flat_id === flat_id);
  }

  async getAllFavoritesFlats(userId) {
    try {
      const favorites = await AuthService.getFavoriteFlats(userId);
      this.favorites = favorites.data;
      for (let i = 0; i < this.favorites.length; i++) {
        const favoriteFlat = this.favorites[i];
        const flat = await UserService.fetchFlat(favoriteFlat.flat_id);
        favoriteFlat.flat = flat.data;
      }

    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  async deleteOneFlat(flat_id, userId) {
    try {
      await AuthService.deleteFlatFromFavorite(flat_id, userId)
      this.favorites = this.favorites.filter((favorite) => favorite.flat_id !== flat_id)
      return true
    } catch (e) {
      showErrorToast(e.response.data.message)
      return false
    }
  }
}
