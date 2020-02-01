module.exports = function (sequelize, DataTypes) {
    var Choice = sequelize.define("Choice", {
        description: {
            type: DataTypes.TEXT,
            // AllowNull is a flag that restricts a choice from being entered if it doesn't
            // have a text value
            allowNull: false,
            // len is a validation that checks that our choice has at least 1 character 
            validate: {
                len: [1]
            }
        },
        orderId: {
            type: DataTypes.INTEGER
        },
        routeId: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    Choice.associate = function (models) {
        // We're saying that a Choice should belong to the Story
        // A choice can't be created without a Story due to the foreign key constraint
        Choice.belongsTo(models.Story, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Choice;
}