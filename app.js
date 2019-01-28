const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function (){
  console.log("server is running on port 3000")
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

const data = {
  members: [
    {email_address: email,
     status: "subscribed",
     merge_fields: {
       FNAME: firstName,
       LNAME: lastName
     }
   }
  ]
};
const jsonData =  JSON.stringify(data);

  const options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/enter you listid here',
    method: "POST",
    headers : {
      "Authorization": "anystring enter your apikey here"
    },
    body: jsonData,
  }

  request(options, function(error, response, body){
    if(error) {
      res.sendFile(__dirname + "/failure.html")
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  })
})

app.post("/failure", function(req,res){
  res.redirect("/");
});


