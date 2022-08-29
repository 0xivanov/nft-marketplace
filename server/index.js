import * as express from "express";
var bodyParser = require('body-parser')
import db from './db/db'
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


app.use('/login', (req, res) => {
    res.send({
      token: req.body.account
    });
  });

app.post('/create', async (req, resp) => {
    db.createNft(req.body)
    resp.send(req.body)
})

app.get('/market', async (req, resp) => {
    let result = await db.getAllNfts()
    resp.send(result)
})

app.post('/market/:_id', (req, resp) => {
    db.likeNft(req.body, req.params._id)
})

app.post('/profile/create', async (req, resp) => {
  let result = await db.createProfile(req.body)
  resp.send(result)
})

app.post('/profile', async (req, resp) => {
  let result = await db.getProfile(req.body)
  resp.send(result)
})

app.post('/profile/edit', async (req, resp) => {
  let profile = req.body
  let _id = profile._id
  let result = await db.editProfile(profile, _id)
  resp.send(result)
})

app.listen(port, () => {
    
    console.log(`Server is listening on port ${port}`);
})