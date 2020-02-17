const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid(),
      },
      lawfirm_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'lawfirms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'lawfirm_users', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('clients');
  },
};
