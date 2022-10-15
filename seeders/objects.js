'use strict';
module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('objects_status', [
			{
				name: 'Scheggiato',
				description: 'Scheggiato DESCR',
			},
			{
				name: 'Ammaccato',
				description:  'Ammaccato DESCR',
			},
			{
				name: 'Puzzolente',
				description:  'Puzzolente DESCR',
			},
		]);

		await queryInterface.bulkInsert('objects_types', [
			{
				name: 'Arma Bianca',
				description: 'Arma Bianca DESCR',
			},
			{
				name: 'Arma da Fuoco',
				description:  'Arma da Fuoco DESCR',
			},
			{
				name: 'Arma da Fuoco con Munizioni',
				description:  'Arma da Fuoco con Munizioni DESCR',
			},
		]);

		await queryInterface.bulkInsert('objects_qualities', [
			{
				name: 'Scadente',
				description: 'Scadente DESCR',
			},
			{
				name: 'Buono',
				description:  'Buono DESCR',
			},
			{
				name: 'Ottimo',
				description:  'Ottimo DESCR',
			},
			{
				name: 'Eccellente',
				description:  'Eccellente DESCR',
			},
		]);

		await queryInterface.bulkInsert('objects', [
			{
				name: 'Pistola',
				description: 'Pistola DESCR',
				img: 'pistola.jpg',
				type: 1,
				quality: 1,
				charges: 10,
				wearable: true,
				concealable: true,
				customizable: true,
				usable: true,
				cumulative: false,
				droppable: true,
				creatable: true,
				findable: true,
				transportable: true,
				sellable: true,
				price: 100,
				createdBy: 1
			},
		]);

	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('objects_status', null, {
			truncate: true,
			cascade: true,
		});

		await queryInterface.bulkDelete('objects_types', null, {
			truncate: true,
			cascade: true,
		});

		await queryInterface.bulkDelete('objects_qualities', null, {
			truncate: true,
			cascade: true,
		});

		await queryInterface.bulkDelete('objects', null, {
			truncate: true,
			cascade: true,
		});
	},
};
