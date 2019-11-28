const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
	const MJ_API = process.env.MJ_APIKEY_PUBLIC;
	const MJ_SECRET = process.env.MJ_APIKEY_PRIVATE;
  const mailjet = require ('node-mailjet')
  .connect({MJ_API}, {MJ_SECRET})
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
  "Messages":[
    {
      "From": {
        "email": "milesmickelson87@gmail.com",
        "firstName": "Miles",
				"lastName": "Mickelson"
      },
      "To": [
        {
          "Email": "milesmickelson87@gmail.com",
          "Name": "Miles"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
  })
});

// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })
//   res.render('contact');
// });

// user.request((error, response, body) => {
// 	if (error)
// 		console.log (`Oops, something went wrong ${response.statusCode}`);
// 	else
// 		console.log (body);
// });

//   .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE, {
//     url: 'api.mailjet.com', // default is the API url
//     version: 'v3.1', // default is '/v3'
//     perform_api_call: true // used for tests. default is true
//   })

// // GET resource
// var user = Mailjet.get('user');
// // POST resource
// var sender = Mailjet.post('sender');
// user.request(function (error, response, body) {
//   if (error)
//     console.log ('Oops, something went wrong ' + response.statusCode);
//   else
//     console.log (body);
// });

// sender.request({ Email: 'mr@mailjet.com' })
//   .then(handleData)
//   .catch(handleError);

// var getContacts = Mailjet.get('contact');
// getContacts.request({Limit: 3}, handleContacts);
// getContacts.id(2).request(handleSingleContact)

// var postContact = Mailjet.post('contact');
// postContact.action('managemanycontacts').request({
//   ContactLists: MyContactListsArray,
//     Contacts: MyContactsArray,
// }, handlePostResponse)

// var sendEmail = Mailjet.post('send');
// var emailData = {
//     'FromEmail': 'milesmickelson87@gmail.com.com',
//     'FromName': 'Miles Mickelson',
//     'Subject': 'Test with the NodeJS Mailjet wrapper',
//     'Text-part': 'Hello NodeJs !',
//     'Recipients': [{'Email': 'roger@smith.com'}],
//     'Attachments': [{
//       "Content-Type": "text-plain",
//       "Filename": "test.txt",
//       "Content": "VGhpcyBpcyB5b3VyIGF0dGFjaGVkIGZpbGUhISEK", // Base64 for "This is your attached file!!!"
//     }]
// }
// sendEmail
//   .request(emailData)
//     .then(handlePostResponse)
//     .catch(handleError);

	// const data = {
	// 	contact: {
	// 		firstName: '',
	// 		lastName: '',
	// 		email: ''
	// 	}
	// }

app.post('/thankyou', (req, res) => {
  res.render('thankyou', { contact: req.body });
});

app.get('*', function( req, res){
  res.status(404).send('Sorry, no page was found at this address');
});

module.exports = app;
