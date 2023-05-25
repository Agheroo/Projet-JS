const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const data = require("./data/data");
let utilisateurs = data.get_all_users();





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

app.engine("ejs", ejs.__express);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.get("/", (req, res) => {
  console.log(utilisateurs);
  utilisateurs = data.get_all_users();
  const { utilisateur } = res.locals;
  res.render("pages/index", { utilisateur });
});

app.get("/login", (req, res) => {
  const { utilisateur } = res.locals;
  res.render("pages/login", { utilisateur });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const utilisateur = utilisateurs
      .find((utilisateur) => utilisateur.email === email);
    if (utilisateur) {
      const validPassWord = password === utilisateur.password; //attention triple egale
      if (validPassWord) {
        req.session.idUtilisateur = utilisateur.id;
        if (utilisateur.testDone == true) {
          return res.render("pages/profile", { utilisateur });
        }
        else {
          return res.render("pages/test", { utilisateur });
        }
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
  // const { utilisateur } = res.locals;
  res.render("pages/register"/*, { utilisateur }*/);
});
app.post("/register", async (req, res) => {
  const { nom, email, password } = req.body;
  console.log(nom, email, password);
  if (nom && email && password) {
    const utilisateur = utilisateurs.some(
      (utilisateur) => utilisateur.email === email
    );
    if (!utilisateur) {
      let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        nom,
        email,
        password,
        testDone: false,
        nbEtape: 0,
        info: [],
      };
      data.add_user(nouvelUtilisateur);
      utilisateurs = data.get_all_users();
      req.session.idUtilisateur = nouvelUtilisateur.id;
      return res.render("pages/test", { utilisateur: nouvelUtilisateur });
    }
    else {
      console.log("Email déjà utilisé");
    }
  }
  res.redirect("/register");
});


app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

// When user is connecte
app.get("/test", (req, res) => { // Page qui récupère les informations pour une inscription
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/test", { utilisateur: utilisateur });
});
app.post("/test", async (req, res) => {
  let tab_info = [req.session.idUtilisateur, req.body];
  data.edit_user(tab_info);
  res.redirect("/test");
});

app.get("/profile", (req, res) => {
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/profile", { utilisateur: utilisateur });


});
app.get("/results", (req, res) => {
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/results", { utilisateur: utilisateur });
});
app.get("/goals", (req, res) => {
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/goals", { utilisateur: utilisateur });
});




//  Work in progress (bonus if we can do it)
app.get("/informations", (req, res) => {
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/informations", { utilisateur: utilisateur });
});
app.get("/contact", (req, res) => {
  const { utilisateur } = res.locals;
  utilisateurs = data.get_all_users();
  res.render("pages/contact", { utilisateur: utilisateur });
});

app.listen(4001);
console.log("L'application tourne au port 4001");