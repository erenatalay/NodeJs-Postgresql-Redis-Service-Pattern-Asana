
const { Tasks } = require("../models");
const { Users } = require("../models");
const { Section } = require("../models");

const insert = (data) => {
    const tasks = new Tasks(data)

    return tasks.save();

}

const list = (where) => {
    if (where) {
        return Tasks.findAll({
            where,
            include: ["User", "Project"]
        });
    }
    return Tasks.findAll({
        include: ["Project", "User"]
    });
}

const modify = (data, id) => {
    return Tasks.update(data, { where: { id }, returning: true, plain: true })

}


const remove = (id) => {
    return Tasks.destroy({ where: { id } })

}
module.exports = {
    insert,
    list,
    modify,
    remove
}