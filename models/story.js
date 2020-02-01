module.exports = function (sequelize, DataTypes) {
    var Story = sequelize.define("Story", {
        body: {
            type: DataTypes.TEXT,
            // AllowNull is a flag that restricts a story from being entered if it doesn't
            // have a text value
            allowNull: false,
            // len is a validation that checks that our story has at least 1 character 
            validate: {
                len: [1]
            }
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    Story.associate = function (models) {
        // Associating Story with Choice
        // When a story is deleted, also delete any associated Choice
        Story.hasMany(models.Choice, {
            onDelete: "cascade"
        });
    };

    Story.associate = function (models) {
        // Associating Story with GameInfo
        Story.hasOne(models.GameInfo);
    };

    Story.associate = function (models) {
        // Associating Story with Choice
        Story.hasMany(models.Choice);
    };

    return Story;
};
