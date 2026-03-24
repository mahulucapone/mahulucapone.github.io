/* ========================================================================== 
   RENTOKIL MASTER COCKPIT - INFO MODUL 
   Logik: Konstantes 5er-Akkordeon (Links), Profit-Tipp-Counter (Rechts)
========================================================================== */

// --- 1. DATENBANKEN ---

// A) Kontext-Datenbank (Links Oben)
const contextDB = {  
    'page-deckblatt': '<b>Deckblatt:</b> Startseite & Kundendaten',
    'frame-sv1': '<b>SV Seite 1:</b> Laufzeiten, Zertifizierung & Varioservice',
    'frame-sv2': '<b>SV Seite 2:</b> Nebenleistungen, Hardware & Abschluss',
    'frame-kalkulation': '<b>Kalkulation:</b> Kaufmännische Berechnung 4x3/6x3',
    'frame-kalk-tool': '<b>Backoffice Matrix:</b> Intervall-Zeitstrahl & iCabs Erfassung',
    'frame-ipc': '<b>IPC:</b> Instruktionen, CEPA & Systemeinrichtung',
    'frame-proto': '<b>Mängelbericht:</b> Objektbegehung & Risikominimierung',
    'frame-kuendigung': '<b>RSI:</b> Kündigungsbearbeitung & Rückgewinnung',
    'frame-textgen': '<b>Textgenerator:</b> Akquise- & Kunden-E-Mails',
    'frame-textbausteine': '<b>Textbausteine:</b> Statisches Nachschlagewerk',
    'frame-admin': '<b>Admin:</b> QM-Nachweis & Parameter-Verwaltung'
};

// B) Seiten-Wissen / Akkordeon (Konstant 5 Boxen Links Unten)
const defaultAccordion = {
    'cat-health': { name: 'Umwelt', title: 'Nachhaltige Lösungen', content: 'Berücksichtigen Sie immer den Einsatz giftfreier Alternativen für nachhaltige Schädlingskontrolle.' },
    'cat-tech': { name: 'Technik', title: 'Hardware & Systeme', content: 'Digitale Lösungen wie PestConnect oder Lumnia bieten höchste Sicherheit und Transparenz.' },
    'cat-law': { name: 'Gesetz', title: 'Rechtliche Vorgaben', content: 'Dokumentieren Sie alle Maßnahmen sorgfältig gemäß Biozidverordnung und lokalen TRGS Vorgaben.' },
    'cat-sec': { name: 'Sicherh.', title: 'Arbeitssicherheit', content: 'Achten Sie auf Gefahrenbereiche, Zugangsbeschränkungen und notwendige Schutzausrüstung.' },
    'cat-contract': { name: 'Vertrag', title: 'Leistungsumfang', content: 'Klären Sie den genauen Leistungsumfang ab. Sonderleistungen erfordern separate Aufträge.' }
};

