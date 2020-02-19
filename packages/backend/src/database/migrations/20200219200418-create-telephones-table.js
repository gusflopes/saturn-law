module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('telephones', {
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

      ddd: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('whatsapp', 'self', 'contact'),
        allowNull: false,
        defaultValue: 'self',
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
    return queryInterface.dropTable('telephones');
  },
};
