import $api from "../http";

export default class AdminService {
    static fetchUsers() {
        return $api.get('/admin/users')
    }

    static createFlat(name, price, description, area, category_id, image, data) {
        return $api.post('/flat/admin/create', {
          name: name,
          price: price,
          description: description,
          area: area,
          category_id: category_id,
          image: image,
          data: data
        });
      }

    static deleteFlat(id) {
        return $api.delete(`/flat/admin/delete/${id}`)
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