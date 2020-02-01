module.exports = function (sequelize, DataTypes) {
    var GameInfo = sequelize.define("GameInfo", {
        clanName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        charName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    GameInfo.associate = function (models) {
        // We're saying that a GameInfo should belong to the User
        // A game can't be created without a User due to the foreign key constraint
        GameInfo.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    GameInfo.associate = function (models) {
        // We're saying that a GameInfo should belong to the User
        // A game can't be created without a Story due to the foreign key constraint
        GameInfo.belongsTo(models.Story, {
            foreignKey: {
                name: 'lastStoryId',
                allowNull: true
            }
        });
    };

    return GameInfo;
};
