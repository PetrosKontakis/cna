const Express = require('express');

const initialData = require("./mocks/codeNumberActivities.json")

const app = Express();

app.get("/search", async (request, response) => {
    try {
        let { input, page, limit, exclude } = request.query;
        limit = parseInt(limit);
        page = parseInt(page);

        let result = initialData.filter((model) => {
            return model.title.includes(input) || model.cna.includes(input)
        }).filter((model) => {
            return !(exclude && exclude === model.cna);
        }).slice((page - 1) * limit, page * limit);
      
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/company/:cna", async (request, response) => {
    try {
        let { page, limit } = request.query;
        let {cna }= request.params

        limit = parseInt(limit);
        page = parseInt(page);
        let companies = [...Array(150)].map((obj, i)=> {
            return {name: `Demo Company Name ID:${i+1}`, cna: cna}
        }).slice((page - 1) * limit, page * limit);
        response.send(companies);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = app;