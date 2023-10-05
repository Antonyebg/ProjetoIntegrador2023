'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      nome: 'Admin',
      email: 'admin@admin.com',
      // admin
      senha: '$2a$10$jCMd5OFd5YvImlcxZMRr0eLAP4lnb5qUxCCkPdf7k5kvFZy7Esl9a',
      telefone: '00000000000',
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
