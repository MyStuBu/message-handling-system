import {DataTypes, Model, Sequelize} from "sequelize";

class User extends Model {
    declare id: bigint
    declare user_reference: string

    static initModel(sequelize: Sequelize): void {
        User.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_reference: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                modelName: 'User',
            }
        );
    }
}

export default User
