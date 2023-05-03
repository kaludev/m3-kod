const users = require('./users/users.json');
const http = require('http');
const express = require('express');
const BadRequestError = require('./errors/BadRequestError');
const app = express();
const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const notFound= require('./middleware/NotFound')
const errorHandler = require('./middleware/errorHandler');
const { join } = require('path');
const { writeFileSync } = require('fs');

app.use(express.static('public'));
app.use(express.json());

const server = http.createServer(app);

app.post('/addrecord', async (req, res) => {
    const name = req.body.name;
    const score = req.body.score;
    console.log(req.body);
    if(!name){
      throw new BadRequestError("name is required");
    }
    if(!score){
      throw new BadRequestError("score is required");
    }

    users.push({
      name:name,
      score:score,
    })
    writeFileSync(join(__dirname,'users','users.json'), JSON.stringify(users));
    res.status(200).json({
      ok: true,
      message: 'Successfully created record'
    });
})

app.get('/getrecords', function(req, res){
    const sortedData = users.sort((a,b) => b.score- a.score);
    const records = sortedData.slice(0,5)
    res.status(StatusCodes.OK).json({
      ok:true,
      users:records
    })
})

app.use(notFound);
app.use(errorHandler);

const PORT  = process.env.PORT || 5000;

server.listen(PORT,() =>{
  console.log(`app listens on port ${PORT}`)
})