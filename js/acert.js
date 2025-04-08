// The correct solution
const correctSolution = "unlock";

// Handle the form submission
document.getElementById("solutionForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    const userInput = document.getElementById("solutionInput").value.trim();

    if (userInput.toLowerCase() === correctSolution) {
        // If the solution is correct, reveal the image
        document.getElementById("hiddenImage").style.display = "block";
    } else {
        // If the solution is incorrect, alert the user
        alert("Incorrect solution. Try again!");
    }

    // Clear the input field after each submission
    document.getElementById("solutionInput").value = "";
});
