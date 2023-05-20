const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
// const { utilisateurs } = require("./data/data");
const session = require("express-session");
const bcrypt = require("bcrypt");
const data = require("./data/data");

require("dotenv").config();

const app = express();
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const utilisateurs = data.get_all_users();

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

app.engine("html", ejs.__express);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  const { idUtilisateur } = req.session;
  if (idUtilisateur) {
    res.locals.utilisateur = utilisateurs.find(
      (utilisateur) => utilisateur.id === idUtilisateur
    );
  }
  next();
});

app.get("/", (req, res) => {
  console.log(utilisateurs);
  const { utilisateur } = res.locals;
  res.render("index", { utilisateur });
});

app.get("/connexion", (req, res) => {
  res.render("connexion");
});
app.post("/connexion", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const utilisateur = utilisateurs
      .find((utilisateur) => utilisateur.email === email);
    if (utilisateur) {
      const validPassWord = password === utilisateur.password; //attention triple egale
      if (validPassWord) {
        req.session.idUtilisateur = utilisateur.id;
        return res.render("index", {utilisateur});
      } else {
        console.log("Mot de passe incorrect");
      }
    } else {
      console.log("Utilisateur n'existe pas");
    }
  }
  res.redirect("/connexion");
});
app.get("/inscription", (req, res) => {
  res.render("inscription");
});
app.post("/inscription", async (req, res) => {
  const { nom, email, password } = req.body;
  console.log(nom, email, password);
  if (nom && email && password) {
    const utilisateur = utilisateurs.some(
      (utilisateur) => utilisateur.email === email
    );
    if (!utilisateur) {
      // const salt = await bcrypt.genSalt(10);
      // const pwToSave = await bcrypt.hash(password,salt);
      let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        nom,
        email,
        password,
        test : 0,
        nbEtape,
      };
      data.add_user(nouvelUtilisateur);
      req.session.idUtilisateur = nouvelUtilisateur.id;
      return res.render("index", {utilisateur : nouvelUtilisateur});
    }
    else {
      console.log("Email déjà utilisé");
    }
  }
  res.redirect("/inscription");
});


app.post("/deconnexion", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

app.listen(4001);
console.log("L'application tourne au port 4001");
