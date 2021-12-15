const languagesData = require('../models/languages')

function getLanguages() {
        let languages = languagesData.map(({ id, name, description, picture, skills, available }) => ({
            id,
            name, 
            description, 
            picture,
            skills,
            available
        }))
        let availableLanguages = [];
        languages.forEach(language => {
            if(language.available == true) {
                availableLanguages.push(language)
            }
        });
        return availableLanguages;
}

module.exports = getLanguages