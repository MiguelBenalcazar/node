var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({

    title: String,
    image: String, 
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1587613990221-ac89fb1a1cf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     body: "HELLO THIS IS A BLOG POST"
// });

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs"); 
 });

app.get("/blogs", function(req, res){
    res.render("index");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
           res.render("index", {blogs: blogs}); 
        }
    });
 });



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));