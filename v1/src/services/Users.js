
const { User } = require("../models");

const insert = (data) => {
    const user = new User(data)
    return user.save();

}
const loginUser = (loginData) => {

    return User.findOne({ where: loginData })
}
const list = () => {

    return User.findAll({});
}

const modify = (where, data) => {
    return User.update(data, { where, returning: true, plain: true })

}


const remove = (id) => {
    return User.destroy({ where: { id } })

}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove
}