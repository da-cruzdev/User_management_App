require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const conncetDB = require("./server/config/db");

const app = express();

const port = 4000 || process.env.PORT;
conncetDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash({ sessionKeyName: "flashMessage" }));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/customer"));

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listenning on port ${port}`);
});
