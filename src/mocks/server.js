const { create, defaults, router: _router } = require('json-server');
const delayMiddleware = require('./delay.js');

let server = create();

server.use(defaults());
server.use(delayMiddleware);

let router = _router('./src/mocks/db.json');
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
