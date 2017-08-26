var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var pool = new Pool(config);

var config = {
    user: 'kushaljoharapurkar',
    dtabase: 'kushaljoharapurkar',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'process.enV.DB_PASSWORD'
};
var app = express();
app.use(morgan('combined'));

var articleOne = {
  title : 'Article one  I m kushal',
 heading: 'Artcle one',
 date: 'Aug 4th 2017',
 content : `This is the content for my first article. This is the content for my first article.
               
`};
var articleTwo = {
  title : 'Article two  I m kushal',
 heading: 'Artcle two',
 date: 'Aug 8th 2017',
 content : `This is the content for my secondt article. This is the content for my second article.
               
`};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

    var htmlTemplate = `
    <html>
        <head>
              <title>
                 ${title}
              </title>
              <meta name='vewport' content='width=device-width,initial-scale=1'/>
              <link href='/ui/style.css' rel='stylesheet' />
       </head>
        <body>
            <div class='container'>
            <div> 
               <a href="/">Home</a>
             </div>
        <br/>
        <h3>
           ${heading}
            </h3>
            <div>
               ${date}
                </div>
                <div>
                   ${content}
                </div>
                </div>
        </body>
    </html>
  `;
return htmlTemplate;
}

app.get('/favicon.ico', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));

});

app.get('/ui/madi.png', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));

});
var pool = new Pool(config);
app.get('/test-db', function (req, res)  {
    // make a select request
    // return a response with the results
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err, toString);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});



app.get('/ui/main.js', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'main.js'));

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) { // /submit-name?name-xxx
   // Get the name from the request
   var name = req.query.name;
   
   names.push(name);
   // JSON: Javascript Object Notation
   res.send(JSON.stringify(names));
});
 
 app.get('/articles/:articleName', function (req, res) {
   //articleName = article one
   //articles[articleName]= [] content object for article one
   
     pool.query("SELECT * FROM articles WHERE title = "+ req.params.articleName, function (err, result) {
     if (err) {
         res.status(500).send(err, toString());
     } else {
         if (result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
              var articledata = result.rows[0];
               res.send(createTemplate(articleOne));
         }
     }
    });    
 });
 
 app.get('/:articleName', function (req, res) {
     res.send(createTemplate(articleTwo));
 });
 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

