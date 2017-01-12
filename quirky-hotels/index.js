const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const morgan     = require('morgan');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

const app        = express();
const port       = process.env.PORT || 3000;

const apiRoutes  = require('./config/apiRoutes');
const webRoutes  = require('./config/webRoutes');
const config     = require('./config/config');

const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/quirky-hotels';
mongoose.connect(databaseURL);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('${__dirname}/public'));

app.use('/api', expressJwt({secret: config.secret}))
.unless({
  path: [
    {url: '/api/login', methods: ['POST']},
    {url: '/api/register', methods: ['POST']}
  ]
});

app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.listen(port, console.log(`Server has stated on port: ${port}`));
