const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'build')));

// app.use(bodyParser());
app.use(cors());

app.listen(PORT, function () {
	console.log('Server listening on ' + PORT);
});
