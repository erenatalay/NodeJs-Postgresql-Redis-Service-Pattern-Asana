
const { PrismaClient } = require('@prisma/client');
const { task } = new PrismaClient();

const insert = (data) => {
    return task.create({ data })

}

const list = (where) => {
    if (where) {
        return task.findMany({
            where,
            include: {
                user: true,
            },
        });
    }
    return task.findMany({
        include: {
            user: true,
        },
    });
}

const modify = (data, id) => {
    return task.update( {data, where: { id } })

}


const remove = (id) => {
    return task.delete({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}