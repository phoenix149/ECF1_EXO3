// Je récupère mes éléments HTML par leurs IDs
let form = document.getElementById('form');
let nom = document.getElementById('nom');
let pNom = document.getElementById('pNom');
let date = document.getElementById('date');
let email = document.getElementById('email');
let code = document.getElementById('code');
let btnSend = document.getElementById('send');
let btnReset = document.getElementById('reset');
let nameT = document.getElementById('nameT');
let pNameT = document.getElementById('pNameT');
let emailT = document.getElementById('emailT');
let codeT = document.getElementById('codeT');
let erreurFT = document.getElementById('erreurFT');

// Je récupérer les éléments de mon Modal
let modal = new bootstrap.Modal(document.getElementById('detailsModal'));
let modalTitle = document.getElementById('modalTitle');
let modalP1 = document.getElementById('modalP1');
let modalP2 = document.getElementById('modalP2');
let close = document.getElementById('close');
let endModal = document.getElementById('endModal');

// Je définis les expressions régulières qui serviront de filtre pour la date et le code 
const dateFilter = /^\d{2}\/\d{2}\/\d{4}$/;
const codeFilter = /^FR\d{5}[A-Z._-]{3}x$/;

// Je définis les variables d'erreur pour les champs du formulaire
let errorNom;
let errorPNom;
let errorDate;
let errorEmail;
let errorCode;

// J'ajoute un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', function(event) {
    verificationTotale(event); // J'appelle la fonction verificationTotale lorsque le formulaire est soumis
});

// J'ajoute un écouteur d'événement pour vérifier le nom au clic sur le champ prénom 
// pNom.addEventListener('click', function () {
//     verifName(nom);
// })

// J'ajoute un écouteur d'événement pour réinitialiser le formulaire et la console au clic sur btnReset
btnReset.addEventListener('click', function () {
    nomT.textContent = "";
    pNomT.textContent = "";
    dateT.textContent = "";
    emailT.textContent = "";
    codeT.textContent = "";
    erreurFT.textContent= "";
    console.clear();

})
// J'ajoute un écouteur d'événement pour vérifier le nom au changement dans le champ nom
nom.addEventListener('change', function () {
    verifName(nom)
});


// J'ajoute un écouteur d'événement pour vérifier le prénom au changement dans le champ prénom
pNom.addEventListener('change', function () {
    verifFirstName(pNom);
})

// J'ajoute un écouteur d'événement pour formater la date au changement dans le champ date
date.addEventListener('change', function () {
    date.value = date.value.replace(/[- ,._]/g, "/");// Je remplace les caractères spéciaux par des slashes
    verifName(nom);
    verifFirstName(pNom);

})
// J'ajoute un écouteur d'événement pour vérifier tous les champs au clic sur le champ code
// code.addEventListener('click', function(){
//     verifName(nom);
//     verifFirstName(pNom);
//     verifDate(date.value);
//     verifMail(email.value);
// })

// J'ajoute un écouteur d'événement pour vérifier la date au clic sur le champ email
// email.addEventListener('click', function () {
//     verifDate(date.value);
// });
// J'ajoute un écouteur d'événement pour vérifier le code au changement dans le champ code
// code.addEventListener('change', function (){
//     verifCode(code.value);
// })
close.addEventListener('click',function (){
    form.submit();
})
endModal.addEventListener('click',function (){
    form.submit();
})

