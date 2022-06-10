const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();
class TaskService extends BaseService {
    constructor() {
        super(BaseModel.task);
    }

    list(where) {
        if (where) {
            return BaseModel.task.findMany({
                where,
                include: {
                    user: true,
                    assigned: true
                },
            });
        }

        return BaseModel.task.findMany({
            include: {
                user: true,
                assigned: true
            },
        });
    }

    remove(data) {
        return BaseModel.task.deleteMany({
            where: {
                OR: [
                    {
                        id: data.id,
                    },
                    {
                        SubTask: data.SubTask,
                    }
                ],
            }
        })

    }

}

module.exports = new TaskService();