'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class client_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    client_info.init({
        site_addr: DataTypes.STRING,
        data: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'client_info',
    })
    return client_info
}