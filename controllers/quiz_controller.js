var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){next(error);});
}

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz });
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /quizes
exports.index = function(req, res){
	console.log("busqueda: "+req.query.search);
	if (req.query.search === undefined) {
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes: quizes });
		}).catch(function(error) { next(error); });
	} else {
		models.Quiz.findAll({where: ["pregunta like ?", "%"+req.query.search.replace("+","%")+"%"]}).then(function(quizes){
			res.render('quizes/index', { quizes: quizes });
		}).catch(function(error) { next(error); });
	}
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build (
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build( req.body.quiz );
	console.log("Estamos en create.")
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		console.log("Redireccionamos")
		res.redirect('/quizes');
	})
};