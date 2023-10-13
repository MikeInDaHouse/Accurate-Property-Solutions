const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const helmet = require('helmet');





const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({ contentSecurityPolicy: false }));



const fontSrcUrls = [
  "https://use.typekit.net/qmu8ili.css"
];

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["self"],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://images.unsplash.com/",
      
          ],
          fontSrc: ["'self'", ...fontSrcUrls]
      },
  })
);




 
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);



app.get('/', (req, res) => {
    res.render('home')
})


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.post('/subscribe', (req, res) => {
 
    const { email } = req.body;
  
    // Make sure fields are filled
    if (!email) {
      res.redirect('error');
      return;
    }
  
    // Construct req data
    const data = {
      members: [
        {
          email_address: email,
          status: 'subscribed',
          }
      ]
    };
  
    const postData = JSON.stringify(data);
  
    fetch('https://us21.api.mailchimp.com/3.0/lists/5375ffd500', {
      method: 'POST',
      headers: {
        Authorization: 'auth 687a049ac95548280fa2cc44bdf4bf99-us21'
      },
      body: postData
    })
      .then(res.statusCode === 200 ?
        res.redirect('success') :
        res.redirect('error'))
      .catch(err => console.log(err))

  })
  



app.get('/success', (req, res) => {
    res.render('success')
})

app.post('/error', (req, res) => {
   res.render('error')
})


app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.get('*', (req, res) => {
    res.send('Error!')
})