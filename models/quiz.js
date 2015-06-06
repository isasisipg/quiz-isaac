//Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
				{pregunt: DataTypes.STRING,
				 respuesta: DataTypes.STRING,
				});
}