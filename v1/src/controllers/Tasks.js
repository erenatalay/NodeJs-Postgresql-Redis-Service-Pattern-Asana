const { insert, list, modify, remove } = require("../services/Tasks")
const httpStatus = require("http-status");
const index = (req, res) => {

    list({ section_id: parseInt(req.params.section_id), SubTask: 0 })
        .then(response => {
            if (response.length === 0) {
                return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
            }
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

const update = (req, res) => {

    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }

    modify(req.body, parseInt(req.params?.id))
        .then((updatedProject) => {
            res.status(httpStatus.OK).send(updatedProject)

        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu" }))
}


const deletedTask = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }
    remove({ id: parseInt(req.params?.id), SubTask: parseInt(req.params?.id) })
        .then((deletedProject) => {
            if (!deletedProject) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({ message: "Proje silinmiştir" })

        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" }))

}

const subTaskCreate = async (req, res) => {
    const findTask = await list({ id: parseInt(req.params.task_id) })
    delete findTask[0].user
    delete findTask[0].id
    let createTask = await insert({
        ...findTask[0],
        title: req.body.title,
        user_id: req.user.id,
        SubTask: parseInt(req.params.task_id),
    })
    return res.status(httpStatus.OK).send(createTask)

}

const subTaskGet = (req, res) => {

    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }
    list({ SubTask: parseInt(req.params.id) })
        .then(response => {
            if (response.length === 0) {
                return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
            }
            res.status(httpStatus.OK).send(response)
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}


module.exports = {
    create,
    index,
    update,
    deletedTask,
    subTaskCreate,
    subTaskGet
}