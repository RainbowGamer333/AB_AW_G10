// profile.js

let generatedImages = []; // Historique des images déjà générées

// Fonction pour récupérer l'URL de l'image de profil stockée localement
function getStoredProfileImage() {
    return localStorage.getItem('profileImageUrl');
}

// Fonction pour enregistrer l'URL de l'image de profil dans le stockage local
function storeProfileImage(imageUrl) {
    localStorage.setItem('profileImageUrl', imageUrl);
}

// Fonction pour générer aléatoirement une image de profil unique
function generateUniqueProfileImage() {
    const poolSize = 5; // Taille du pool d'images
    let imageUrl = '';
    let attempts = 0;
    do {
        // Générer une nouvelle image de profil aléatoire
        const randomImageIndex = Math.floor(Math.random() * poolSize) + 1; // Génère un nombre aléatoire entre 1 et 5
        imageUrl = `../asset/imagesProfil/image${randomImageIndex}.jpg`; // Remplacez ceci par le chemin réel de votre pool d'images
        attempts++;
    } while (generatedImages.includes(imageUrl) && attempts < poolSize); // Vérifier si l'image a déjà été générée et limiter le nombre de tentatives
    if (attempts >= poolSize) {
        console.log("Toutes les images possibles ont été générées.");
        generatedImages = []; // Réinitialiser l'historique si toutes les images possibles ont été générées
        imageUrl = generateUniqueProfileImage(); // Générer une nouvelle image
    }
    generatedImages.push(imageUrl); // Ajouter l'image générée à l'historique
    return imageUrl;
}

// Fonction pour mettre à jour l'image de profil dans la barre de navigation
function updateProfileImageInNavbar(imageUrl) {
    const profileImageElement = document.getElementById("account");
    if (profileImageElement) {
        profileImageElement.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        console.log("Element with id 'account' not found.");
    }
}

// Fonction pour mettre à jour l'image de profil sur la page de profil
function updateProfileImageOnProfilePage(imageUrl) {
    const imageDeProfilElement = document.getElementById("imageDeProfil");
    if (imageDeProfilElement) {
        imageDeProfilElement.src = imageUrl;
    } else {
        console.log("Element with id 'imageDeProfil' not found.");
    }
}

// Générer une nouvelle image de profil au chargement de la page si aucune image n'est stockée localement
function generateProfileImageIfNotStored() {
    const storedProfileImageUrl = getStoredProfileImage();
    if (!storedProfileImageUrl) {
        const imageUrl = generateUniqueProfileImage();
        updateProfileImageInNavbar(imageUrl);
        updateProfileImageOnProfilePage(imageUrl);
        storeProfileImage(imageUrl);
    }
}

// Gestionnaire d'événements pour le bouton de génération aléatoire d'image de profil
const randomizeProfileButton = document.getElementById("randomizeProfileButton");
if (randomizeProfileButton) {
    randomizeProfileButton.addEventListener("click", function() {
        const imageUrl = generateUniqueProfileImage();
        updateProfileImageInNavbar(imageUrl);
        updateProfileImageOnProfilePage(imageUrl);
        storeProfileImage(imageUrl);
    });
}

// Mettre à jour l'image de profil dans la barre de navigation sur chaque page du site
updateProfileImageInNavbar();

// Mettre à jour l'image de profil sur la page de profil
const imageDeProfilElement = document.getElementById("imageDeProfil");
if (imageDeProfilElement) {
    const imageUrl = imageDeProfilElement.src;
    updateProfileImageOnProfilePage(imageUrl);
}
