
const { PrismaClient } = require('@prisma/client');
const { subTask, task } = new PrismaClient();

const insert = (taskId) => {

    let subTaskData = { task_id: taskId }
   
    return  subTask.create({ data: subTaskData })
    

}

const list = (where) => {
    if (where) {
        return subTask.findMany({
            where,
            include: {
                user: true,
            },
        });
    }
    return subTask.findMany({
        include: {
            user: true,
        },
    });
}

const modify = (data, id) => {
    return subTask.update({ data, where: { id } })

}


const remove = (id) => {
    return subTask.delete({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}