import User from "../models/User";

const createUserInDatabase = async (username: string, hashedPassword: string): Promise<User> => {
    return await User.create({
        username: username,
        password: hashedPassword,
    });
}

const findUserInDatabase = async (username: string): Promise<User|null> => {
    return await User.findOne({where: {username}})
}

export default {
    createUserInDatabase,
    findUserInDatabase
};