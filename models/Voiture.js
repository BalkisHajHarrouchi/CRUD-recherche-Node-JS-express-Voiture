const { DataTypes } = require('sequelize');

const Voiture = (sequelize) => {
  const VoitureModel = sequelize.define('Voiture', {
    matricule: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marque: {
      type: DataTypes.STRING, // Corrected data type to INTEGER
      allowNull: false
    },
    modele: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return VoitureModel;
};

module.exports = Voiture;
