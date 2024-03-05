// Fonction pour générer aléatoirement une image de profil
function generateRandomProfileImage() {
    const randomImageIndex = Math.floor(Math.random() * 5) + 1; // Génère un nombre aléatoire entre 1 et 5
    return `../asset/imagesProfil/image${randomImageIndex}.jpg`; // Remplacez ceci par le chemin réel de votre pool d'images
}

// Fonction pour mettre à jour le background de la div avec l'image générée aléatoirement
function updateProfileImageBackground(imageUrl) {
    const profileImageElement = document.getElementById("imageDeProfil");
    if (profileImageElement) {
        profileImageElement.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        console.log("Element with id 'imageDeProfil' not found.");
    }
}

// Gestionnaire d'événements pour le bouton de génération aléatoire d'image de profil
const randomizeProfileButton = document.getElementById("randomizeProfileButton");
if (randomizeProfileButton) {
    randomizeProfileButton.addEventListener("click", function() {
        const imageUrl = generateRandomProfileImage();
        updateProfileImageBackground(imageUrl);
        // Mettre à jour l'image de profil dans la navbar également
        updateProfileImageInNavbar(imageUrl);
    });
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


