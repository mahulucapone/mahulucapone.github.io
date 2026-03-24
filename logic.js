/* ==========================================================================
   RENTOKIL COCKPIT - HAUPTLOGIK (logik.js)
   ========================================================================== */

// 1. MASTER EVENT-LISTENER (Hört auf jede Eingabe im Tool)
document.addEventListener('input', function(e) {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.isContentEditable) {
        syncStammdaten();
        calcIPC();
        
        // Führt den Kündigungsrechner nur aus, wenn man auf Seite 11 tippt
        if(e.target.closest('#page-kuendigung') || e.target.id.startsWith('k-')) {
            if(typeof calcKuendigung === 'function') calcKuendigung();
        }
    }
});

// 2. STAMMDATEN & UNTERSCHRIFTEN SYNC
function syncStammdaten() {
    let name = document.getElementById('global-name') ? document.getElementById('global-name').value : "";
    let datumFeld = document.getElementById('global-date');
    let datum = datumFeld ? datumFeld.value : "";
    
    // Setzt das "i.A. Vorname Nachname" in die Druckbuchstaben-Felder
    document.querySelectorAll('.sync-name-text').forEach(el => {
        let fullName = name ? "i.A. " + name : "";
        if(el.tagName === 'INPUT') el.value = fullName; else el.innerText = fullName;
    });

    // Setzt den Namen als "Handschrift" direkt über das Datum
    document.querySelectorAll('.sync-name-text-sign').forEach(el => {
        el.innerText = name ? name + " " : "";
    });

    // Setzt das Datum in die kleinen Boxen im Unterschriften-Feld
    if(datum) {
        document.querySelectorAll('.sync-date-text').forEach(el => {
            if(el.tagName === 'INPUT') el.value = datum; else el.innerText = datum;
        });
    }
}

// 3. IPC KALKULATION (Mit flexiblen 15-Minuten-Schritten)
function calcIPC() {
    // Holt sich den Basiswert vom unsichtbaren/Admin Preisblatt (Standard: 130€)
    let stundenSatz = document.getElementById('admin-hourly') ? parseFloat(document.getElementById('admin-hourly').value) : 130.00;
    let gesamtJahresWert = 0;

    document.querySelectorAll('.ipc-table tr').forEach(row => {
        let minInput = row.querySelector('.calc-min');
        if(!minInput) return;

        // Hier greift die 15-Minuten Logik
        let minuten = parseFloat(minInput.value) || 0;
        let wertFeld = row.querySelector('.calc-wert');
        let sumFeld = row.querySelector('.sum-neu');
        
        let anzahlInput = row.querySelector('input[type="number"]:not(.calc-min)');
        let anzahl = anzahlInput ? parseFloat(anzahlInput.value) || 0 : 0;

        // Prüft, ob es ein 4x3 oder 6x3 Vertrag ist
        let is4x3Row = row.querySelector('input[type="radio"][name="z-beh"]');
        if(is4x3Row) {
            let radios = row.querySelectorAll('input[type="radio"][name="z-beh"]');
            radios.forEach(r => { if(r.checked) anzahl = r.parentElement.innerText.includes('4x3') ? 4 : 6; });
        }

        if(minuten > 0 && anzahl > 0) {
            let wertProBehandlung = (minuten / 60) * stundenSatz;
            let jahresWertZeile = wertProBehandlung * anzahl;

            if(wertFeld) wertFeld.value = wertProBehandlung.toLocaleString('de-DE', {style:'currency', currency:'EUR'});
            if(sumFeld) sumFeld.value = jahresWertZeile.toLocaleString('de-DE', {style:'currency', currency:'EUR'});

            gesamtJahresWert += jahresWertZeile;
        } else {
            if(wertFeld) wertFeld.value = "";
            if(sumFeld) sumFeld.value = "";
        }
    });

    updateDashboard(gesamtJahresWert);
}

