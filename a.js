// Global array to represent the structure of #test-prd-add
let dataArray = [];

function myFunction() {
    const container = document.getElementById("test-prd-add");

    // Initialize the data array based on existing DOM structure
    updateDataArray();

    container.addEventListener("keydown", (event) => {
        const target = event.target;

        // Check if the pressed key is Enter and the target is an input
        if (event.key === "Enter" && target.tagName === "INPUT") {
            const nameAttr = target.getAttribute("name");
            if (nameAttr) {
                const [row, col] = nameAttr.split("_").map(Number);
                const parentDiv = target.parentElement;

                if (target.value.trim() !== "") {
                    // If the input has a value, create a new input in the same parent
                    const newInput = createInput(row, col + 1);
                    parentDiv.appendChild(newInput);
                    updateDataArray();
                    newInput.focus();
                } else {
                    // If the input is empty, remove it
                    target.remove();

                    // Check if the parent div is empty after removing the input
                    if (isDivEmpty(parentDiv)) {
                        parentDiv.remove();
                        updateDataArray();
                    } else {
                        // Create a new parent div and input
                        const newRow = row + 1;
                        const newDiv = document.createElement("div");
                        const newInput = createInput(newRow, 0);
                        newDiv.appendChild(newInput);
                        container.appendChild(newDiv);
                        updateDataArray();
                        newInput.focus();
                    }
                }
            }
        }
    });

    container.addEventListener("input", (event) => {
        const target = event.target;

        if (target.tagName === "INPUT") {
            const nameAttr = target.getAttribute("name");
            if (nameAttr) {
                const [row, col] = nameAttr.split("_").map(Number);
                // Update the data array with the new value
                dataArray[row][col] = target.value.trim();
                cleanDataArray(); // Remove trailing empty strings
                console.log(dataArray); // Print updated array
            }
        }
    });
}

// Helper function to create a new input element with the specified name
function createInput(row, col) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Attribute Name. Enter";
    input.name = `${row}_${col}`;
    input.value = "";
    return input;
}

// Helper function to check if a div is empty (all inputs have empty values)
function isDivEmpty(div) {
    return Array.from(div.querySelectorAll("input")).every((input) => input.value.trim() === "");
}

// Function to update the global dataArray based on the current DOM structure
function updateDataArray() {
    const container = document.getElementById("test-prd-add");
    const divs = container.querySelectorAll("div");
    dataArray = Array.from(divs).map((div) => {
        return Array.from(div.querySelectorAll("input")).map((input) => input.value.trim());
    });

    cleanDataArray(); // Remove trailing empty strings
    console.log(dataArray); // Print the updated array for observation
}

// Function to remove trailing empty strings from arrays
function cleanDataArray() {
    dataArray = dataArray.filter((row) => {
        // Remove trailing empty strings in each row
        while (row.length > 0 && row[row.length - 1] === "") {
            row.pop();
        }
        // Keep only rows that still have elements
        return row.length > 0;
    });
}
