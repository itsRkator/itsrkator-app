const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.use(cors());

app.get('/', (req, res) => {
    // res.send(`<p>Server is Running.</p>`)
    res.sendFile(__dirname + '/src/index.html');
})
app.post('/', (req, res) => {
    console.log("Req.body", req.body);
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "rohitashkator9549038757@gmail.com",
            pass: "enaeummiixrbtpts"
        }
    });

    const mailOptions = {
        from: `${req.body.name} <${req.body.email}>`,
        to: 'itsrkator@gmail.com',
        subject: `Message from ${req.body.name}(${req.body.email}): ${req.body.subject}`,
        text: req.body.message
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('error');
        } else {
            console.log("Email send: " + info.response)
            res.send("Success");
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
