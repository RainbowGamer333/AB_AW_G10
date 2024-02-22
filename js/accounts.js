//account.js

export let accounts = [
    {
        username: "Rainbow",
        password: "test",
        mail: "mike.litoris@gmail.com",
        image: "",
        role: "admin",

        demineur: {
            difficulte: {
                facile: {
                    score: 0
                },
                moyen: {
                    score: 0
                },
                difficile: {
                    score: 0
                }
            }
        },

        clicker: {
            score: 100,
            pieces: 100,

            achievements: [
                {
                    name: "Apprenti cliqueur",
                    description: "Découvrez 1 image",
                    obtained: false
                },
                {
                    name: "Cliqueur confirmé",
                    description: "Découvrez 5 images",
                    obtained: false
                },
                {
                    name: "Cliqueur expert",
                    description: "Découvrez 10 images",
                    obtained: false
                },
                {
                    name: "Détective privé ou quoi ?",
                    description: "Trouver 5 easter eggs",
                    obtained: false
                },
                {
                    name: "Artiste sous LSD",
                    description: "Changez la couleur de fond",
                    obtained: false
                },
                {
                    name: "Contrat de footballeur",
                    description: "Obtenir 1 million de pièces",
                    obtained: false
                },
                {
                    name: "Jeff Bezos",
                    description: "Obtenir 1 milliard de pièces",
                    obtained: false
                },
                {
                    name: "Fou furieux",
                    description: "Effectuer 10k cliques sans dépenser de pièces",
                    obtained: false
                }

            ]
        },

        towerDefense: {
            score: 0,
        }
    },
];

function createAccount(username, password, mail) {
    let account = {
        username: username,
        password: password,
        mail: mail,
        //TODO: generer image aleatoire
        image: "",
        role: "user",

        demineur: initialiseDemineur(),
        clicker: initialiseClicker(),
        towerDefense: initialiseTowerDefense()
    }
    return account;
}

/**
 * Retire tous les comptes sauf le compte admin
 */
function clearAccounts() {
    localStorage.removeItem("accounts");
    localStorage.setItem("accounts", JSON.stringify(admin));
}



function initialiseDemineur() {
    return {
        difficulte: {
            facile: {
                score: 0
            },
            moyen: {
                score: 0
            },
            difficile: {
                score: 0
            }
        },
        achievements: initialiseDemineurAchievements()
    }
}

function initialiseDemineurAchievements() {
    return null;
}


function initialiseClicker() {
    return {
        score: 0,
        pieces: 0,
        achievements: initialiseClickerAchievements()
    }
}

function initialiseClickerAchievements() {
    return [
        {
            name: "Apprenti cliqueur",
            description: "Découvrez 1 image",
            obtained: false
        },
        {
            name: "Cliqueur confirmé",
            description: "Découvrez 5 images",
            obtained: false
        },
        {
            name: "Cliqueur expert",
            description: "Découvrez 10 images",
            obtained: false
        },
        {
            name: "Détective privé ou quoi ?",
            description: "Trouver 5 easter eggs",
            obtained: false
        },
        {
            name: "Artiste sous LSD",
            description: "Changez la couleur de fond",
            obtained: false
        },
        {
            name: "Contrat de footballeur",
            description: "Obtenir 1 million de pièces",
            obtained: false
        },
        {
            name: "Jeff Bezos",
            description: "Obtenir 1 milliard de pièces",
            obtained: false
        }
    ]
}

function initialiseTowerDefense() {
    return {
        score: 0,
        achievements: initialiseTowerDefenseAchievements()
    }
}

function initialiseTowerDefenseAchievements() {
    return null;
}
