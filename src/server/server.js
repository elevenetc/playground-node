/**
 * Created by eugene.levenetc on 12/11/2016.
 */

const http = require('http');
const urlUtils = require('url');
const utils = require('../utils/utils');

class Server {

    /**
     * @param responses {Object}
     */
    constructor(responses) {
        utils.checkNull(responses);
        this.responses = responses;
        this.port = 8889;
    }

    start() {
        const server = this;
        const port = this.port;
        http.createServer(function (req, resp) {
            server.handleRequest(req, resp);
        }).listen(port, function () {
            console.log("Server listening on: http://localhost:%s", port);
        });
    }

    handleRequest(request, response) {

        const url = request.url;
        const queryMap = urlUtils.parse(request.url, true).query;
        const pathName = urlUtils.parse(request.url).pathname;

        let result = null;
        let statusCode = 0;

        for (var key in this.responses) {
            if (url.indexOf(key) > -1) {
                result = this.responses[key](request, queryMap);
                break;
            }
        }

        if (result == null) {
            result = 'not found response';
            statusCode = 500;
        } else {
            statusCode = 200;
        }

        response.statusCode = statusCode;
        response.end(result);

        console.log('request: ' + url);
        console.log('response: ' + statusCode)
    }
}

module.exports = Server;