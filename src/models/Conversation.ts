import {DataTypes, Model, Sequelize} from 'sequelize';

class Conversation extends Model {
    declare id: bigint
    declare title: string

    static initModel(sequelize: Sequelize): void {
        Conversation.init({
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Conversation'
        })
    }
}

export default Conversation
