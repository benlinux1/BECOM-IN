const portfolioData = require('../models/portfolio')

function getPortfolio() {
	return portfolioData.map(({ id, name, description, cover, pictures, videos, skills, logo }) => ({
		id,
		name, 
		description,
        cover,
		pictures,
        videos,
        skills,
		logo,
	}))
}

module.exports = getPortfolio