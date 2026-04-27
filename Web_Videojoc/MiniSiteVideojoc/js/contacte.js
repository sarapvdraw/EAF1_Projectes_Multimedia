const formulari = document.getElementById("formulari-contacte");
const errorsDiv = document.getElementById("errors-formulari");

formulari.addEventListener("submit", function (event) {

    event.preventDefault();

    const nom = document.getElementById("nom");
    const correu = document.getElementById("correu");
    const missatge = document.getElementById("missatge");

    let errors = [];

    // limpiar errores anteriores
    errorsDiv.innerHTML = "";
    nom.classList.remove("input-error");
    correu.classList.remove("input-error");
    missatge.classList.remove("input-error");

    if (nom.value.trim() === "") {
        errors.push("El camp Nom és obligatori.");
        nom.classList.add("input-error");
    }

    if (correu.value.trim() === "") {
        errors.push("El camp Correu electrònic és obligatori.");
        correu.classList.add("input-error");
    } else if (!validarCorreu(correu.value)) {
        errors.push("Introdueix un correu electrònic vàlid.");
        correu.classList.add("input-error");
    }

    if (missatge.value.trim() === "") {
        errors.push("El camp Missatge és obligatori.");
        missatge.classList.add("input-error");
    }

    if (errors.length > 0) {

        let llista = "<ul>";

        errors.forEach(function(error) {
            llista += "<li>" + error + "</li>";
        });

        llista += "</ul>";

        errorsDiv.innerHTML = llista;

    } else {

        errorsDiv.innerHTML = "<p style='color:green'>Missatge enviat correctament!</p>";
        formulari.reset();
    }

});

function validarCorreu(correu) {
    const patro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patro.test(correu);
}