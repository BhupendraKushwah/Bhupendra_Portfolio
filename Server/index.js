const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

require('./configs/environment.config')
require('./configs/database.config')

app.use(express.json());
// app.use(cors());
app.use(cors({ origin: '*' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',require('./routes'));

app.listen(PORT,()=>{
    console.log(`Server initialized on port ${PORT}`)
});

module.exports = app