const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();

class CommentService extends BaseService {
    constructor(){
        super(BaseModel.comments)
    }

     list (where) {
        if (where) {
            return BaseModel.comments.findMany({
                where,
                include: {
                    user: true,
                    task: true
    
                },
            });
        }
        return BaseModel.comments.findMany({
            include: {
                user: true,
                task: true
            },
        });
    }
}

module.exports = new CommentService();