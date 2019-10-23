const Express = require('express');
const BodyParser = require('body-parser');

const Cors = require('cors');

const CodeNumberActivityAPI = require('./codeNumberActivity.server.model');

const app = Express();

app.use(BodyParser.json());
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/api/code-number-activity',CodeNumberActivityAPI);

app.listen(3000, () => {
    console.log('listening on 3000')
})
