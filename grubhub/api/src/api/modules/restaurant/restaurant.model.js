const restaurantModel = (sequelize, type) => {
    return sequelize.define('restaurant', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        user_id: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
              }
        },
        name: type.STRING,
        cuisine: type.STRING,
        address: type.STRING,
        zipcode: type.INTEGER,
        image: type.STRING
    },{
        underscored: true
    });
};

export default restaurantModel;