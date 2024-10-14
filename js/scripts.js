/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.onload = function () {
    var hasParam = window.location.href.indexOf('form=yes')
    //console.log(hasParam);
    if(hasParam != -1) {
        $('#form-modal').modal('show');
    }

};

/*function modalReopen() {
    window.location.href = window.location.href.replace('?form=yes','');
    console.log(window.location.href)
    location.reload();
}*/

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


const input = document.querySelector("#telefono-ppal");
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
        //document.getElementById('fullNumber').value = document.querySelector(".iti__selected-dial-code").innerHTML;
        //document.getElementById('message').value = document.getElementById('message-label').value

        const forms = document.querySelectorAll('.a-validar');
        Array.from(forms)
        .forEach(function (form) {
            //console.log(form.id);
            //console.log(form.id + form.checkValidity());
            formsIdArray.push(form.id);
            if (!form.checkValidity() && (ready == true)) {
                ready = false;
            };
        }); //foreach
        //console.log("Pulsado");
        //console.log(ready);
        if(ready==true) {
            loading(true);
            (document.querySelector('#validacion-ko')).classList.add("d-none");
            var arrayLength = formsIdArray.length;
            for (var i = 0; i < arrayLength; i++) {
                const f = document.getElementById(formsIdArray[i]);
                const data = new FormData(f);
                var tipo = formsIdArray[i].replace('form-','');
                data.append('Tipo',tipo);
                data.set('Telefono',document.querySelector(".iti__selected-dial-code").innerHTML.replace('+','')+document.getElementById('telefono-ppal').value.replaceAll(' ',''));
                if (tipo == 'principal') {
                    data.set('Comentarios',document.getElementById('comentarios').value);
                    data.set('Transporte',document.getElementById('transporte').value);
                }
                data.set('Idioma',localStorage.getItem('language') || 'es');
                data.set('Contrasena',document.getElementById('password').value);
                if (document.getElementById('asistencia_y').checked == true) {
                    data.set('Asistencia',"Si");
                } else {
                    data.set('Asistencia',"No");
                }
                

                const value = Object.fromEntries(data.entries());
                //console.log(value);

                const action = e.target.action;
            
                fetch(action, {
                    method: 'POST',
                    body: data,
                })
                .then(response => {
                    //console.log(response);
                    if (response.ok){
                        numEnviosOk++;
                    }
                    if (numEnviosOk == arrayLength){
                        //(document.querySelector('#formularios')).classList.add("d-none");
                        getData('saveok');
                        (document.querySelector('#form-ok')).classList.remove("d-none");
                        (document.querySelector('#form-ko')).classList.add("d-none");
                        loading(false);
                    }
                })
                .catch(error => {
                    loading(false);
                    //(document.querySelector('#formularios')).classList.add("d-none");
                    (document.querySelector('#form-ko')).classList.remove("d-none");
                    (document.querySelector('#form-ok')).classList.add("d-none");
                })
            }
        } else {
            (document.querySelector('#validacion-ko')).classList.remove("d-none");
        }
    });
});

function loading(proceso) {
    if (proceso) {
        (document.querySelector('#sendicon')).classList.add("d-none");
        (document.querySelector('#spinicon')).classList.remove("d-none");
        (document.querySelector('#txt-enviar')).classList.add("d-none");
        (document.querySelector('#txt-cargando')).classList.remove("d-none");
    } else {
        (document.querySelector('#sendicon')).classList.remove("d-none");
        (document.querySelector('#spinicon')).classList.add("d-none");
        (document.querySelector('#txt-enviar')).classList.remove("d-none");
        (document.querySelector('#txt-cargando')).classList.add("d-none");
    }
}

function retrieving(proceso) {
    if (proceso) {
        (document.querySelector('#cloudicon')).classList.add("d-none");
        (document.querySelector('#spin-recuperar-icon')).classList.remove("d-none");
        (document.querySelector('#txt-recuperar')).classList.add("d-none");
        (document.querySelector('#txt-recuperar-cargando')).classList.remove("d-none");
    } else {
        (document.querySelector('#cloudicon')).classList.remove("d-none");
        (document.querySelector('#spin-recuperar-icon')).classList.add("d-none");
        (document.querySelector('#txt-recuperar')).classList.remove("d-none");
        (document.querySelector('#txt-recuperar-cargando')).classList.add("d-none");
    }
}

