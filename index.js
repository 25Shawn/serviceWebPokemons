const express = require('express');
const routesUtilisateur = require('./src/routes/routesUtilisateur');
const authentification = require('./src/middlewares/authentification');
var cors = require('cors');
const sql = require("./src/config/db.js");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');
const { route } = require('./src/routes/routesPokemons.js');

const swaggerOptions ={
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
}
app.use(express.json());
app.use('/api/users',authentification, routesUtilisateur.router);
app.use(cors());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use('/api/pokemons', require('./src/routes/routesPokemons.js'))

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

