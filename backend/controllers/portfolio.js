const portfolioData = require('../models/portfolio')

function getPortfolio() {
	return portfolioData.map(({ id, name, description, cover, pictures, videos, skills }) => ({
		id,
		name, 
		description,
        cover,
		pictures,
        videos,
        skills,
	}))
}

module.exports = getPortfolio