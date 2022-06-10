const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();
class ProjectService extends BaseService {
    constructor() {
        super(BaseModel.project);
    }
    list (where) {
        if (where) {
            return BaseModel.project.findMany({
                where,
                include: {
                    user: true,
                },
            });
        }
        return BaseModel.project.findMany({
            include: {
                user: true,
            },
        });
    }
}

module.exports = new ProjectService();