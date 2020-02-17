module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LawfirmUsers', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      membership: {
        type: Sequelize.ENUM('owner', 'member'),
        allowNull: false,
        defaultValue: 'member',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lawfirm_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'lawfirms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('lawfirm_users');
  },
};
