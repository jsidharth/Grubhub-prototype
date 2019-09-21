const userModel = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: type.STRING,
        last_name: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        password: type.STRING,
        type: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        image: type.STRING
    });
};

export default userModel;