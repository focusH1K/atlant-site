import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import AuthService from "../service/authService";
import { API_URL } from "../http/index";
import jwtDecode from 'jwt-decode'
import { showErrorToast, showInfoToast, showSuccessToast } from '../notifications/Toast';



export default class Store {
    user = {}
    isAuth = false
    isAdmin = false
    isLoading = false
    isActivated = false

    constructor() {
        makeAutoObservable(this)
    }

    setActivated(bool) {
        this.isActivated = bool
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setAdmin(bool) {
        this.isAdmin = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(username, password) {
        try {
          const response = await AuthService.login(username, password);
      
          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
      
          if (response.data.user.role === 'admin') {
            this.setAdmin(true);
            window.location.href = '/admin' 
          } else {
            window.location.href = '/'  
          }
        } catch (e) {
          showErrorToast(e.response.data.message);
        }
      }

    async signup(username, email, password) {
        try {
          const response = await AuthService.signup(username, email, password);
          const token = response.data.accessToken;
          localStorage.setItem('token', token);
      
          const decodedToken = jwtDecode(token);
          const isActivated = decodedToken.is_activated;
      
          if (!isActivated) {
            showInfoToast('На вашу эл.почту выслано письмо для активации учетной записи');
            this.setAuth(false);
            this.setUser(null);
          } else {
            this.setAuth(true);
            this.setUser(response.data.user);
          }
      
        } catch (e) {
          showErrorToast(e.response.data.message);
        }
      }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setAdmin(response.data.user.role === 'admin')
        } catch (e) {
            console.log(e)
        }
        this.setLoading(false)
    }

    async requestPasswordReset(email) {
        try {
            const response = await AuthService.requestPasswordReset(email)
            showInfoToast('На вашу эл.почту выслано письмо для восстановления пароля')
            return response.data
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    }

    async resetPassword(reset_link, newPassword, verifyNewPassword) {
        try {
            const response = await AuthService.resetPassword(reset_link, newPassword, verifyNewPassword)
            showSuccessToast('Пароль успешно изменен')
            return response.data
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    }

    async changePassword(id, password, newPassword) {
        try {
            const response = await AuthService.changePassword(id, password, newPassword)
            showSuccessToast('Пароль успешно изменен')
            return response.data
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    }

    async loginvk(id) {
        const response = await axios.get(`http://localhost:7000/api/user/${id}`);
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true)
        this.setUser(response.data.user)
        return response.data;
    }

    async deleteUser(id) {
        try {
            await AuthService.deleteUser(id)
            this.users = this.users.filter((user) => user.id !== id)
            return true
        } catch (e) {
            showErrorToast(e.response.data.message)
            return false
        }
    }

    async resetUsername(email) {
        try {
            const response = await AuthService.resetUsername(email)
            return response.data
        } catch(e) {
            showErrorToast(e.response.data.message)
        }
    }
}
