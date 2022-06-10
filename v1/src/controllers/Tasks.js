const httpStatus = require("http-status");
const TaskService = require("../services/TaskService")




class Tasks {
    index(req, res) {

        TaskService.list({ section_id: parseInt(req.params.section_id), SubTask: 0 })
            .then(response => {
                if (response.length === 0) {
                    return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
                }
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


    }
    create(req, res) {
        req.body.user_id = req.user.id;
        TaskService.insert(req.body).then((response) => {
            res.status(httpStatus.CREATED).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })

    }

    update(req, res) {

        if (!req.params?.id) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Id Bilgisi Eksik."
            })
        }

        TaskService.modify(req.body, parseInt(req.params?.id))
            .then((updatedProject) => {
                res.status(httpStatus.OK).send(updatedProject)

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu" }))
    }


    deletedTask(req, res) {
        if (!req.params?.id) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Id Bilgisi Eksik."
            })
        }
        TaskService.remove({ id: parseInt(req.params?.id), SubTask: parseInt(req.params?.id) })
            .then((deletedProject) => {
                if (!deletedProject) {
                    return res.status(httpStatus.NOT_FOUND).send({
                        message: "Böyle bir kayıt bulunmamaktadır."
                    })
                }
                res.status(httpStatus.OK).send({ message: "Proje silinmiştir" })

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" }))

    }

    async subTaskCreate(req, res) {
        const findTask = await TaskService.list({ id: parseInt(req.params.task_id) })
        if (findTask.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir section bulunamadı." })
        }
        delete findTask[0].user
        delete findTask[0].id
        delete findTask[0].assigned
        let createTask = await TaskService.insert({
            ...findTask[0],
            title: req.body.title,
            user_id: req.user.id,
            SubTask: parseInt(req.params.task_id),
            description: req.body.description
        })
        return res.status(httpStatus.OK).send(createTask)

    }

    subTaskGet(req, res) {

        if (!req.params?.id) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Id Bilgisi Eksik."
            })
        }

        TaskService.list({ SubTask: parseInt(req.params.id) })
            .then(response => {
                if (response.length === 0) {
                    return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
                }
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }

}

module.exports = new Tasks()