const accordionDB = {
    'frame-sv1': {
        'cat-law': { name: 'Gesetz', title: 'BAuA Verordnung 2026', content: 'Keine Permanentbeköderung ohne Befall! Toxische Akutmaßnahmen nur bei nachgewiesenem Befall erlaubt.' },
        'cat-contract': { name: 'Vertrag', title: '4x3 / 6x3 Regelwerk', content: 'Je Regelservice sind bis zu zwei Zusatzbehandlungen inkludiert. Bei Befall direkte Umstellung auf Tox (2er Folge-Job).' },
        'cat-health': { name: 'Umwelt', title: 'Zertifizierung (IFS/BRC)', content: 'Auditierung erfordert i.d.R. "myRentokil Premium" und Grundrisspläne zur digitalen Dokumentation.' },
        'cat-tech': { name: 'Technik', title: 'Schaben & Varioservice', content: 'Schaben-Monitoring (z.B. Gel-Verfahren) gehört in den Varioservice. Akutmaßnahmen in Position 1.' }
    },
    'frame-sv2': {
        'cat-tech': { name: 'Technik', title: 'PestConnect Hardware', content: 'Bei Diebstahl/Vandalismus gelten Ersatzgebühren: 139,00 € (AutoGate/RADAR X) und 289,00 € (Router).' },
        'cat-contract': { name: 'Vertrag', title: 'SGA / OGA Pflicht', content: 'Die Objektbezogene Gefahrenanalyse (Pos. 5) ist bei strategischer Tox-Beköderung zwingend jährlich erforderlich!' },
        'cat-sec': { name: 'Sicherh.', title: 'Nachsorge & Neutralis.', content: 'Legen Sie vertraglich fest, ob das Absaugen (Feinfilter) oder das Wischen mit Haushaltsreiniger durch den Kunden oder Rentokil erfolgt.' }
    },
    'frame-kalkulation': {
        'cat-tech': { name: 'Technik', title: 'CallOuts (Connect)', content: 'Ein CallOut umfasst die Wartung von 2 Stationen und bis zu 5 Zusatzbehandlungen. Jede weitere Station ab der 3. kostet 9,50 €.' },
        'cat-contract': { name: 'Vertrag', title: 'Systemeinrichtung', content: 'Wird in der Regel kalkuliert durch: (Listen-Jahreswert / Anzahl möglicher Behandlungen) x 2.' }
    },
    'frame-kalk-tool': {
        'cat-contract': { name: 'Vertrag', title: 'Matrix-Regeln', content: 'Die Matrix dient der exakten iCabs-Übertragung. Bitte überschreiben Sie keine Formeln in den grauen/grünen Feldern.' },
        'cat-tech': { name: 'Technik', title: 'Intervall-Zeitstrahl', content: 'Achten Sie darauf, dass sich Inspektionen nicht unnötig ballen. Der Zeitstrahl hilft bei der Optimierung der Anfahrten.' }
    },
    'frame-ipc': {
        'cat-law': { name: 'Gesetz', title: 'CEPA Risikobeurteilung', content: 'Die Dokumentation der Befallsgefahr und baulichen Absicherung ist Basis für die DIN EN 16636 Zertifizierung.' },
        'cat-sec': { name: 'Sicherh.', title: 'Arbeitssicherheit', content: 'Vermerken Sie fehlende Aufstiegshilfen oder Zugangsbeschränkungen zwingend für den Techniker.' }
    },
    'frame-proto': {
        'cat-health': { name: 'Umwelt', title: 'Hygiene-Mängel', content: 'Weisen Sie den Kunden auf unordentliche Bereiche oder falsche Abfalllagerung als Nahrungsquelle für Nager hin.' },
        'cat-tech': { name: 'Technik', title: 'Cross-Selling: Flexi', content: 'Bauliche Mängel (undichte Türen, Rohrdurchbrüche) erkannt? Bieten Sie aktiv unsere Flexi Armour Abdichtungen an!' }
    },
    'frame-kuendigung': {
        'cat-sec': { name: 'Sicherh.', title: 'Rückgewinnungs-Limit', content: 'Sie dürfen maximal 5% Kundenrückgewinnungsrabatt gewähren.' },
        'cat-contract': { name: 'Vertrag', title: 'Provisions-Stufen', content: 'Gesteigerte Produktivität = 9%, Gleiche Produktivität = 8%, Geminderte Produktivität = 6% Provision.' }
    },
    'frame-textgen': {
        'cat-law': { name: 'Gesetz', title: 'Argument: BAuA', content: 'Nutzen Sie die Textbausteine zur Gesetzesänderung 2026, um Kunden aktiv von PestConnect zu überzeugen.' },
        'cat-health': { name: 'Umwelt', title: 'Nachhaltigkeit', content: 'Heben Sie hervor, dass toxische Präparate dank Digitalisierung nur noch punktuell bei Befall eingesetzt werden.' }
    }
};

// C) Profit-Tipps Datenbank (Rechts Oben - € Trigger)
const profitDB = [
    "<b>Laufzeit-Aufschlag nutzen!</b><br>Schlagen Sie bei 24 Monaten Laufzeit +6% und bei 12 Monaten +12% auf den Quartalswert auf.",
    "<b>Zuschläge für Randzeiten:</b><br>Vergessen Sie nicht: Arbeiten nach 17 Uhr bedeuten Z1 (+50%). Einsätze nach 22 Uhr oder Sonntags erfordern Z2 (+100%).",
    "<b>Systemeinrichtung abrechnen:</b><br>Haben Sie die Systemeinrichtung einkalkuliert? (Jahreswert / Behandlungen) x 2.",
    "<b>Hardware-Verlustpauschalen:</b><br>Weisen Sie auf die Bereitstellungspauschalen hin. 139 € für Radar/Autogate und 289 € für Router sichern Ihren Umsatz bei Verlust.",
    "<b>CallOuts richtig bewerten:</b><br>Die Preisfindung für CallOuts erfolgt über eine Risikobewertung. Der Preisspanne liegt zwischen 129,00 € und 308,00 €.",
    "<b>Cross-Selling Check:</b><br>Haben Sie Lumnia LED-Geräte (bis zu 75% Energieersparnis) oder Flexi Armour zur Abdichtung mit angeboten?",
    "<b>OGA / SGA abrechnen:</b><br>Jede strategische Tox-Beköderung erfordert eine jährliche, kostenpflichtige Objektbezogene Gefahrenanalyse (mindestens 98,00 €)."
];

