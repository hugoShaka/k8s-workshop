'use strict';

const PORT = process.env.PORT || 8080;
const UPLOAD_DIR = process.env.UPLOAD_DIR || '/uploads';
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(fileUpload());

app.get('/', (req, res) => {
    let fileList = [];
    fs.readdirSync(UPLOAD_DIR).forEach(file => fileList.push(`<li class="list-group-item">${file}</li>`));
    return res.status(200).send(`
<html>
<head>
    <title>Upload your files</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<div class="container well">
    <form enctype="multipart/form-data" action="/upload" method="POST" class="form-inline">
        <h3>Upload your file</h3>
        <input type="file" class="form-control-file mb-2" name="uploaded_file"></input>
        <button type="submit" class="btn btn-primary mb-2">Submit</button>
    </form>
    <br>
    <div class="gallery">
        <h3>File uploaded:</h3>
        <ul class="list-group">
        ${fileList.join('')}
        </ul>
    </div>
</div>
</body>
</html>
`);
});
app.post('/upload', function (req, res) {
    if (!req.files.hasOwnProperty('uploaded_file')) {
        return res.status(400).send('No file uploaded.');
    }
    req.files.uploaded_file.mv(`/uploads/${req.files.uploaded_file.name}`, function (err) {
        if (err)
            return res.status(500).send(err);
        res.redirect('/');
    });
});
app.listen(PORT, () => {
    console.log(`Server Running sucessfully on port ${PORT}.`);
});