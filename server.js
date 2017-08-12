var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var artickleOne = {
  title : 'Article one  I m kushal',
 heading: 'Artcle one',
 date: 'Aug 4th 2017',
 content : `This is the content for my first article. This is the content for my first article.
               
`};

function createTemplate (data) {
    var title = data.title;
    var date = date.date;
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
   return createTemplate;
}``;


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 
 app.get('/:articleName', function (req, res) {
     res.send(createTemplate(articleOne));
 });
 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var port = 80; // ue 080  for local developement because you might already have apache runnig on 80
app.listen(80, function () {
   console.log('IMAD course app listening on port ${port}!');
});