function showfield(check,field){
    //console.log(field);
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

    //console.log(document.getElementById(formid).outerHTML);

    document.getElementById(formid).querySelectorAll('form').forEach(function(f) {
        var i = f.id;

        if(rvsp) {
            //console.log('validating' + document.getElementById(i));
            document.getElementById(i).classList.add("a-validar");

        }
            
        else {
            //console.log('desvalidating' + document.getElementById(i));
            document.getElementById(i).classList.remove("a-validar");
            if (formid == 'div-acomp') {
                deleteData('acomp');
            }
        }
    })
}

function vienennenos(rvsp) {
    showfield(rvsp,'nenos');
    //console.log(document.querySelectorAll('.neno'));
    document.querySelectorAll('.neno').forEach(function(form) {
        vieneSecondForm(rvsp,'div-'+form.id);
    });
}

function vienes(rvsp) {
    document.body.querySelectorAll('.vienes').forEach(function(el) {
        el.hidden = !rvsp;
    })
    showfield(!rvsp,'novienes');
}

function addneno() {
    num_nenos = document.getElementsByClassName("neno").length;
    const divEle = document.getElementById("div-form-neno"+num_nenos);
    
    if (num_nenos<4){
        var html_formneno = document.getElementById("div-form-neno1").outerHTML.replaceAll("neno1","neno"+(num_nenos+1));
        divEle.insertAdjacentHTML('afterend',html_formneno);
        document.getElementById("alergenos-neno"+(num_nenos+1)+"-input").hidden = true;
        document.getElementById("necesidades-input-neno"+(num_nenos+1)).hidden = true;
    }
    vienennenos(true);
    
}

function removeneno(){
    num_nenos = document.getElementsByClassName("neno").length;
    const divEle = document.getElementById("div-form-neno"+num_nenos);
        showfield(false,"div-form-neno"+num_nenos);
        deleteData("neno"+num_nenos);
    if (num_nenos>1){
        divEle.remove();
        vienennenos(true);
    } else {//solo hay uno
        divEle.hidden = true;
        document.getElementById('vienes-con-peques_n').checked = true;
        vienennenos(false);
    }
    
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});// prevent form submit
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

function retrieve() {
    
    if (document.getElementById("Nombre").value == "" || document.getElementById("Email").value == "" || document.getElementById("telefono-ppal").value == "" || document.getElementById("password").value == "" ) {
        (document.querySelector('#cannot-retrieve')).classList.remove("d-none");

    }
        
    else {
        (document.querySelector('#cannot-retrieve')).classList.add("d-none");
        retrieving(true);
        getData('retrieve');
    }
  
    return;

}