// --- 2. INITIALISIERUNG ---
let tipCounter = 0; // Globaler Zähler für die Tipps

function initInfoModul() { 
    setupScrollContext();   // Startet Scroll-Überwachung für die linke Spalte
    setupIframeListeners(); // Startet €-Überwachung für die rechte Spalte
    
    // Initiales Bauen des Akkordeons für das Deckblatt
    buildAccordion('page-deckblatt', document.getElementById('info-accordion'));
}

// --- 3. KONTEXT & AKKORDEON BERECHNUNG (Linke Spalte) ---
function setupScrollContext() {
    const middleContent = document.querySelector('.middle-content'); 
    const frames = document.querySelectorAll('.a4-page, .a4-iframe'); 
    const contextTitle = document.getElementById('info-context');
    const accordionContainer = document.getElementById('info-accordion');
    let currentActiveFrame = "";

    if(!middleContent || !contextTitle || !accordionContainer) return;

    middleContent.addEventListener('scroll', function() { 
        let centerPosition = middleContent.getBoundingClientRect().top + (middleContent.clientHeight / 2); 
        
        frames.forEach(frame => { 
            let rect = frame.getBoundingClientRect(); 
            if (rect.top <= centerPosition && rect.bottom >= centerPosition) { 
                let frameId = frame.id; 
                
                if(frameId !== currentActiveFrame) {
                    currentActiveFrame = frameId;
                    
                    // 1. Kontext Titel (Links Oben) updaten
                    contextTitle.innerHTML = contextDB[frameId] || "<b>Bereich:</b> " + frameId;

                    // 2. Akkordeon (Links Unten) aufbauen (Konstant 5 Kategorien)
                    buildAccordion(frameId, accordionContainer);
                }
            } 
        }); 
    }); 
}

function buildAccordion(frameId, container) {
    let pageData = accordionDB[frameId] || {};
    let html = "";
    
    // Die 5 konstanten Kategorien inkl. Farben
    const cats = [
        { id: 'cat-health', color: '#28a745' },
        { id: 'cat-tech', color: '#005A9C' },
        { id: 'cat-law', color: '#e30613' },
        { id: 'cat-sec', color: '#ffcc00' },
        { id: 'cat-contract', color: '#333' }
    ];
    
    cats.forEach(c => {
        // Nimmt spezifische Info für die Seite, ansonsten den Standard-Satz (Fallback)
        let item = pageData[c.id] || defaultAccordion[c.id];
        
        html += `
        <button class="acc-btn" style="border-left-color: ${c.color};" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'">
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
                <span class="cat-badge ${c.id}" style="flex-shrink:0;">${item.name}</span> 
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size:10px; color:#222;">${item.title}</span>
            </div>
            <span style="color:#888; font-size: 8px;">▼</span>
        </button>
        <div class="acc-content">${item.content}</div>`;
    });
    
    container.innerHTML = html;
}

// --- 4. MAX PROFIT TRIGGER (Rechte Spalte / €-Scanner) ---
function setupIframeListeners() {
    const profitBox = document.getElementById('info-sales-tips');
    
    setInterval(() => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(ifr => {
            try {
                if(ifr.contentWindow && ifr.contentWindow.document && !ifr.dataset.listenerAttached) {
                    const doc = ifr.contentWindow.document;
                    
                    doc.body.addEventListener('focusin', (e) => {
                        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                            checkProfitTrigger(e.target, profitBox);
                        }
                    });
                    
                    ifr.dataset.listenerAttached = "true";
                }
            } catch(e) {}
        });
    }, 2000);
}

function checkProfitTrigger(element, profitBox) {
    let parentHTML = element.parentElement ? element.parentElement.innerHTML : "";
    let isMoneyField = 
        element.placeholder.includes('€') || 
        parentHTML.includes('€') || 
        element.id.includes('auftrag') || 
        element.id.includes('preis');

    if(isMoneyField && profitBox) {
        tipCounter++; // Zählt hoch!
        let randomTip = profitDB[Math.floor(Math.random() * profitDB.length)];
        
        profitBox.parentElement.style.boxShadow = "0 0 15px rgba(255,204,0,0.8)";
        setTimeout(() => { profitBox.parentElement.style.boxShadow = "0 4px 10px rgba(255,204,0,0.2)"; }, 500);

        profitBox.innerHTML = `
        <div style="animation: fadeIn 0.4s ease-in-out;">
            <div style="font-size: 10px; color: #d4a000; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">💡 Tipp #${tipCounter}</div>
            ${randomTip}
        </div>`;
    }
}

// CSS Animation
const style = document.createElement('style'); 
style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`; 
document.head.appendChild(style);

// INIT
window.addEventListener('DOMContentLoaded', initInfoModul);