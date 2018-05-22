const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyparser.json());
app.use('/', express.static(__dirname + '/../public/dist'))


let port = 4300 ;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

