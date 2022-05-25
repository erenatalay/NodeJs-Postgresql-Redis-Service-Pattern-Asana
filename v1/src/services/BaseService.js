
class BaseService {
    constructor(model) {
        this.BaseModel = model;

    }

    list(where) {
        if (where) {
            return this.BaseModel.findMany({
                where,

            });
        }
        return this.BaseModel.findMany({

        });
    }

    insert(data) {
        return this.BaseModel.create({ data })
    }
    read(loginData) {
        return this.BaseModel.findFirst({ where: loginData });

    }
    update(id, data) {
        return this.BaseModel.update({ data, where: { id } })

    }

    delete(id) {
        return this.BaseModel.delete({ where: { id } })

    }
}

module.exports = BaseService;