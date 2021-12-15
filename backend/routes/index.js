const express = require('express')
const router = express.Router()
const getSurvey = require('../controllers/survey')
const getPrestations = require('../controllers/prestations')
const getPrestation = require('../controllers/prestation')
const getPortfolio = require('../controllers/portfolio')
const getPortfolioExample = require('../controllers/portfolioExample')
const getLanguages = require('../controllers/languages')
const getResults = require('../controllers/results')
const getContactInformations = require('../controllers/entity')

router.get('/survey', function (req, res) {
	const surveyData = getSurvey()
		if (!surveyData) {
			res.status(400).send('Page non trouvée')
		} else {
			res.send({ surveyData })
		}
})

router.get('/prestation', function (req, res) {
	const { id } = req.query
	const prestationData = getPrestation(id)
		if (!prestationData) {
			res.status(400).send('Page non trouvée')
		} else {
			res.send({ prestationData })
		}
})

router.get('/results', function (req, res) {
	const { a1, a2, a3, a4, a5, a6 } = req.query
	const resultsData = getResults(a1, a2, a3, a4, a5, a6)
	if (!resultsData) {
		res.status(400).send('Page non trouvée')
	} else {
	res.send({ resultsData })
	}
})

router.get('/prestations', function (req, res, next) {
	const prestationsList = getPrestations()
	res.send({ prestationsList })
})

router.get('/portfolio', function (req, res, next) {
	const portfolioList = getPortfolio()
	res.send({ portfolioList })
})

router.get('/example', function (req, res) {
	const { id } = req.query
	const portfolioExample = getPortfolioExample(id)
		if (!portfolioExample) {
			res.status(400).send('Réalisation non trouvée')
		} else {
			res.send({ portfolioExample })
		}
})

router.get('/languages', function (req, res, next) {
	const languagesList = getLanguages()
	res.send({ languagesList })
})

router.get('/entity', function (req, res, next) {
	const contactInformations = getContactInformations()
	res.send({ contactInformations })
})

router.get('/', function (req, res, next) {
	res.render('index', { title: 'API - BeCom\'' })
})

module.exports = router
