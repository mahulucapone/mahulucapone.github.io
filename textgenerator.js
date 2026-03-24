// ============================================================================
// RENTOKIL MASTER COCKPIT - TEXTGENERATOR (textgenerator.js)
// E-Mail & Akquise-Generator (Bereinigt für reinen Vertrieb)
// ============================================================================

// 1. DIE BEREINIGTE DATENBANK (Reiner Vertriebsfokus)
const textBausteine = {
    "1. Einstieg & Akquise": {
        "Begrüßung": [
            "Guten Tag,",
            "Guten Tag Herr",
            "Guten Tag Frau",
            "Sehr geehrte Damen und Herren,"
        ],
        "Akquise (Kalt/Warm)": [
            "In Ihrer direkten Nachbarschaft wurde ein Schädlingsbefall gemeldet – sichern Sie jetzt Ihr Objekt proaktiv ab!",
            "Bei unserem Besuch konnten wir Absicherungspotenziale identifizieren, die Ihnen helfen, unerwünschten Schädlingsbefall wirksam vorzubeugen.",
            "An Ihrem Standort wurde ein eindeutiger Schädlingsbefall festgestellt. Handeln Sie jetzt für sofortige Sicherheit!",
            "Es besteht akuter Handlungsbedarf, um größere Schäden und Risiken zu vermeiden."
        ]
    },
    "2. PestConnect & Gesetzeslage": {
        "Rechtslage RMM": [
            "Wichtige Änderungen in der Schädlingsbekämpfung stehen an: Ihr Standort ist von diesen Änderungen betroffen – handeln Sie jetzt, um die Sicherheit zu gewährleisten!",
            "Wir stehen vor einem wichtigen Wandel im Schädlingsmanagement durch die neue Biozidverordnung ab 2026."
        ],
        "PestConnect Closer": [
            "Steigen Sie jetzt auf PestConnect um – und starten Sie direkt in die Zukunft des Schädlingsmanagements!",
            "Mit PestConnect setzen Sie auf eine hochmoderne, tierfreundliche und nachhaltige Dauerlösung für dauerhafte Schädlingsfreiheit.",
            "Handeln Sie jetzt rechtzeitig: Bringen Sie Ihr Schädlingsmanagement auf den neuesten Stand – zuverlässig, effizient und gesetzeskonform."
        ]
    },
    "3. Hauptgrund der Nachricht": {
        "Befall ist Bedarf": [
            "Handeln Sie jetzt! Wir empfehlen eine toxische Maßnahme gegen den steigenden Schädlingsbefall.",
            "Bleibt das Problem unbehandelt, drohen erhebliche und langfristige Schäden.",
            "Der Befall ist zwar eingedämmt, aber noch nicht vollständig beseitigt. Eine weitere Behandlung ist unerlässlich."
        ],
        "Cross-Selling (FlexiArmour/Hardware)": [
            "Für dauerhaften Schutz und zur Vermeidung von Wiederbefall empfehlen wir gezielte Abdichtungsmaßnahmen (FlexiArmour).",
            "Einige Stationen sind stark beschädigt oder verschwunden und sollten umgehend ersetzt werden, um die Sicherheit aufrechtzuerhalten."
        ]
    },
    "4. Auftragsabschluss (Closer)": {
        "Entscheidung herbeiführen": [
            "Ich hoffe, diese Informationen unterstützen Sie optimal bei Ihrer Entscheidung und der Abstimmung mit Ihren Entscheidungsträgern.",
            "Bitte teilen Sie mir mit, ob Sie mit dieser angepassten Servicevereinbarung einverstanden sind und wir diese erfassen können.",
            "Ich freue mich über Ihre zeitnahe Rückmeldung."
        ],
        "Nachlegen": [
            "Gerne komme ich persönlich vorbei, um meine Vorschläge im Detail zu besprechen.",
            "Gerne präsentiere ich Ihnen die PestConnect Stationen und das smarte System direkt vor Ort."
        ],
        "Lost Ones (Nachfassen)": [
            "Hatten Sie bereits die Möglichkeit, sich mit unserem Anliegen zu beschäftigen?",
            "Ich wollte mich über den aktuellen Stand erkundigen: Konnten Sie sich bereits mit meinem Angebot beschäftigen?",
            "Wenn kein Service in dieser Angelegenheit erwünscht ist, entfernen wir das offene Angebot gerne aus unserer Liste."
        ]
    },
    "5. Afterwork (Netzwerken)": {
        "Vorprügeln / Verabschiedung": [
            "Danke für Ihre Rückmeldung. Sollte wieder Bedarf entstehen, melden Sie sich gerne jederzeit bei mir.",
            "Sollten Sie zukünftig wieder Probleme mit Schädlingen haben, stehe ich Ihnen gerne jederzeit zur Verfügung.",
            "Ein paar Worte in eigener Sache: Als Ihr lokaler Experte bin ich täglich für Inspektion, Fachberatung und Angebotserstellung im Schädlingsmanagement unterwegs. Meine Beratung ist kostenfrei und unverbindlich. Zögern Sie nicht, mich bei aktuellen Befällen direkt zu kontaktieren.",
            "Sonnige Grüße"
        ]
    }
};

