/*  Importation des modules  */

const fs = require("fs");
const { get } = require("http");

const DATABASE = __dirname + "/bdd.json";
const get_last_index = users => Math.max(...users.map(user => user.id), 0);
const read_database_file = () => JSON.parse(fs.readFileSync(DATABASE, "utf8"));
const write_database_file = users => fs.writeFileSync(DATABASE, JSON.stringify(users), "utf8");

// Fonctions publiques

const data_public = {

  get_all_users: () => read_database_file(),

  get_one_user: id => {
    let users;

    // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
    try {
      users = read_database_file();
    } catch {
      console.error("Couldn't read from database");
      return false;
    }
    //edit user

    return users[id];

  },

  add_user: user => {
    let users;

    // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
    try {
      users = read_database_file();
    } catch {
      console.error("Couldn't read from database");
    }


    //ajoute l'utilisateur
    users.push(user);

    // écris les utilisateurs et renvoie faux s'il n'y arrive pas
    try {
      write_database_file(users);
    } catch {
      console.error("Couldn't write in database");
    }
  },

  edit_user: user => {

    let users;

    // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
    try {
      users = read_database_file();
    } catch {
      console.error("Couldn't read from database");
      return false;
    }
    //edit user

    // Ajout des clés dans info
    for (key in user[1]) {
      users[user[0] - 1].info[key] = user[1][key];
      if (key == "height") {
        let IMC = 10000 * parseInt(users[user[0] - 1]["info"]["weight"]) / (parseInt(users[user[0] - 1]["info"]["height"]) * parseInt(users[user[0] - 1]["info"]["height"]));
        let IMG = 1.2 * IMC  + 0.23 * parseInt(users[user[0] - 1]["info"]["age"]) - 10.8 * parseInt(users[user[0] - 1]["info"]["sex"]) - 5.4;
        console.log(IMC);
        users[user[0] - 1].info["IMG"] = IMG;
      }
    }

    users[user[0] - 1].info[key] = user[1][key]
    // Ajout d'une étpae à chaque fois
    users[user[0] - 1]["nbEtape"] += 1;

    if (users[user[0] - 1]["nbEtape"] == 5) {
      users[user[0] - 1]["testDone"] = true;
    }



    // écris les utilisateurs et renvoie faux s'il n'y arrive pas
    try {
      write_database_file(users);
    } catch {
      console.error("Couldn't write in database");
      return false;
    }

    return true;

  },

  remake_test: user => {

    let users;

    // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
    try {
      users = read_database_file();
    } catch {
      console.error("Couldn't read from database");
      return false;
    }
    //edit user


    // Remise à zero du nombre d'étape et du test
    users[user]["nbEtape"] = 0;
    users[user]["testDone"] = false;


    // écris les utilisateurs et renvoie faux s'il n'y arrive pas
    try {
      write_database_file(users);
    } catch {
      console.error("Couldn't write in database");
      return false;
    }

    return true;

  }
}

module.exports = data_public;