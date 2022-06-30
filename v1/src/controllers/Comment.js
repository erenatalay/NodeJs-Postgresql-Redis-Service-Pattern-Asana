const httpStatus = require("http-status");
const CommentService = require("../services/CommentService")

class Comment {
    index(req, res) {
        CommentService.list({ task_id: parseInt(req.params.task_id) })
            .then(response => {
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


    }
    create(req, res) {
        req.body.user_id = req.user.id;
        CommentService.insert(req.body).then((response) => {
            res.status(httpStatus.CREATED).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })

    }

    update(req, res) {


        CommentService.modify(req.body, parseInt(req.params?.id))
            .then((updatedProject) => {
                res.status(httpStatus.OK).send(updatedProject)

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu" }))
    }


    deletedProject(req, res) {
  
        CommentService.remove(parseInt(req.params?.id))
            .then((deletedProject) => {
                if (!deletedProject) {
                    return res.status(httpStatus.NOT_FOUND).send({
                        message: "Böyle bir kayıt bulunmamaktadır."
                    })
                }
                res.status(httpStatus.OK).send({ message: "Proje silinmiştir" })

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" }))

    }
}


module.exports = new Comment()

