import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/sequalize";
import Conversation from "./Conversation";

class User extends Model {
    declare id: bigint
    declare username: string
    declare conversations: Array<Conversation>
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'User'
})

export default User