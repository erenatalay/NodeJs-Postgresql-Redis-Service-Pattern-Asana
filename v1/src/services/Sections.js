const { PrismaClient } = require('@prisma/client');
const { section } = new PrismaClient();

const insert = (data) => {
    return section.create({ data })
}

const list = (where) => {

    if (where) {
        return section.findMany({
            where,
            include: {
                user: true,
                project: true
            }
        });
    }
    return section.findMany({
        include: {
            user: true,
            project: true
        }
    });
}

const modify = (data, id) => {
    return section.update({ data, where: { id } })

}


const remove = (id) => {
    return section.delete({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}