const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { cours, utilisateurs } = require("./data");
const session = require("express-session");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const IN_PRODUCTION = process.env.NODE_ENV === "production";

app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      secure: IN_PRODUCTION,
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  const { idUtilisateur } = req.session;
  if (idUtilisateur) {
    res.locals.utilisateur = utilisateurs.find(
      (utilisateur) => utilisateur.id === idUtilisateur
    );
  }
  next();
});

app.engine("html", ejs.__express);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const { utilisateur } = res.locals;
  console.log(utilisateurs);
  res.render("pages/index", {
    cours, 
    utilisateur});
  console.log(utilisateur);
});
app.get("/login", (req, res) => {
  const { utilisateur } = res.locals;

  res.render("pages/login",{cours, utilisateur:utilisateur});
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    const utilisateur = utilisateurs
      .flat()
      .find((utilisateur) => utilisateur.email === email);
    if (utilisateur) {
      const validPassWord = await bcrypt.compare(
        password,
        utilisateur.password
      );
      if (validPassWord) {
        req.session.idUtilisateur = utilisateur.id;
        return res.redirect("/");
      } else {
        console.log("Mot de passe incorrect");
      }
    } else {
      console.log("Utilisateur n'existe pas");
    }
  }
  res.redirect("/login");
});
app.get("/register", (req, res) => {
  const { utilisateur } = res.locals;
  res.render("pages/register",{cours, utilisateur:utilisateur});
});
app.post("/register", async (req, res) => {
  const { nom, email, password } = req.body;
  console.log(nom, email, password);
  if (nom && email && password) {
    const utilisateur = utilisateurs.some(
      (utilisateur) => utilisateur.email === email
    );
    if (!utilisateur) {
      const salt = await bcrypt.genSalt(10);
      const passwordToSave = await bcrypt.hash(password, salt);

      let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        nom,
        email,
        password: passwordToSave,
      };
      utilisateurs.push(nouvelUtilisateur);
      req.session.idUtilisateur = nouvelUtilisateur.id;
      return res.redirect("/");
    }
  }
  res.redirect("/register");
});


/*  Work in progress (bonus if we can do it) */
app.get("/informations", (req, res) => {
  const { utilisateur } = res.locals;
  res.render("pages/informations",{cours, utilisateur:utilisateur});
});
app.get("/contact",(req,res) => {
  const { utilisateur } = res.locals;
  res.render("pages/contact",{cours, utilisateur:utilisateur});
});
/***************************************** */


/*When user is connected */
app.get("/profile" , (req,res) =>{
  const { utilisateur } = res.locals;
  res.render("pages/profile",{cours, utilisateur:utilisateur});
});
app.get("/sumup" ,(req,res) =>{
  const { utilisateur } = res.locals;
  res.render("pages/sumup",{cours, utilisateur:utilisateur});
});
app.get("/results" ,(req,res) =>{
  const { utilisateur } = res.locals;
  res.render("pages/results",{cours, utilisateur:utilisateur});
});
app.get("/goals" ,(req,res) =>{
  const { utilisateur } = res.locals;
  res.render("pages/goals",{cours, utilisateur:utilisateur});
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.redirect("/");
  });
});

app.listen(4001);
console.log("L'application tourne au port 4001");
