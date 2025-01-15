const fs = require('fs');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pelicula 1</title>
</head>
<body>
    <h1>Welcome to Pelicula 1</h1>
    <p>This is an automatically generated HTML file.</p>
</body>
</html>
`;

fs.writeFile('pelicula1.html', htmlContent, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});