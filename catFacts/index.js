// Nur cat-facts importieren
import catFacts from 'cat-facts';
import inquirer from 'inquirer';

// Funktion zur Anzeige eines zufälligen Katzenfakts
function showCatFact() {
    const fact = catFacts.random(); // Zufälliger Katzenfakt
    console.log(`🐱 Katzenfakt: ${fact}`);
}

// Funktion zur Abfrage des Benutzernamens
async function askForUsername() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Bitte gib deinen Benutzernamen ein:',
            validate: (input) => input.trim() !== '' || 'Bitte einen gültigen Benutzernamen eingeben!',
        },
    ]);
    return answers.username; // Benutzername zurückgeben
}

// Funktion für die Benutzerinteraktion
async function askForNewCatFact() {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'getCatFact',
            message: 'Möchtest du einen weiteren Katzenfakt sehen?',
            default: true,
        },
    ]);

    if (answers.getCatFact) {
        showCatFact(); // Zeige einen Katzenfakt an
        await askForNewCatFact(); // Rekursion, um nach einem weiteren Fakt zu fragen
    } else {
        console.log("Danke, dass du das Programm genutzt hast!");
        process.exit(0); // Programm beenden
    }
}

// Hauptprogramm
async function main() {
    const username = await askForUsername(); // Benutzername abfragen
    console.log(`Willkommen zu deinem inspirierenden Katzenfakt-Tool, ${username}!`);
    showCatFact(); // Ersten Katzenfakt anzeigen
    await askForNewCatFact(); // Starte die Benutzerinteraktion für weitere Fakten
}

// Hauptfunktion aufrufen
main();