// 4. DASHBOARD & AMPEL STEUERUNG
function updateDashboard(gesamtJahresWert) {
    let dashAltFeld = document.getElementById('dash-alt');
    let dashNeuFeld = document.getElementById('dash-neu');
    let dashDiffFeld = document.getElementById('dash-diff');
    let ampelText = document.getElementById('ampel-prozent-text');

    let altSum = 0;
    if(dashAltFeld) altSum = parseFloat(dashAltFeld.innerText.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
    if(dashNeuFeld) dashNeuFeld.innerText = gesamtJahresWert.toLocaleString('de-DE', {style:'currency', currency:'EUR'});

    // Steuert das Live-Balkendiagramm
    let barAlt = document.getElementById('chart-bar-alt');
    let barNeu = document.getElementById('chart-bar-neu');
    let maxVal = Math.max(altSum, gesamtJahresWert, 1);
    if(barAlt) barAlt.style.height = ((altSum / maxVal) * 100) + "%";
    if(barNeu) barNeu.style.height = ((gesamtJahresWert / maxVal) * 100) + "%";

    // Ampel Farben und Prozentrechnung
    if(dashDiffFeld && ampelText && altSum > 0) {
        let prozent = (gesamtJahresWert / altSum) * 100;
        let diffProzent = prozent - 100;
        ampelText.innerText = prozent.toFixed(0) + "%";

        if(diffProzent >= 0) { dashDiffFeld.innerText = "+ " + diffProzent.toFixed(2) + " %"; dashDiffFeld.className = "analysis-value val-green"; } 
        else { dashDiffFeld.innerText = diffProzent.toFixed(2) + " %"; dashDiffFeld.className = "analysis-value val-red"; }

        let d1 = document.getElementById('dot1'); let d2 = document.getElementById('dot2'); let d3 = document.getElementById('dot3'); 
        if(d1 && d2 && d3) {
            d1.style.opacity = "0.2"; d2.style.opacity = "0.2"; d3.style.opacity = "0.2";
            d1.style.boxShadow = "none"; d2.style.boxShadow = "none"; d3.style.boxShadow = "none";
            if(prozent >= 100) { d3.style.opacity = "1"; d3.style.boxShadow = "0 0 12px #00ff00"; ampelText.style.color = "#00ff00"; } 
            else if(prozent >= 80) { d2.style.opacity = "1"; ampelText.style.color = "#228B22"; } 
            else { d1.style.opacity = "1"; ampelText.style.color = "#004400"; }
        }
    }
}

// 5. INTELLIGENTES PROTOKOLL (CEPA -> MÄNGELBERICHT)
document.addEventListener('change', function(e) {
    let page = e.target.closest('.a4-page');
    if(page && page.innerHTML.includes('CEPA-Risikobeurteilung')) {
        let protocolArea = document.getElementById('protocol-output');
        if (!protocolArea) return;

        let maengel = [];
        page.querySelectorAll('label').forEach(label => {
            let cb = label.querySelector('input[type="checkbox"]');
            // Sucht gezielt nach baulichen und hygienischen Mängeln
            let isMangel = label.innerText.includes('defekt') || label.innerText.includes('undicht') || label.innerText.includes('Abfälle') || label.innerText.includes('unordentlich') || label.innerText.includes('Schimmel');
            
            if (cb && cb.checked && isMangel) {
                maengel.push(label.innerText.trim());
            }
        });

        // Automatische Textgenerierung für RMM
        if (maengel.length > 0) {
            let text = "ALLGEMEINE BEWERTUNG UND CEPA-GEFAHRENANALYSE:\n";
            text += "Im Rahmen der Inspektion wurden folgende absicherungsrelevante Punkte und Mängel festgestellt:\n\n";
            
            maengel.forEach(m => text += "• " + m + "\n");
            
            text += "\nKUNDENHINWEIS / RISIKOMINDERUNG (RMM):\n";
            text += "Um eine effektive und nachhaltige Schädlingsbekämpfung zu gewährleisten, ist die Mitwirkung des Kunden bei der Beseitigung der genannten baulichen und hygienischen Mängel zwingend erforderlich. Ein dauerhafter Einsatz von Tox-Präparaten ohne Beseitigung der Ursachen ist gesetzlich untersagt und mindert den Tilgungserfolg.\n";

            protocolArea.value = text;
        } else {
            protocolArea.value = "";
        }
    }
});

// Initiiert alles beim Laden der Seite
window.onload = function() { 
    syncStammdaten(); 
    calcIPC(); 
    if(typeof initTextGenerator === 'function') initTextGenerator();
};