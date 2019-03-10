const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');  // const Post => mongoose Post data Model.
const app = express();

/*-----Connection to Database-------*/
mongoose.connect("mongodb+srv://kunalkk93:lFHFXbyS5D1zZRHq@meancluster1-ihwlj.mongodb.net/node-angular?retryWrites=true")
.then(()=> {
  console.log('Connected to Database!');
})
.catch(() => {
console.log('Error in Connection!');
});
/*----------------------------------*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
next();
});

//app.post() --> Method for inserting data to database. Available due to Express.js.
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content });
  post.save().then(ResponseId => {
      res.status(201).json({
        message: 'Post added succesfully',
        postId: ResponseId._id
      });
    });                               //post.save()--> This method adds Data to the MongoDB
});


// app.get() --> Method for retreiving data from database. Available due to Express.js.
app.get("/api/posts",(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts Fetched Succesfully!',
      posts: documents
    });
  });
});

/*---------------------------------VERY IPORTANT NOTE----------------------------------*/
// mongoose by default takes singular model names(MODEL -> Post) and pairs them with a collection named with the plural of that,
// so mongoose is AUTOMATICALLY looking in the db for a collection called "Posts". Beacuse, we have a model called -> 'Post'
// And hence, with the method Post.find(), we can retreive data from database.

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Deleted Succesfully!'});
  });
});

// _id is used because, in database, the id is stored like _id.
// req.params.id --> params a property of Node.js/express.js which allows US to access to all ENCODED PARAMETERS.
// ENCODED PARAMETERS --> like the paramter id in: /api/posts/:id <--

module.exports = app;
