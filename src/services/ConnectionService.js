const mysql = require('mysql');

let instance = null;

/**
 * @class {ConnectionService}
 */
class ConnectionService {
	/**
	 * @param {object} credentials
	 * @param {string} tableName
	 * @returns {*}
	 */
	constructor (credentials, tableName) {
		if (instance) {
			return instance;
		}

		this.credentials = credentials;
		ConnectionService.myConnection = this.connect(tableName);

		instance = this;

		return this;
	}

	/**
	 * @returns {void}
	 */
	static disconnect () {
		ConnectionService.myConnection.destroy();
		ConnectionService.myConnection = null;

		instance = null;
	}

	/**
	 * @param {string} databaseName
	 * @returns {Connection}
	 */
	connect (databaseName) {
		const { host, user, password } = this.credentials.database;

		return mysql.createConnection({ host, user, password, database: databaseName, charset: 'utf8mb4' });
	}

	/**
	 * @returns {Connection}
	 */
	static get tableConnection () {
		return ConnectionService.myConnection;
	}
}

ConnectionService.myConnection = null;

module.exports = ConnectionService;
