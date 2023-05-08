const bcrypt = require("bcrypt");

var defaultHashedPassword;
const utilisateurs = [];

(async () => {
  const salt = await bcrypt.genSalt(10);
  defaultHashedPassword = await bcrypt.hash("1234", salt);
  utilisateurs.push({
    id: 1,
    nom: "Louis Musole",
    email: "louis@drcmind.com",
    password: defaultHashedPassword,
  });
  utilisateurs.push({
    id: 2,
    nom: "Amani Bisimwa",
    email: "amani@drcmind.com",
    password: defaultHashedPassword,
  });
})();

module.exports = {
  utilisateurs,
};
