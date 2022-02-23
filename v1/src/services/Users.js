
const { User } = require("../models");

const insert = (data) => {
    const user = new User(data)
    return user.save();

}
const loginUser = (loginData) => {

    return User.findOne({where : loginData})
}   
const list = () => {
    
    return User.findAll({});
}
module.exports = {
    insert,
    list,
    loginUser
}