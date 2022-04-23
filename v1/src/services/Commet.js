
const { Comment } = require("../models");

const insert = (data) => {
    const comment = new Comment(data)

    return comment.save();

}

const list = (where) => {
    if (where) {
        return Comment.findAll({
            where,
            include: "User"
        });
    }
    return Comment.findAll({
        include: "User"
    });
}

const modify = (data, id) => {
    return Comment.update(data, { where: { id }, returning: true, plain: true })

}


const remove = (id) => {
    return Comment.destroy({ where: { id }})

}
module.exports = {
    insert,
    list,
    modify,
    remove
}