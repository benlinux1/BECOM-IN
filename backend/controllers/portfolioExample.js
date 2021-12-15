const portfolioData = require('../models/portfolio')

function getPortfolioExample(id) {
	return portfolioData.find((example => example.id === id))
}

module.exports = getPortfolioExample