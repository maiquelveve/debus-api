"use strict";//'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('usuarios', { 
        id: {
          type: Sequelize.INTEGER,
          allwNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        st_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        st_email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true,
        },
        st_senha: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('usuarios');
  }
};
