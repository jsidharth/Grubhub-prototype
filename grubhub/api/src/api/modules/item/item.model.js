const itemModel = (sequelize, type) => {
    return sequelize.define('item', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        name: type.STRING,
        rate: type.FLOAT,
        description: type.STRING,
        image: type.STRING,
        section: type.STRING
    },{
        underscored: true
    });
};

const itemOrderModel = (sequelize, type) => {
    return sequelize.define('order_item', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        item_id: {
            type: type.INTEGER,
            references: {
                model: 'items',
                key: 'id'
              }
        },
        order_id: {
            type: type.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
              }
        },
        quantity: type.INTEGER
    },{
        underscored: true
    });
}
export {
    itemModel,
    itemOrderModel
};