const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const insertUser = async ({ displayName, email, password, image }) => {
const user = await User.findOne({
    attributes: ['email'],
    where: { email },
});

    if (user) {
        return { type: 'email já cadastrado', message: 'User already registered' };
    }
    const newUser = await User.create({
        displayName,
        email,
        password,
        image: image || null,
    });

    const token = generateToken(newUser);

    return { type: null, message: token };
};

const getAll = async () => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password'],
        },
    });
    return { type: null, message: users };
};

const getById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password'],
        } });

    if (!user) return { type: 404, message: 'User does not exist' };

    return { type: null, message: user };
};

const deleteByToken = async (id) => {
    const rowAffected = await User.destroy({ where: { id } });

    if (!rowAffected) return { type: 404, message: 'invalid user' };
    return { type: null, message: rowAffected };
};

module.exports = {
    insertUser,
    getAll,
    getById,
    deleteByToken,
};