const prestationsData = require('../models/prestations')

function getPrestation(id) {
	return prestationsData.find((prestation => prestation.id === id))
}

module.exports = getPrestation
