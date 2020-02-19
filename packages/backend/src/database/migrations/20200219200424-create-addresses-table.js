module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      postal_code: Sequelize.STRING,
      street: Sequelize.STRING,
      number: Sequelize.STRING,
      street2: Sequelize.STRING,
      district: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      country: Sequelize.STRING,

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
    return queryInterface.dropTable('addresses');
  },
};
