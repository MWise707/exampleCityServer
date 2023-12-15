import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const expressPort = 9001;

const pool = new Pool ({
  user: 'markwiseman',
  host: 'localhost',
  database: 'cities',
  port: 5432
})

app.use(express.json());

app.get('/cities', (req, res) => {
  // query the database for city data
  pool.query('SELECT * FROM cities')
  .then((inventory) => {
    res.send(inventory.rows);
  })
  .catch((err) =>{
    res.status(500).send("Sorry Not Found");
  })
})

// Execute a route for GET "/cities/:id"
app.get('/cities/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM cities WHERE id = $1', [id])
  .then((city) => {
    console.log(city.rows[0]);
    res.send(city.rows[0]);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Bad Request");
  })
})

// Execute create a new city

app.use("/*", (req, res) => res.status(404).send("Not Found"));

app.listen(expressPort, ()=> console.log('Listening at port ', expressPort));