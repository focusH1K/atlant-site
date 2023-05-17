import $api from "../http";

export default class UserService {
    static fetchCategories() {
        return $api.get('/category/getall')
    }

    static async fetchFlats(category_id = null) {
        const url = category_id ? `/flat/getall?category_id=${category_id}` : '/flat/getall';
        return await $api.get(url);
      }

    static fetchFlat(id) {
        return $api.get(`/flat/getone/${id}`)
    }

    static async VkLogin(id) {
        return $api.get(`/loginvk-done/${id}`)
    }
}