
const { Projects } = require("../models");
const { User } = require("../models");

const insert = (data) => {
    const projects = new Projects(data)

    return projects.save();

}

const list = (where) => {
    if (where) {
        return Projects.findAll({
            where,
            include: [{
                model: User,
            }]
        });
    }
    return Projects.findAll({
        include: [{
            model: User,
        }]
    });
}

const modify = (data, id) => {
    return Projects.update(data, { where: { id }, returning: true, plain: true })

}


const remove = (id) => {
    return Projects.destroy({ where: { id }})

}
module.exports = {
    insert,
    list,
    modify,
    remove
}