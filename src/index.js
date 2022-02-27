const ConnectionService = require('./services/ConnectionService');

/**
 * @param {object} event
 * @param {object} context
 * @param {Function} callback
 * @returns {Promise<void>}
 */
exports.handler = async (event, context, callback) => {
	try {
		// get your parameters, tableName and open a connection
		await new ConnectionService(parameters, tableName);

		// your code

		// Terminate connection since you are done
		ConnectionService.disconnect();

		return callback(null, {
			statusCode: 200,
			body: 'Success!',
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	} catch (error) {
		// Terminate connection in case of error since function is about to exit
		ConnectionService.disconnect();

		return callback(null, {
			statusCode: 500,
			body: `Error occurred! ${JSON.stringify(error)}`,
		});
	}
};
