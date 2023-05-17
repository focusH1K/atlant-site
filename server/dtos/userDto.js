module.exports = class UserDto {
    username
    email
    id
    is_activated
    role
    constructor(model) {
        this.username = model.username
        this.email = model.email
        this.id = model.id
        this.is_activated = model.is_activated
        this.role = model.role
    }
}