let { API_AI_KEY } = process.env;
let URL = require('url');
let API_AI = require('apiai');
let app = API_AI(API_AI_KEY);

let randomize = (arr) => arr[Math.floor(Math.random() * arr.length)];

let sendResponse = ({ response, message }) => {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(
	    JSON.stringify(message)
	);
}

let createTextMsg = (text) => {
    return { messages: [{ text }] };
}

let handleResponse = (response) => ({ result }) => {
	let message;
    if (result.source === 'agent') {
        let randomMsg = randomize(result.fulfillment.messages);
        message = randomMsg.payload ? randomMsg.payload : createTextMsg(randomMsg.speech);
    } else if (result.source === 'domains') {
        message = createTextMsg(result.fulfillment.speech);
    }

    sendResponse({ response, message });
}

let handleError = (response) => (error) => {
	let message = { error };
	sendResponse({ response, message });
}

exports.endpoint = function(req, res) {
	let query = URL.parse(req.url, true).query;
	let request = app.textRequest(query.queryString, {
		sessionId: Math.random().toString().slice(2),
		contexts: [{
			name: query.context || 'DEFAULT',
			parameters: query,
		}]
	});

	request.on('response', handleResponse(res));
	request.on('error', handleError(res));
	request.end();
}
