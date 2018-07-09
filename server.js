const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');    //enables using partial files
app.set('view engine', 'hbs');                          //set key => value

app.use((req, res, next) => {                           //req object stores client data (eg. method, url)
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;       //http://expressjs.com/en/4x/api.html#req -- about req object
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();                                             //http://expressjs.com/en/guide/writing-middleware.html
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));         //adds given directory (__dirname is path to main folder)


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {                            //request, response
    res.render('home.hbs', {                            //renders home.hbs
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello User'
    });
});

// app.get('/', (req, res) => {                            //request, response
//     res.send({                                          //sends JSON data
//         name: 'Maciej',
//         likes: [
//             'Coding',
//             'Working out'
//         ]
//     });
// });

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   });
});

app.listen(port, () => {                                            //in browser - localhost:3000
    console.log(`Server is up on port ${port}`);
});