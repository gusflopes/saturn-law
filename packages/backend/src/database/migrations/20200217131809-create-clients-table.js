module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      email: Sequelize.STRING,
      cpf_cnpj: Sequelize.STRING,
      birth_date: Sequelize.DATEONLY,
      // Lawsuit Properties
      identity: Sequelize.STRING,
      nit: Sequelize.STRING,
      marital_status: Sequelize.STRING,
      occupation: Sequelize.STRING,
      nationality: Sequelize.STRING,
      // Taxpayer Properties
      contribuinte: {
        type: Sequelize.ENUM('Isento', 'Contribuinte', 'Não Contribuinte'),
      },
      insc_municipal: Sequelize.STRING,
      insc_estadual: Sequelize.STRING,

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
    return queryInterface.dropTable('clients');
  },
};
