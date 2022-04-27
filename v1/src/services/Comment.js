
const { PrismaClient } = require('@prisma/client');
const { comments } = new PrismaClient();

const insert = (data) => {
    return comments.create({ data });
}

const list = (where) => {
    if (where) {
        return comments.findMany({
            where,
            include: {
                user: true,
                task: true

            },
        });
    }
    return comments.findMany({
        include: {
            user: true,
            task: true
        },
    });
}

const modify = (data, id) => {
    return comments.update({ data, where: { id } })

}


const remove = (id) => {
    return comments.delete({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}