// 2. LOGIK UND UI GENERIERUNG
function initTextGenerator(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return; // Abbruch, wenn kein Container gefunden wird

    // Aufbau des HTML Gerüsts
    let html = `
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:10px;">
            <h2 style="color: #e30613; margin:0;">E-Mail Text-Generator</h2>
            <div style="font-size: 10px; color: #555;">Klicken Sie links auf Phrasen, um den Text zu erstellen.</div>
        </div>
        <div class="tg-container">
            <div class="tg-left" id="tg-categories"></div>
            <div class="tg-right">
                <textarea class="tg-textarea" id="tg-output" placeholder="Ihre fertige E-Mail erscheint hier..."></textarea>
                <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn btn-dark" id="btn-tg-clear">🗑️ Text löschen</button>
                    <button class="btn btn-red" id="btn-tg-gmail">🚀 In Gmail öffnen</button>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;

    const leftPanel = document.getElementById('tg-categories');
    const output = document.getElementById('tg-output');

    // Kategorien und Checkboxen rendern
    for (let mainCat in textBausteine) {
        let catBtn = document.createElement('div');
        catBtn.className = 'tg-category';
        catBtn.innerText = `📂 ${mainCat}`;
        
        let phrasesDiv = document.createElement('div');
        phrasesDiv.className = 'tg-phrases';

        for (let subCat in textBausteine[mainCat]) {
            let subTitle = document.createElement('div');
            subTitle.style.fontWeight = 'bold';
            subTitle.style.fontSize = '10px';
            subTitle.style.color = '#555';
            subTitle.style.margin = '10px 0 5px 0';
            subTitle.style.borderBottom = '1px dotted #ccc';
            subTitle.innerText = subCat;
            phrasesDiv.appendChild(subTitle);

            textBausteine[mainCat][subCat].forEach(phrase => {
                let label = document.createElement('label');
                label.className = 'tg-phrase-label';
                label.innerHTML = `<input type="checkbox" class="tg-checkbox" value="${phrase}"> <span>${phrase}</span>`;
                phrasesDiv.appendChild(label);
            });
        }

        // Akkordeon-Funktion (Auf- und Zuklappen)
        catBtn.onclick = function() {
            phrasesDiv.style.display = phrasesDiv.style.display === 'block' ? 'none' : 'block';
        };

        leftPanel.appendChild(catBtn);
        leftPanel.appendChild(phrasesDiv);
    }

    // Event-Listener für das Zusammensetzen des Textes
    leftPanel.addEventListener('change', function(e) {
        if(e.target.classList.contains('tg-checkbox')) {
            let selected = [];
            document.querySelectorAll('.tg-checkbox:checked').forEach(cb => {
                selected.push(cb.value);
            });
            // Fügt die Sätze mit einem doppelten Zeilenumbruch (Absatz) zusammen
            output.value = selected.join('\n\n'); 
        }
    });

    // Button: Text löschen
    document.getElementById('btn-tg-clear').addEventListener('click', () => {
        document.querySelectorAll('.tg-checkbox').forEach(cb => cb.checked = false);
        output.value = '';
    });

    // Button: Gmail Schnittstelle
    document.getElementById('btn-tg-gmail').addEventListener('click', () => {
        if (output.value.trim() === '') {
            alert("Bitte wählen Sie zuerst Textbausteine aus.");
            return;
        }
        // Text URL-kompatibel encodieren, damit Gmail die Absätze übernimmt
        let mailBody = encodeURIComponent(output.value);
        let mailSubject = encodeURIComponent("Ihr Angebot zur Schädlingsbekämpfung");
        
        // Öffnet Gmail im Browser mit vorausgefülltem Textfenster
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${mailSubject}&body=${mailBody}`, '_blank');
    });
}

// Sobald die Seite geladen ist, sucht das Skript nach einem Div mit der ID "textgenerator-wrapper" und baut sich dort ein.
window.addEventListener('DOMContentLoaded', () => {
    initTextGenerator('textgenerator-wrapper');
});