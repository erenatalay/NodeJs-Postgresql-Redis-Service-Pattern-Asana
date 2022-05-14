
const { PrismaClient } = require('@prisma/client');
const { subTask } = new PrismaClient();

const insert = (taskId) => {

    let subTaskData = { task_id: taskId }
   
    return  subTask.create({ data: subTaskData })
    

}

const list = (where) => {
    if (where) {
        return subTask.findMany({
            where,
            include: {
                task: true,
            },
        });
    }
    return subTask.findMany({
        include: {
            task: true,
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