import * as express from "express";
var bodyParser = require('body-parser')
import nft from './db/nft'
const cors = require('cors');

const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    parameterLimit: 10000000,
    limit: '50mb',
    extended: true
  }));
app.use(cors())

const port = 3001


app.get('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

app.post('/create', (req, resp) => {
    
    nft.create(req.body)
    resp.send(req.body)
})

app.get('/market', (req, resp) => {
    nft.getAll((result) => {
        resp.send(result)
    })
})

app.post('/market/:_id', (req, resp) => {
    nft.like(req.body, req.params._id)
    resp.send(req.body)
})

app.listen(port, () => {
    
    console.log(`Server is listening on port ${port}`);
})