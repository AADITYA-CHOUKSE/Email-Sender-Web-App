const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'hbs');


// ------------
require('dotenv').config()
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// -------------


// ---------------------------
// routing begains from here

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/send', (req, res) => {
    res.render('emailsend.hbs')
    // this display a email send successfully page 
    // with continue button whene you click that a another post method run '/' 
    // and that redirect to home page .

    // that is given below . 


})

app.post('/', (req, res) => {

    res.redirect('/')
    // it redirect to home page our main page .


})


app.get('*', (req, res) => {
    res.render("error.hbs")
})

// ----------------------------------------------
// as we click send our post /send will work so all js code we write in send method .

app.post('/send', (req, res) => {


    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.phone;
    let message = req.body.message;


    async function main() {



        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            service: "gmail",
            auth: {

                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // send mail with defined transport object

        let info = await transporter.sendMail({
            from: 'awesomeaditya052@gmail.com',
            to: `awesomeaditya18@gmail.com ,  ${req.body.email}`, // list of receivers , it is receving email
            // from input and sending to two people . working fine.
            subject: " Your Test Mail ",
            text: "Hello world?", // plain text body
            html: `
            <body>  
            
                <div style="border:2px solid Tomato;  background-color:powderblue;  text-align:center; text-transform: uppercase; "    className="email">
            
                    <h1 > Name :  ${name} </h1>
                    <h2> Email : ${email}  </h2>         

                    <h2> Phone : ${contact}  </h2>
                    <h2 style="background-color: yellow;" >Message : " ${message}" </h2>
            
                    <h3>This Email is a test mail , you are getting tha data which is enter by user .</h3>
                    <h2>Thankyou !</h2>
            
                    </div> 
            
                    
                
            </body>
            </html> `

        });



        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }

    main().catch(console.error);

    res.redirect('/send');
    // NOTE - THIS IS GET METHOD , IT REDIRECT to => ' /send '  WHICH IS OUR ROUTE , AND ROUTE IS ALWZ GET 
    // METHOD 

    // res.send("hello i am post send ,method") // for testing

    // MAIL CODE END  HERE 
})




// -----------------------------------------------
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
