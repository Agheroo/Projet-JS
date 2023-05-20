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
  }
}

module.exports = data_public;











// const bcrypt = require("bcrypt");

// var defaultHashedPassword;
// const utilisateurs = [];

// (async () => {
//   const salt = await bcrypt.genSalt(10);
//   defaultHashedPassword = await bcrypt.hash("1234", salt);
//   utilisateurs.push({
//     id: 1,
//     nom: "Louis Musole",
//     email: "louis@drcmind.com",
//     password: defaultHashedPassword,
//   });
//   utilisateurs.push({
//     id: 2,
//     nom: "Amani Bisimwa",
//     email: "amani@drcmind.com",
//     password: defaultHashedPassword,
//   });
// })();

// module.exports = { utilisateurs };