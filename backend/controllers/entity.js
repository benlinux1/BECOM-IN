const entityData = require('../models/entity')

function getContactInformations() {
	return entityData.map(({ id, name, slogan, logo, adress, CP, city, email, phone1, phone2 }) => ({
        id,
		name, 
        slogan, 
        logo, 
        adress, 
        CP, 
        city, 
        email,
        phone1, 
        phone2
	}))
}

module.exports = getContactInformations