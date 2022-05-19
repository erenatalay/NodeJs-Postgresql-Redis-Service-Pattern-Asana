let BaseModel = null;

class BaseService {
    constructor(model) {
        BaseModel = model;
    }
    list(where) {
        if (where) {
            return BaseModel.findMany({
                where,
               
            });
        }
        return BaseModel.findMany({
           
        });
    }

    create(data) {
        return BaseModel.create({ data })
    }
    read(where) {
        return BaseModel.findFirst({
            where,
          
        });

    }
    update(id, data) {
        return BaseModel.update({ data, where: { id } })

    }

    delete(id) {
        return BaseModel.delete({ where: { id } })

    }
}

module.exports = BaseService;