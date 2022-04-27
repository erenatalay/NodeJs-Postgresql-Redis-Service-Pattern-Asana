const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();


const insert = (data) => {

    return user.create({data})

}
const loginUser = (loginData) => {
    return user.findFirst({ where: loginData })
}
const list = () => {

    return user.findMany({});
}

const modify = (where, data) => {
    return user.update({data ,where })

}


const remove = (id) => {
    return user.delete({ where: { id } })

}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove
}