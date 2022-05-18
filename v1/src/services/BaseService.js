let BaseModel = null;

class BaseService {
    constructor(model){
        BaseModel = model;
    }
  list(where){
    if (where) {
        return BaseModel.findMany({
            where,
            include: {
                user: true,
            },
        });
    }
    return BaseModel.findMany({
        include: {
            user: true,
        },
    });
  }

  create(data){

  }
  read(where){

  }
  update(id,data){

  }

  delete(id){

  }
}

module.exports= BaseService;