// Fonction pour vérifier si une date est valide
function estDateValide(_jours, _mois, _annees) {
    // Vérification du mois
    if (_mois < 1 || _mois > 12) {
        return false;
    }

    // Déterminer le nombre de jours dans le mois
    let joursParMois;
    if (_mois === 2) {
        // Février, avec gestion des années bissextiles
        if (estBissextile(_annees)) {
            joursParMois = 29;
        } else {
            joursParMois = 28;
        }
    } else if (_mois === 4 || _mois === 6 || _mois === 9 || _mois === 11) {
        // Mois d'avril, juin, septembre et novembre
        joursParMois = 30;
    } else {
        // Tous les autres mois
        joursParMois = 31;
    }

    // Vérification du jour
    if (_jours >= 1 && _jours <= joursParMois) {
        return true;
    } else {
        return false;
    }
}
// Fonction pour vérifier si une année est bissextile
function estBissextile(_annees) {
    // Une année est bissextile si elle est divisible par 4
    // mais pas par 100, sauf si elle est divisible par 400
    if ((_annees % 4 === 0 && _annees % 100 !== 0) || (_annees % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}
// Fonction pour vérifier tous les champs du formulaire
function verificationTotale(event) {
    event.preventDefault(); //J'empêche le formulaire de s'envoyer
    let countError = 0;
    verifName(nom);
    verifFirstName(pNom);
    verifDate(date.value);
    verifMail(email.value);
    verifCode(code.value);
    
    // Je compte les erreurs
    if (errorNom == true) {
        countError++;
    }
    if (errorPNom == true) {
        countError++;
    }
    if (errorDate == true) {
        countError++;
    }
    if (errorEmail == true) {
        countError++;
    }
    if (errorCode == true) {
        countError++;
    }
    // J'envoie le formulaire s'il n'y a pas d'erreur mais avant je lance une modal pour informer le client
    if (countError=== 0 && errorNom== false && errorPNom == false && errorDate == false && errorEmail == false && errorCode == false) {
        erreurFT.textContent="";
        modalTitle.textContent = "Formulaire Bancaire";
        modalP1.textContent = "Vos données sont valides elles vont être transmises sur nos serveurs pour traitement.";
        modalP2.textContent = "Nous sommes ravis de vous compter parmi nos nouveaux clients"
        modal.show(); // Ouvrir la modale Bootstrap pour indiquer que le formulaire est valide
        console.log("Tout est valide envoi des données...");
        // form.submit();
       

    }
    else if (countError>0) {
        erreurFT.textContent= "Vous avez "+countError+" erreurs dans le formulaire veuillez corriger avant de cliquer sur envoyer";
    }
    // J'affiche le nombre d'erreurs trouvées
    console.log("Nombre d'erreur après vérification finale: "+countError);

}
// Fonction pour vérifier le champ nom
function verifName(_nom) {
// Je supprime les caractères non alphabétiques
    nom.value = nom.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, "");

    if (nom.value === "") {
        // J'affiche un message d'erreur si le champ est vide
        nomT.textContent = "* Vous n'avez rien saisi cette information est obligatoire.";
        console.log("L'utilisateur n'a rien saisi dans le champ Nom");
        errorNom = true;
    }

    else if (nom.value.length < 3 && nom.value.length > 0) {
        // J'affiche un message d'erreur si le champ contient moins de 3 caractères
        nomT.textContent = "* Vous n'avez pas saisi un nombre de caractère suffisant. Le minimum est de 3 caractères.";
        console.log("L'utilisateur a saisi moins de 3 caractères dans le champ Nom");
        errorNom = true;

    }

    else {
        // Je retire les espaces et met en majuscules la valeur du champ nom
        nom.value = nom.value.trim();
        nom.value = nom.value.toUpperCase();
        nomT.textContent = "";
        console.log("Le Nom saisi est valide!");
        errorNom = false;
    }
    
}
// Fonction pour vérifier le champ prénom
function verifFirstName(_pNom) {
    pNom.value = pNom.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, "");

    if (pNom.value === "") {
        console.log("L'utilisateur n'a rien saisi dans le champ Prénom");
        pNomT.textContent = "* Vous n'avez rien saisi cette information est obligatoire.";
        errorPNom = true;

    }
    else if (pNom.value.length < 3 && pNom.value.length > 0) {
        console.log("L'utilisateur a saisi moins de 3 caractères dans le champ Prénom");
        pNomT.textContent = "* Vous n'avez pas saisi un nombre de caractère suffisant. Le minimum est de 3 caractères.";
        errorNom = true;

    }

    else {
        console.log("Le Prénom saisi est valide!");
        pNom.value = pNom.value.trim();
        pNom.value = pNom.value.charAt(0).toUpperCase() + pNom.value.slice(1).toLowerCase();
        pNomT.textContent = "";
        errorPNom = false;
    }

}
// Fonction pour vérifier le champ date 
function verifDate(_date) {
    date.value = date.value.replace(/[- ,._]/g, "/");
    if (dateFilter.test(_date)) {
        console.log("Date a passée la première vérification");
        let dateWithoutSlash = date.value.replace(/\//g, "");
        let jours = parseInt(dateWithoutSlash.substring(0, 2), 10);
        let mois = parseInt(dateWithoutSlash.substring(2, 4), 10);
        let annees = parseInt(dateWithoutSlash.substring(4), 10);

        if (estDateValide(jours, mois, annees) && annees > 1924 && annees < 2014) {
            dateT.textContent = "";
            console.log("La Date est valide !!")
            errorDate = false;
        }
        else {
            dateT.textContent = "* La date que vous avez saisie est invalide.";
            errorDate = true;
            console.log("mais elle ne passe malheureusement pas la deuxième vérification. Date invalide")
        }

    }
    else {
        dateT.textContent = "* Vous n'avez pas respecté le format jj/mm/aaaa";
        console.log("L'utilisateur n'a pas respecté le format du champ Date");
        errorDate = true;
    }
}
// Fonction pour vérifier le champ email
function verifMail(_email) {
    let e = _email;
    let emailFilter = /^[a-z0-9]*\.?[a-z0-9]*?[@][a-z]*\.[a-z]*/;
    if (email.value != "") { 
    if (emailFilter.test(e) == true) {
        console.log("Email valide !");
        emailT.textContent = "";
        errorEmail = false;
    }
    else {
        console.log("Email non valide !");
        emailT.textContent = "* L'email que vous avez saisi est invalide.";
        errorEmail = true;
    }
    }
    else {
        console.log("L'utilisateur n'a rien entré dans le champs du mail.");
        emailT.textContent = "* Vous n'avez rien saisi cette information est obligatoire.";
        errorEmail = true;
    }
}
// Fonction pour vérifier le champ code
function verifCode(_code) {
    // Je vérifie que le code n'est pas vide
    if(_code === "") {
        console.log("L'utilisateur n'a rien saisi dans le champ Code Confidentiel");
        codeT.textContent = "* Vous n'avez pas saisi de Code confidentiel, cette information est obligatoire."
        errorCode = true;
    }
    else {
        // Je vérifie si le code correspond au filtre
        if(codeFilter.test(_code)) {
            codeT.textContent = ""
            errorCode = false;
            console.log("Le code saisi est valide!");
        }
        else {
            codeT.textContent = "* Le code  que vous avez saisi est invalide."
            console.log("Le code saisi est invalide!");
            errorCode = true;
        }
    }
}