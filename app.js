const express = require('express')
const app     = express()
const hbs     = require('hbs') 
const bodyParser = require('body-parser');


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myFakeMiddleware);

function myFakeMiddleware(req, _, next){
  console.log("myFakeMiddleware was called!");
  req.secretValue = "swordfish";
  next();
}

app.get('/users/:username', (req, res, next) => {
  res.send(req.params);
})

app.get('/books/:bookId', (req, res, next) => {
  res.send(req.params);
})

app.get('/users/:username/books/:bookId', (req, res, next) => {
  res.send(req.params)
})

app.get('/search', (req, res, next) => {
  res.send(req.query)
})

app.get('/', (req, res, next) => {
  res.render('index');
})

app.get('/get-user-info', (req, res) => {
  res.render('user-info-form');
});

app.get('/display-user-info', (req, res) => {
  const {name, age, superhero} = req.query;

  //Above is ES6 sysntax to simplify code
  // let name      = req.query.name;
  // let age       = req.query.age;
  // let superhero = req.query.superhero;

  res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
  `)
});

app.get('/login', (req, res) => {
  res.render('login')
});

// app.post('/login', (req, res) => {
//   res.send('You\'ve logged in!');
// });
//Above was comment out so that I can see the information from the form



//req.body method is used to send the data to the server
app.post('/login', (req, res) => {
  res.send(req.body);
});

app.post('/login', (req, res) => {
  const {email, password} = req.body


  //we use ES6 syntax above to simplify code
  // let email    = req.body.email;
  // let password = req.body.password;


  // if (email === "nicolascastro@me.com" && password === "password"){
  //   res.send("Welcome")
  // } else {
  //   res.send("Go Away")
  // }
  

  //without req.body the data just displays on the browser without sending it to the server----see line 69 to send to server
  res.send(`Email: ${email}, Password: ${password}`);
});

app.get('/test', (req, res) => {
  let mySecret = req.secretValue;
  res.send(mySecret);
});



app.get('/', function (req, res) {
  console.log(req);
})


app.listen(3000, () => console.log('App listening on port 3000!👀'))