import { makeAutoObservable } from "mobx"
import AuthService from "../service/authService"
import UserService from "../service/userService"
import { showErrorToast, showInfoToast } from "../notifications/Toast"

export default class FavoriteStore {
  favorites = []

  constructor() {
    makeAutoObservable(this)
  }

  async addToFavorite(flat_id, userId) {
    try {
      const favorite = await AuthService.addToFavorite(flat_id, userId)
      this.favorites.push(favorite)

    } catch (e) {
      console.log(e)
    }
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
    } catch (e) {
      showErrorToast(e.response.data.message)
    }
  }

  async clearFavorite(userId) {
    try {
      await AuthService.clearFavorites(userId)
      showInfoToast('Раздел очищен')
      this.favorites = []
    } catch(e) {
      showErrorToast(e.response.data.message)
    }
  }

}
