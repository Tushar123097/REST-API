const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4} = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view")); // folder name is "view"

app.use(express.static(path.join(__dirname, "public"))); // for CSS etc.

let posts = [
    {
        id: uuidv4(),
        
        username: "apnacollege",
        content: "Love hone laga hai tumse coding",
    },
    {
        id: uuidv4(),
        username: "adver",
        content: "I got selected for the internship",
    },
    {
        id: uuidv4(),
        username: "loren",
        content: "I got selected for placement before my 8th sem",
    },
];

// Home redirects to all posts
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// GET: Show all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// GET: Show form to create new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// POST: Handle form submission
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ username, content });
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
