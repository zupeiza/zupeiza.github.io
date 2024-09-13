/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            //navbarCollapsible.classList.remove('navbar-shrink')
            navbarCollapsible.classList.remove('scrolled-down')
            navbarCollapsible.classList.add('scrolled-up')
        } else {
            //navbarCollapsible.classList.add('navbar-shrink')
            navbarCollapsible.classList.add('scrolled-down')
            navbarCollapsible.classList.remove('scrolled-up')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -200%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


const input = document.querySelector("#telefono");
window.intlTelInput(input, {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.4.0/build/js/utils.js",
    separateDialCode: true,
    onlyCountries: ["es", "ie", "de", "se","gb"],
    initialCountry: "es", 
    i18n: {
    // Country names - see the full list in src/js/intl-tel-input/i18n/en/countries.ts
    es: "España",
    ie: "Irland",
    de: "Deutschland",
    nl: "Nederland",
    gb: "Great Britain",
    // Aria label for the selected country element
    selectedCountryAriaLabel: "Selected country",
    // Screen reader text for when no country is selected
    noCountrySelected: "No country selected",
    // Aria label for the country list element
    countryListAriaLabel: "List of countries",
    // Placeholder for the search input in the dropdown
    searchPlaceholder: "Search",
    // Screen reader text for when the search produces no results
    zeroSearchResults: "No results found",
    // Screen reader text for when the search produces 1 result
    oneSearchResult: "1 result found",
    // Screen reader text for when the search produces multiple results
    multipleSearchResults: "${count} results found",
}
});


window.addEventListener("load", function() {
    const formenviar = document.getElementById('form-enviar');
    formenviar.addEventListener("submit", function(e) {
        e.preventDefault();
        let ready = true;
        var formsIdArray = [];
        var numEnviosOk = 0;
        document.getElementById('fullNumber').value = document.querySelector(".iti__selected-dial-code").innerHTML;
        document.getElementById('message').value = document.getElementById('message-label').value

        const forms = document.querySelectorAll('.a-validar');
        Array.from(forms)
        .forEach(function (form) {
            console.log(form.id);
            console.log(form.id + form.checkValidity());
            formsIdArray.push(form.id);
            if (!form.checkValidity() && (ready == true)) {
                ready = false;
                alert('El formulario '+form.id+' está incompleto');
            };
        }); //foreach
        console.log("Pulsado");
        console.log(ready);
        if(ready==true) {
            var arrayLength = formsIdArray.length;
            for (var i = 0; i < arrayLength; i++) {
                const f = document.getElementById(formsIdArray[i]);
                const data = new FormData(f);
                const value = Object.fromEntries(data.entries());
                console.log(value);

                const action = e.target.action;
            
                fetch(action, {
                    method: 'POST',
                    body: data,
                })
                .then(response => {
                    console.log(response);
                    if (response.ok){
                        numEnviosOk++;
                    }
                    if (numEnviosOk == arrayLength){
                        const formdiv = document.getElementById('formularios');
                        formdiv.innerHTML = `
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            <div data-i18n="gracias-respuesta"></div>
                            </div>`;
                    }
                })
                .catch(error => {
                    formenviar.insertAdjacentHTML('afterend',`<div class="alert alert-warning d-flex align-items-center" role="alert">
                        <div data-i18n="fallo-respuesta"></div>
                        </div>`);
                    console.log(error);
                })
            }
        }
    });
});

function showfield(check,field){
    let fieldToHideShow = document.body.querySelector('#'+field);
    if(check === "Sí" || check){
        fieldToHideShow.hidden = false;
    }
    else if(check === "No" || !check){
        fieldToHideShow.hidden = true;
    }
    fieldToHideShow.querySelectorAll('.form-control').forEach(function(el) {
        el.required = el.checkVisibility();
    });

}

function vieneSecondForm(rvsp,formid) {
    showfield(rvsp,formid);

    var tel = document.getElementById('telefono');
    
    if(rvsp) {
        console.log(formid + ' ' + tel.value);
        console.log(formid + ' ' + document.querySelector(".iti__selected-dial-code").innerHTML);
        document.getElementById('telefono-'+formid).value = tel.value;
        document.getElementById('fullNumber-'+formid).value = document.querySelector(".iti__selected-dial-code").innerHTML;
        document.getElementById(formid).classList.add("a-validar");
    }
    else {
        document.getElementById('telefono-'+formid).value = '';
        document.getElementById('fullNumber-'+formid).value = '';
        document.getElementById(formid).classList.remove("a-validar");
    }
}


function vienennenos(rvsp) {
    showfield(rvsp,'nenos');
    console.log(document.querySelectorAll('.neno'));
    document.querySelectorAll('.neno').forEach(function(form) {
        vieneSecondForm(rvsp,form.id);
    });
    console.log(localStorage);
}

function vienes(rvsp) {
    document.body.querySelectorAll('.vienes').forEach(function(el) {
        el.hidden = !rvsp;
    })
    showfield(!rvsp,'novienes');
}

function addneno() {
    num_nenos = document.getElementsByClassName("neno").length;
    const divEle = document.getElementById("form-neno"+num_nenos);
    
    if (num_nenos<4){
        var html_formneno = `
                <form action="https://script.google.com/macros/s/AKfycbxcYwJPa3vsAjCMhJ3WciSJngjoqNnsDjUJ8SEe7MmVCtUgxN3lqDVHEck-aq_gCU4ARQ/exec" class="m-auto a-validar neno" style="max-width:600px" id="form-neno` + (num_nenos+1) + `" method="POST">
                    <div id="nenos-rows">
                        <div class="mb-3 row" id="neno` + (num_nenos+1) + `">
                            <div class="col" data-i18n="placeholder-neno-nombre"></div>
                            <div class="col" data-i18n="placeholder-neno-edad"></div>
                        </div>
                        <div class="form-group mb-3 row"><label class="col-md-5 col-form-label"></label>
                            <div class="col-md-7 form-check">
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="flexSwitchCheckDefault" data-i18n="alergenos"></label>
                                    <input class="form-check-input" type="checkbox" role="switch" value="alergia" id="flexSwitchCheckDefault" onclick="showfield(this.checked,'alergenos-neno` + (num_nenos+1) + `-input');">
                                </div>
                                <div id="alergenos-neno` + (num_nenos+1) + `-input" hidden data-i18n="placeholder-alergenos"></div>
                            </div>
                        </div>        

                    </div>
                            <input type="text" class="form-control" id="telefono-form-neno` + (num_nenos+1) + `" name="Telefono" hidden>
                            <input id="fullNumber-form-neno` + (num_nenos+1) + `" type="text" name="TelefonoCompleto" hidden>

                </form>`
        divEle.insertAdjacentHTML('afterend',html_formneno);
    }
    vienennenos(true);
    
}

function removeneno(){
    num_nenos = document.getElementsByClassName("neno").length;
    if (num_nenos>1){
        const divEle = document.getElementById("form-neno"+num_nenos);
        showfield(false,"form-neno"+num_nenos);
        divEle.remove();
    }
    vienennenos(true);
    
}
