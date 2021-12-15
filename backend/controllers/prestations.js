const prestationsData = require('../models/prestations')

function getPrestations() {
	return prestationsData.map(({ id, name, description, shortDescription, picture }) => ({
		id,
		name, 
		description,
		shortDescription,
		picture
	}))
}

module.exports = getPrestations
