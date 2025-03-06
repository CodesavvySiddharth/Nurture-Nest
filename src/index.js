const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer'); // Import nodemailer module
const app = express();


const hbs = require("hbs");
const Appointment = require("./models/appointment");
require("./db/conn");

const port = process.env.PORT || 3001;
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const baseUrl = "/NurtureNest";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(baseUrl, express.static(static_path));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get(`${baseUrl}/`, (req, res) => {
    res.render("index");
});

app.post(`${baseUrl}/appointment`, async (req, res) => {
    try {
        const { name,number,email,time,messages} = req.body;

        // Validate email and password here
        if (!number || !email) {
            return res.status(400).send("number and email is required");
        }

        const AppointmentEmployee = new Appointment({
            name,
            number,
            email,
            time,
            messages,
        });

        const registered =await AppointmentEmployee.save();
        res.status(201).render("index");
    }
 catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

// Route for handling subscription requests
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:  '', // Your Gmail address
        pass: '' // Your Gmail password
      }
    });

    const mailOptions = {
      from: '',
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending confirmation email');
      } else {
        console.log('Email sent:', info.response);
        res.sendStatus(200); // Subscription successful
      }
    });
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}${baseUrl}`);
});
