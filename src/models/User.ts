import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/sequalize";

class User extends Model {
    declare id: bigint
    declare username: string
    declare password: string
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Username cannot be null",
                },
                notEmpty: {
                    msg: "Username cannot be empty",
                },
            },
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password cannot be null",
                },
                notEmpty: {
                    msg: "Password cannot be empty",
                },
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User