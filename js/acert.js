const selector = document.getElementById('optionSelector');
const cards = document.querySelectorAll('.gallery-card');

const contentDivs = document.querySelectorAll('.content-div');
const hideDivs = document.querySelectorAll('.tohide');
const viewDivs = document.querySelectorAll('.toview');
const resetIp = document.querySelectorAll('.toreset');

// Function to update content based on selected mesa
function updateContentMesa(mesaData) {
    document.querySelectorAll('[data-mesa]').forEach(element => {
        const keymesa = element.getAttribute('data-mesa');
            element.innerHTML = mesaData[keymesa];
    });    
}
// Function to set the mesa preference
function setMesaPreference(mesa) {
    localStorage.setItem('mesa', mesa);
}

// Function to fetch mesa data
async function fetchMesaData(mesa) {
    const responseMesa = await fetch(`assets/mesas/${mesa}.json`);
    return responseMesa.json();
}
// Function to change mesa
async function changeMesa(mesa) {
    await setMesaPreference(mesa);
    const mesaData = await fetchMesaData(mesa);
    correctSolutions = mesaData["claves"][0];
    updateContentMesa(mesaData);
}

/*selector.addEventListener('change', function () {
  // Show selected div (if any)
  const selectedValue = this.value;
  if (selectedValue) {
    document.getElementById("acertijos").hidden = false;
    setMesaPreference(selectedValue);
    changeMesa(selectedValue);
    hideDivs.forEach(hd => {
        hd.hidden = true;
    });
    viewDivs.forEach(vd => {
        vd.hidden = false;
    });
    resetIp.forEach(ip => {
        ip.value = "";
    });
  }
});*/

cards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      const optionName = card.getAttribute('data-name'); // 💡 get option label

      // Remove 'selected' from all cards
      cards.forEach(c => c.classList.remove('selected'));

      // Activate selected content and card
      const targetDiv = document.getElementById(targetId);
      if (targetDiv) {
            targetDiv.classList.add('active');
            document.getElementById("acertijos").hidden = false;
            setMesaPreference(optionName);
            changeMesa(optionName);
            hideDivs.forEach(hd => {
                hd.hidden = true;
            });
            viewDivs.forEach(vd => {
                vd.hidden = false;
            });
            resetIp.forEach(ip => {
                ip.value = "";
            });
          }      
      card.classList.add('selected');
    });
  
});

function getSolution(clave) {
    return correctSolutions[clave];
}

// Handle the form submission
function solutionAttempt(whichOne) {
    var errorMessage = document.getElementById("error-message"+whichOne);

    document.getElementById("solutionForm"+whichOne).addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form from submitting normally
        var correctSolution = getSolution("pregunta"+whichOne);
        var userInput = document.getElementById("solutionInput"+whichOne).value.trim();
    
        if (correctSolution.includes(userInput.toLowerCase())) {
            // If the solution is correct, reveal the image
            document.getElementById("solutionForm"+whichOne).hidden = true;
            document.getElementById("hiddenImagePreguntas"+whichOne).hidden = false;
            if (document.getElementById("hiddenImagePreguntas"+whichOne+"b")) {
                document.getElementById("hiddenImagePreguntas"+whichOne+"b").hidden = false;
            }
    
            errorMessage.hidden = true;    
        } else {
            // If the solution is incorrect, alert the user
            errorMessage.hidden = false
            return false;
        }
    
        // Clear the input field after each submission
        //document.getElementById("solutionInput"+whichOne).value = "";
    });
    
}
