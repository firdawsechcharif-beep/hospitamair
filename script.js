// --- Code de connexion (Garde ton code existant ici) ---
window.onload = function() {
    let code = prompt("Veuillez saisir le code d'ouverture de Hospitamaire :");
    if (code === "admin123") {
        alert("Code correct !");
        document.getElementById("site-content").style.display = "block";
        // Si on est sur la page admin, on affiche les RDV
        if(document.getElementById("liste-rendezvous")) {
            afficherLesRendezVous();
        }
    } else {
        alert("Code incorrect !");
        window.location.reload();
    }
};

// --- NOUVEAU CODE : Enregistrer le rendez-vous ---
const form = document.getElementById('appointment-form');
if(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Récupérer les valeurs tapées par le patient
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        
        // Créer un objet Rendez-vous
        const nouveauRDV = { nom: name, email: email, date: date };
        
        // Récupérer les anciens RDV déjà enregistrés (ou créer une liste vide s'il n'y en a pas)
        let rdvExistants = JSON.parse(localStorage.getItem('lesRendezVous')) || [];
        
        // Ajouter le nouveau RDV à la liste
        rdvExistants.push(nouveauRDV);
        
        // Sauvegarder la liste mise à jour dans la mémoire du navigateur
        localStorage.setItem('lesRendezVous', JSON.stringify(rdvExistants));
        
        alert(`Merci ${name} ! Votre rendez-vous est enregistré.`);
        this.reset();
    });
}

// --- NOUVEAU CODE : Afficher les rendez-vous sur la page admin ---
function afficherLesRendezVous() {
    const listeConteneur = document.getElementById('liste-rendezvous');
    let rdvExistants = JSON.parse(localStorage.getItem('lesRendezVous')) || [];
    
    if(rdvExistants.length === 0) {
        listeConteneur.innerHTML = "<p>Aucun rendez-vous pour le moment.</p>";
        return;
    }
    
    // Vider le conteneur avant d'afficher
    listeConteneur.innerHTML = "";
    
    // Construire le tableau des rendez-vous
    rdvExistants.forEach(function(rdv) {
        listeConteneur.innerHTML += `
            <div style="background: #fff; padding: 15px; margin-bottom: 10px; border-radius: 5px; border-left: 5px solid #0056b3;">
                <strong>Patient :</strong> ${rdv.nom} <br>
                <strong>Email :</strong> ${rdv.email} <br>
                <strong>Date :</strong> ${rdv.date}
            </div>
        `;
    });
}