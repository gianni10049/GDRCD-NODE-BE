'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ability', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description_it: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			description_eng: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			icon: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			stat: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			max_level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			castable: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			visible: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			createdBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null,
			},
		});

		await queryInterface.createTable('ability_details', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ability: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			price: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			bonus: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null,
			},
		});

		await queryInterface.createTable('character_ability', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			character: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			ability: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			value: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null,
			},
		});

		await queryInterface.bulkInsert('ability', [
			{
				name: 'athletic',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				icon: 'Athletic',
				stat: 1,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'whiteWeapons',
				description_it:
					'Con Armi bianche si intende la bravura, la coordinazione e la conoscenza nell’utilizzo di armi da mischia atte ad offendere l’avversario, che esse siano a concussione, perforazione o taglienti. Usata per il calcolo danni Armi bianche.',
				description_eng: 'TEST ENG',
				icon: 'Sword',
				stat: 1,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'fight',
				description_it:
					'Con Lotta si intende la bravura, la coordinazione e la conoscenza del combattimento corpo a corpo nonchè la possibilità di portare colpi che riescano a penetrare le difese del proprio avversario. Quest’abilità viene usata anche per parare,disarmare,schivare e calcolare i danni all’avversario in combattimento CAC.',
				description_eng: 'test eng',
				icon: 'Fight',
				stat: 1,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'resistance',
				description_it:
					'Con Resistenza si intende la resistenza del proprio personaggio a tutti i fattori esterni, ai veleni, le droghe e le tossine, la resistenza al dolore, la possibilità di sopportarlo, di non soccombere a malattie di qualche tipo etc. Viene utilizzata anche per il calcollo dei Punti Ferita e la riduzione danno.',
				description_eng: 'test eng',
				icon: 'Resistance',
				stat: 1,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'fireWeapon',
				description_it:
					'Con Armi da fuoco si intende la bravura, la coordinazione e la conoscenza del personaggio nell’utilizzo di tutte le armi che comprendono la combustione di polvere da sparo nel loro meccanismo. Questa abilità comprende anche le armi pesanti, che se utilizzate senza il giusto quantitativo di statistica fisico avranno dei malus. Così come l’utilizzo di due armi da fuoco senza il determinato talento.',
				description_eng: 'test eng',
				icon: 'Gun',
				stat: 2,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'furtivity',
				description_it:
					'Con Furtività si intende tutte quelle azioni che permettono al personaggio di passare inosservato, come nascondersi dietro un riparo, nascondere il rumore dei propri passi, portare a minimo le proprie emissioni sonore e prendere di sorpresa l’avversario. Un bersaglio furtivo ha vari bonus all’inizio del combattimento.',
				description_eng: 'test eng',
				icon: 'Furtivity',
				stat: 2,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'drive',
				description_it:
					'Con Guidare si intende l’esperienza di guida di un personaggio di mezzi terresti, aerei o navali. Quest’abilità viene presa in considerazione in ambienti accidentati, scenari di guerra o durante qualche crisi di qualche tipo. Almenochè non si abbia il malus “Pessimo guidatore” si potrà guidare in ambienti normali con 1 punto Guidare.',
				description_eng: 'test eng',
				icon: 'Drive',
				stat: 2,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'manuality',
				description_it:
					'Con Manualità si intende la coordinazione mano occhio del personaggio, la sua abilità nei lavori manuali e la precisione nello svolgerli. Quest’abilità comprende anche la bravura del personaggio nello slegarsi, nello scassinare o nel derubare qualcuno. Unito ad ingegneria permette la creazione di oggetti nuovi più complessi. Comprende anche la conoscenza medica PRATICA del personaggio: Operare, saper ricucire, medicare etc. ed è accompagnata in settore medico dall’abilità Conoscenza.',
				description_eng: 'test eng',
				icon: 'Manuality',
				stat: 2,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'selfcontrol',
				description_it:
					'Con Autocontrollo si intende la concentrazione del personaggio, la sua elasticità mentale e la propensione a restare tranquillo e lucido in situazioni di stress o paura. Usata come contrapposto a tutte le influenze emotive esterne e per l’abbassamento dei punti Stress e Paura.',
				description_eng: 'test eng',
				icon: 'SelfControl',
				stat: 3,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'knowledge',
				description_it:
					'Con Conoscenza si intende la sapienza e la saggezza del proprio personaggio, ciò che conosce del mondo e delle varie materie accademiche come la storia, la matematica, la scienza, la fisica etc. Al primo punto di acquisto di questa abilità è necessario scegliere un campo di competenza tra:\n' +
					'-Arte bellica ( Logistica – Strategia – Addestramento - Interrogatorio)\n' +
					'-Medicina\n' +
					'-Accademia ( Storia – Geografia – Letteratura generale – Diritto – Legge)\n' +
					'-Agricoltura e allevamento \n' +
					'-Chimica (Chimica - Biologia)\n' +
					'-Bestiario\n',
				description_eng: 'test eng',
				icon: 'Knowledge',
				stat: 3,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'investigate',
				description_it:
					'Con Indagare si intende la ricerca di informazioni per l’acquisizione di conoscenze su eventi o per stabilire la verità di alcuni eventi o situazioni. Ogni tipo di ricerca non legata all’uso di una conoscenza viene intesa sotto quest’abilità: Trovare tracce, cercare piste, prove del passaggio di qualcuno, il ritrovamento di oggetti o indizi. Incide sulla possibilità di ritrovamento di informazioni in un interrogatorio.',
				description_eng: 'test eng',
				icon: 'Investigate',
				stat: 3,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'engineering',
				description_it:
					'Con Ingegneria si intende l’esperienza del personaggio nello smontare,rimontare o creare oggetti. Utilizzata anche per la costruzione di esplosivi e la creazione di oggetti particolari se unita a Manualità.',
				description_eng: 'test eng',
				icon: 'Engineering',
				stat: 3,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'find',
				description_it:
					'Con cercare si intende l’attenzione dei sensi del personaggio nel momento della ricerca di oggetti o persone. Quest’abilità è utilizzata per il ritrovamento di oggetti, specifici e non, all’interno di ambienti che potrebbero contenere qualcosa di utile o nascosto. Utile anche per trovare passaggi, porte nascoste o oggetti occultati artificialmente (Coperti, sotterrati etc).',
				description_eng: 'test eng',
				icon: 'Search',
				stat: 4,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'fiveSenses',
				description_it:
					'Con Cinque sensi si intende l’utilizzo dei cinque sensi, la consapevolezza dell’ambiente circostante, il trovare dettagli incongruenti con l’ambiente, l’udire rumori che stonano con l’ambiente e la loro provenienza, trovare trappole, evitare imboscate, percepire odori particolari e meno forti, capire la consistenza di un cibo o se questo presenta gusti strani o fuori posto (veleni, droghe etc). Questa abilità aiuta anche nella schivata di proiettili.',
				description_eng: 'test eng',
				icon: 'Senses',
				stat: 4,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'empaty',
				description_it:
					'Con Empatia si intende la propensione di una persona a comprendere lo stato d’animo o la situazione altrui, immedesimarsi in discorsi o sensazioni altrui, capirle senza lasciarsi coinvolgere o esserne vittima. Incide anche sulla capacità di comprendere il comportamento animale e lo stato d’animo di un animale. Serve anche per scoprire se qualcuno ti sta mentendo.',
				description_eng: 'test eng',
				icon: 'Empaty',
				stat: 4,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'readiness',
				description_it:
					'Con Prontezza si intende la rapidità nel collegare il pensiero al corpo in determinate azioni e saper reagire in un lasso di tempo breve con l’azione più adeguata, per questo incide su fattori come la schivata e l’iniziativa.',
				description_eng: 'test eng',
				icon: 'Readiness',
				stat: 4,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'exchange',
				description_it:
					'Con Contrattare si intende la conoscenza del personaggio nel settore commerciale, la sua bravura nel saper trattare sul prezzo e sul sapere cosa potrebbe servire scambiare o promettere per un determinato oggetto o accordo.',
				description_eng: 'test eng',
				icon: 'Exchange',
				stat: 5,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'intimidate',
				description_it:
					'Con Intimidire si intende lo schiacciamento della forza d’animo, delle idee o del coraggio nei confronti di un avversario. Incide sulla possibilità di convincere le persone della propria pericolosità, di spaventare i bersagli in combattimento o attirare l’attenzione di queste nei propri confronti attraverso l’utilizzo della propria forza o di un linguaggio aggressivo e provocatore.',
				description_eng: 'test eng',
				icon: 'Intimidation',
				stat: 5,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'deceive',
				description_it:
					'Con Raggirare si intende la bravura del personaggio nel nascondere le proprie emozioni, mentire o ingannare in qualsiasi altro modo. Incide sulla possibilità di distrarre un bersaglio attraverso l’uso di bugie e tecniche per portare l’attenzione di questo nei propri confronti con trucchetti e affermazioni melliflue, ingannatrici e malevole.',
				description_eng: 'test eng',
				icon: 'Deceive',
				stat: 5,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'socializing',
				description_it:
					'Con Socializzare è intesa la parlantina e la dialettica del personaggio, la sua abilità a confondere o manipolare le persone, convincerle delle proprie idee o del proprio piano, coinvolgere le emozioni di molti nei propri confronti, spiegare o convincere gli altri a dire ciò che vuole sapere con l’uso della diplomazia. Incide sulla possibilità di distrarre un bersaglio con l’uso della dialettica, attirando l’attenzione con argomenti che possono sembrare interessanti o profondi, nonché di spicco. Usata anche per intrattenere i grandi o i piccoli pubblici.',
				description_eng: 'test eng',
				icon: 'Socializing',
				stat: 5,
				max_level: 5,
				castable: true,
				visible: true,
				createdBy: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('ability_stat');
		await queryInterface.dropTable('ability_details');
		await queryInterface.dropTable('character_ability');
		await queryInterface.dropTable('ability');
	},
};
