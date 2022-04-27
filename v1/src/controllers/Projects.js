const { insert, list ,modify,remove} = require("../services/Projects")
const httpStatus = require("http-status");
const index = (req, res) => {
    list()
    .then(response => {
        res.status(httpStatus.OK).send(response)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


}
const create = (req, res) => {
    req.body.user_id = req.user.id;
    insert(req.body).then((response) => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })

}

const update = (req,res) => {
    
    if(!req.params?.id){
    return res.status(httpStatus.BAD_REQUEST).send({
        message : "Id Bilgisi Eksik."
    })
    }

    modify(req.body,parseInt(req.params?.id))
    .then((updatedProject) => {
        res.status(httpStatus.OK).send(updatedProject)
      
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error  : "Kayıt sırasında bir problem oluştu"}))
}


const deletedProject = (req,res) => {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "Id Bilgisi Eksik."
        })
        }
    
        remove(parseInt(req.params?.id))
        .then((deletedProject) => {
            if(!deletedProject){
                return res.status(httpStatus.NOT_FOUND).send({
                    message : "Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({message : "Proje silinmiştir"})
          
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error  : "Kayıt silme sırasında bir problem oluştu"}))
    
}

module.exports = {
    create,
    index,
    update,
    deletedProject
}