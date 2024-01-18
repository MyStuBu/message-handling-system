import User from '../models/User';

class UserService {
    public async createUserInDatabase(username: string, hashedPassword: string): Promise<User> {
        return await User.create({
            username: username,
            password: hashedPassword,
        });
    }

    public async findUserInDatabase(username: string): Promise<User | null> {
        return await User.findOne({ where: { username } });
    }
}

export default UserService;
