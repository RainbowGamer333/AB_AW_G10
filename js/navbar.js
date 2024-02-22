// Fonction pour mettre à jour l'image de profil dans la barre de navigation
function updateProfileImageInNavbar() {
    const storedProfileImageUrl = getStoredProfileImage();
    if (storedProfileImageUrl) {
        const profileImageElement = document.getElementById("account");
        if (profileImageElement) {
            profileImageElement.style.backgroundImage = `url('${storedProfileImageUrl}')`;
        } else {
            console.log("Element with id 'account' not found.");
        }
    }
}

// Appeler la fonction pour mettre à jour l'image de profil dans la barre de navigation
updateProfileImageInNavbar();