async function getData(reason) {
    const url = "https://script.google.com/macros/s/AKfycbwgB-Qch-S0P9s4cnYyHyqlW0v4AKn5aHq0uznrTRVFKZuqATy4HwZyDV4bVwR5mDQvHw/exec?Telefono=" + document.querySelector(".iti__selected-dial-code").innerHTML.replace('+','')+document.getElementById('telefono-ppal').value.replaceAll(' ','')+'&reason='+reason;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      //console.log(json);
      if (json.length == 0) {
        (document.querySelector('#retrieve-ko')).classList.remove("d-none");
      } else {
            (document.querySelector('#retrieve-ko')).classList.add("d-none");
            if (checkPwd(json)) {
                    rellenar(json);
            }
            retrieving(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

function checkPwd (json) {
    var datos_principal = json.find(r => r.Tipo == 'principal');
    if (document.getElementById('password').value != datos_principal.Contrasena) {
        (document.querySelector('#retrieve-pwd-ko')).classList.remove("d-none");
        return false;
    } else {
        (document.querySelector('#retrieve-pwd-ko')).classList.add("d-none");
        return true;
    }
//    alert(JSON.stringify(json.find(r => r.Tipo == 'principal')));
//    var formsdata = JSON.stringify(json);  
}

async function deleteData(quien) {
    const url = "https://script.google.com/macros/s/AKfycbwgB-Qch-S0P9s4cnYyHyqlW0v4AKn5aHq0uznrTRVFKZuqATy4HwZyDV4bVwR5mDQvHw/exec?Telefono=" + document.querySelector(".iti__selected-dial-code").innerHTML.replace('+','')+document.getElementById('telefono-ppal').value.replaceAll(' ','')+'&form='+quien+'&reason=delete';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
}


function rellenar(json) {
    var datos_principal = json.find(r => r.Tipo == 'principal');
    var formsprocesados = 1;
    document.getElementById('Nombre').value = datos_principal.Nombre;
    document.getElementById('Email').value = datos_principal.Email;
    if (datos_principal.Asistencia == "No") {
        document.getElementById('asistencia_n').checked = true;
        vienes(false);
    } else {
        document.getElementById('asistencia_y').checked = true;
        vienes(true);
        if (datos_principal.Vegano == "on") {
            document.getElementById('Vegano').checked = true;
        } else {
            document.getElementById('Vegano').checked = false;
        }
        if (datos_principal.Alergenos != "") {
            document.getElementById('flexSwitchCheckDefault').checked = true;
            showfield(true,'alergenos-input');
            document.getElementById('Alergenos').value = datos_principal.Alergenos;
        } else {
            document.getElementById('flexSwitchCheckDefault').checked = false;
            showfield(false,'alergenos-input');
            document.getElementById('Alergenos').value = "";
        }
        if (datos_principal.Necesidades != "") {
            document.getElementById('necesidadesSwitch').checked = true;
            showfield(true,'necesidades-input');
            document.getElementById('Necesidades').value = datos_principal.Necesidades;
        } else {
            document.getElementById('necesidadesSwitch').checked = false;
            showfield(false,'necesidades-input');
            document.getElementById('Necesidades').value = "";
        }
        document.getElementById('select-cercania').selected = datos_principal.Cercania_nenos;
        document.getElementById('select-cercania').value = datos_principal.Cercania_nenos;
        if (datos_principal.Juegos == "No") {
            document.getElementById('actividadcheck_n').checked = true;
            showfield(false,'actividades');
        } else if (datos_principal.Juegos == "Sí") {
            document.getElementById('actividadcheck_y').checked = true;
            showfield(true,'actividades');
            if (datos_principal.Bromas == "No") {
                document.getElementById('bromascheck_n').checked = true;
            } else if (datos_principal.Bromas == "Sí") {
                document.getElementById('bromascheck_y').checked = true;            
            }
            if (datos_principal.Karaoke == "No") {
                document.getElementById('karaokecheck_n').checked = true;
            } else if (datos_principal.Karaoke == "Sí") {
                document.getElementById('karaokecheck_y').checked = true;            
            }
            if (datos_principal.Propuestas != "") {
                document.getElementById('propuestaSwitch').checked = true;
                showfield(true,'propuesta-input');
                document.getElementById('Propuesta').value = datos_principal.Propuestas;
            } else {
                document.getElementById('propuestaSwitch').checked = false;
                showfield(false,'propuesta-input');
                document.getElementById('Propuesta').value = "";
            }
            if (datos_principal.Transporte != "") {
                document.getElementById('transporte').value = datos_principal.Transporte;
            }
            if (datos_principal.Comentarios != "") {
                document.getElementById('comentarios').value = datos_principal.Comentarios;
            }
        }
        //console.log(json.length);
        if (json.length > 1) {
            var datos_acomp = json.find(r => r.Tipo == 'acomp');
            if (datos_acomp) {
                //console.log('Hay acompañante')
                document.getElementById('vienes-con-acompanante_y').checked = true;
                vieneSecondForm(true,'div-acomp');
                document.getElementById('Nombre-acomp').value = datos_acomp.Nombre;
                if (datos_acomp.Vegano == "on") {
                    document.getElementById('Vegano-acomp').checked = true;
                } else {
                    document.getElementById('Vegano-acomp').checked = false;
                }
                if (datos_acomp.Alergenos != "") {
                    document.getElementById('flexSwitchCheckDefault-acomp').checked = true;
                    showfield(true,'alergenos-acomp-input');
                    document.getElementById('Alergenos-acomp').value = datos_acomp.Alergenos;
                } else {
                    document.getElementById('flexSwitchCheckDefault-acomp').checked = false;
                    showfield(false,'alergenos-acomp-input');
                    document.getElementById('Alergenos-acomp').value = "";
                }
                if (datos_acomp.Necesidades != "") {
                    document.getElementById('necesidadesSwitch-acomp').checked = true;
                    showfield(true,'necesidades-input-acomp');
                    document.getElementById('Necesidades-acomp').value = datos_acomp.Necesidades;
                } else {
                    document.getElementById('necesidadesSwitch-acomp').checked = false;
                    showfield(false,'necesidades-input-acomp');
                    document.getElementById('Necesidades-acomp').value = "";
                }
                if (datos_acomp.Juegos == "No") {
                    document.getElementById('actividadcheckacomp_n').checked = true;
                    showfield(false,'actividadesacomp');
                } else if (datos_acomp.Juegos == "Sí") {
                    document.getElementById('actividadcheckacomp_y').checked = true;
                    showfield(true,'actividadesacomp');
                    if (datos_acomp.Bromas == "No") {
                        document.getElementById('bromascheckacomp_n').checked = true;
                    } else if (datos_acomp.Bromas == "Sí") {
                        document.getElementById('bromascheckacomp_y').checked = true;            
                    }
                    if (datos_acomp.Karaoke == "No") {
                        document.getElementById('karaokecheckacomp_n').checked = true;
                    } else if (datos_acomp.Karaoke == "Sí") {
                        document.getElementById('karaokecheckacomp_y').checked = true;            
                    }
                    if (datos_acomp.Propuestas != "") {
                        document.getElementById('propuestaSwitchacomp').checked = true;
                        showfield(true,'propuesta-inputacomp');
                        document.getElementById('Propuestaacomp').value = datos_acomp.Propuestas;
                    } else {
                        document.getElementById('propuestaSwitchacomp').checked = false;
                        showfield(false,'propuesta-inputacomp');
                        document.getElementById('Propuestaacomp').value = "";
                    }
                }
            
        
        
                formsprocesados++;
            }
            
            if (json.length > formsprocesados) {
                document.getElementById('vienes-con-peques_y').checked = true;
                vienennenos(true);
                var num_neno = 1;
                while(formsprocesados<json.length) {
                    var datos_neno = json.find(n => n.Tipo == ('neno'+num_neno));
                    formsprocesados++;

                    document.getElementById('Nombre-neno'+num_neno).value = datos_neno.Nombre;
                    document.getElementById('Edad-neno'+num_neno).value = datos_neno.Edad;
                    if (datos_neno.Alergenos != "") {
                        document.getElementById('flexSwitchCheck-neno'+num_neno).checked = true;
                        showfield(true,'alergenos-neno'+num_neno+'-input');
                        document.getElementById('Alergenos-neno'+num_neno).value = datos_neno.Alergenos;
                    } else {
                        document.getElementById('flexSwitchCheck-neno'+num_neno).checked = false;
                        showfield(false,'alergenos-neno'+num_neno+'-input');
                        document.getElementById('Alergenos-neno'+num_neno).value = "";
                    }
                    if (datos_neno.Necesidades != "") {
                        document.getElementById('necesidadesSwitch-neno'+num_neno).checked = true;
                        showfield(true,'necesidades-input-neno'+num_neno);
                        document.getElementById('Necesidades-neno'+num_neno).value = datos_neno.Necesidades;
                    } else {
                        document.getElementById('necesidadesSwitch-neno'+num_neno).checked = false;
                        showfield(false,'necesidades-input-neno'+num_neno);
                        document.getElementById('Necesidades-neno'+num_neno).value = "";
                    }
                    if (formsprocesados != json.length) {
                        num_neno++;
                        addneno();
                    }
                }
            } else {
                document.getElementById('vienes-con-peques_n').checked = true;
                vienennenos(false);
            }

        } else {
            //console.log('No hay más registros')
            document.getElementById('vienes-con-acompanante_n').checked = true;
            vieneSecondForm(false,'div-acomp');
        }
    }
//    var formsdata = JSON.stringify(json);
}

