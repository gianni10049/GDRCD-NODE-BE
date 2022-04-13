let i18n = require('i18next');
let it = require('./translation/it.json');
let en = require('./translation/en.json');

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	it: {
		translation: it,
	},
	en: {
		translation: en,
	},
};

i18n.init({
	resources,
	lng: 'it',
	interpolation: {
		escapeValue: false,
	},
}).then(() => {});

exports.i18n = i18n;
