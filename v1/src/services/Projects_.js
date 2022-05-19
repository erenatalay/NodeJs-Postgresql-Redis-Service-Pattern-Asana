const { PrismaClient } = require('@prisma/client');
const { project } = new PrismaClient();

const insert = (item) => {
    return project.create({ data : item})
}

const list = (where) => {
    if (where) {
        return project.findMany({
            where,
            include: {
                user: true,
            },
        });
    }
    return project.findMany({
        include: {
            user: true,
        },
    });
}

const modify = (data, id) => {
    return project.update({data,where : {id}})

}


const remove = (id) => {
    return project.delete({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}