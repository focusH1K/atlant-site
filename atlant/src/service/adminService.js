import $api from "../http";

export default class AdminService {
    static fetchUsers() {
        return $api.get('/admin/users')
    }

    static createFlat(data) {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      return $api.post('/flat/admin/create', data, { headers });
    }
    
    static updateFlat(id, data) {
        return $api.put(`/flat/admin/update/${id}`, data);
      }

    static refreshRole(id, role) {
        return $api.put(`/admin/user/refreshrole/${id}`, { newRole: role })
    }

    static getAllBookings() {
        return $api.get('/booking/admin/getallbookings')
    }

    static getAllPurchases() {
        return $api.get('/purchase/admin/getallpurchases')
    }

}