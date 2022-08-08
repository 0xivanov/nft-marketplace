import * as express from "express";
import nft from './db/nft'

const app = express()
app.use(express.json())

const port = 3001

app.post('/create', (req, resp) => {
    
    console.log(req.body)
    nft.create(req.body)
    resp.send(req.body)
})

app.get('/market', (req, resp) => {
    nft.getAll((result) => {
        resp.send(result)
    })
})

app.listen(port, () => {
    
    console.log(`Server is listening on port ${port}`);
})