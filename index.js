let countElWon = document.getElementById("count-el-won")
let countElLost = document.getElementById("count-el-lost")
let saveEl = document.getElementById("save-el")
let nameInput = document.getElementById("name-input")

let countWon = 0
let countLost = 0
let savedEntries = []

function increment(type) {
    if (type === "won") {
        countWon += 1
        countElWon.innerText = countWon
    } else if (type === "lost") {
        countLost += 1
        countElLost.innerText = countLost
    }
}

function decrement(type) {
    if (type === "won" && countWon > 0) {
        countWon -= 1
        countElWon.innerText = countWon
    } else if (type === "lost" && countLost > 0) {
        countLost -= 1
        countElLost.innerText = countLost
    }
}

function reset(type) {
    let confirmation = window.confirm("Are you sure you want to reset count?")
    if (confirmation) {
        if (type === "won") {
            countWon = 0
            countElWon.innerText = countWon
        } else if (type === "lost") {
            countLost = 0
            countElLost.innerText = countLost
        }
        console.log("Count has been reset.")
    } else {
        console.log("Reset cancelled.")
    }
}

function save() {
    let name = nameInput.value.trim()
    if (name === "") {
        alert("Please indicate the season before saving")
        return;
    }

    let countStr = `${name}: Wins - ${countWon}, Losses - ${countLost}`

    const existingEntryIndex = savedEntries.findIndex(entry => entry.includes(name))

    if (existingEntryIndex !== -1) {
        let existingEntry = savedEntries[existingEntryIndex]
        let existingWins = parseInt(existingEntry.split('Wins - ')[1].split(',')[0])
        let existingLosses = parseInt(existingEntry.split('Losses - ')[1])

        if (existingWins !== countWon || existingLosses !== countLost) {
            savedEntries[existingEntryIndex] = countStr
            console.log(`Updated: ${countStr}`)
        } else {
            console.log(`No update needed for season "${name}" (Win/Losses are the same).`)
        }
    } else {
        savedEntries.push(countStr)
        console.log(`Saved: ${countStr}`)
    }
    updateSavedEntries()
}
function updateSavedEntries() {
    saveEl.innerHTML = ""
    savedEntries.forEach(entry => {
        let p = document.createElement("p")
        p.textContent = entry
        saveEl.appendChild(p)
    });
}

function deleteEntryByName() {
    let nameToDelete = prompt("Enter the season name to delete:");
    if (nameToDelete) {
        let confirmation = window.confirm(`Are you sure you want to delete the entries for the season "${nameToDelete}"?`);
        if (confirmation) {
            const entriesBeforeDelete = savedEntries.filter(entry => entry.includes(nameToDelete));
            if (entriesBeforeDelete.length > 0) {
                savedEntries = savedEntries.filter(entry => !entry.includes(nameToDelete));
                updateSavedEntries();
                console.log(`Entries for season "${nameToDelete}" deleted.`);
            } else {
                console.log(`Season "${nameToDelete}" not found.`);
            }
        } else {
            console.log("Deletion canceled.");
        }
    } else {
        console.log("No season name entered. Deletion canceled.");
    }
}