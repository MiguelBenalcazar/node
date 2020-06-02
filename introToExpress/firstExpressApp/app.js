var express = require("express");
//inizialize the express
var app = express();
const port = 3000;

// "/" => "Hi there!"  GET request
app.get('/', function(request, response){

    response.send('Hi there');

});

app.get("/bye", function(request, response){
    response.send("Goodbye!!");

});

app.get("/dog", function(request, response){
    console.log("SOMEONE MADE A REQUEST");
    response.send("MEOW!!");

});

//TEMPLATE  /r/soccer  /r/golf
app.get("/r/:subredditName", function(request, response){
    console.log(request.params);
    var subreddit = request.params.subredditName;
    response.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");

});

//all variables start with :
app.get("/r/:subredditName/comments/:id/:title/", function(request, response){
    console.log(request.params);
    
    response.send("WELCOME TO A COMMENTS PAGE");

});

app.get("*", function(request, response){
    response.send("YOU ARE START!!!");

});


//Tell the express to listen for any request (start server)
/*app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});*/
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))