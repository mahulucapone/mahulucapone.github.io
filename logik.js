// ============================================================================
// RENTOKIL MASTER COCKPIT - ZENTRALE HAUPTLOGIK (logik.js)
// Basierend auf Datenabgleich 2026 - Cross-IFrame Synchronisation
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("Master-Logik gestartet. Initialisiere Synchronisation...");
    
    // 1. Hört auf Änderungen im Haupt-Header (Name, Pers-Nr.)
    document.body.addEventListener('input', (e) => {
        if (e.target.id === 'global-name' || e.target.id === 'global-persnr') {
            syncStammdaten();
        }
    });

    // 2. Warte kurz, bis alle IFrames geladen sind, und setze dann die Listener
    setTimeout(setupIframeListeners, 1500);
});

// Klinkt sich in alle eingebetteten Dokumente ein
function setupIframeListeners() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(ifr => {
        try {
            if(ifr.contentWindow && ifr.contentWindow.document) {
                const doc = ifr.contentWindow.document;
                
                // Hört auf JEDE Eingabe in JEDEM IFrame
                doc.body.addEventListener('input', (e) => {
                    // Wenn ein Input-Feld beschrieben wird, starte den Sync
                    if(e.target.tagName === 'INPUT' && e.target.type === 'text') {
                        syncStammdaten();
                    }
                });
            }
        } catch(e) {
            console.warn("IFrame-Zugriff blockiert (Lokal/CORS):", ifr.id);
        }
    });

    // Initiale Synchronisation beim ersten Laden
    syncStammdaten();
}

// ============================================================================
// 2. STAMMDATEN & UNTERSCHRIFTEN SYNC (Gemäß Datenabgleich)
// ============================================================================
function syncStammdaten() {
    // A) Globale Werte aus der index.html holen
    let globalName = document.getElementById('global-name') ? document.getElementById('global-name').value : "Paul Sänger";
    let globalPersnr = document.getElementById('global-persnr') ? document.getElementById('global-persnr').value : "907757";
    
    let kunde = "";
    let datum = "";

    // B) Den Master-Kunden und das Datum aus der SV Seite 1 (oder Header) extrahieren
    try {
        let sv1Frame = document.getElementById('frame-sv1');
        if(sv1Frame && sv1Frame.contentWindow.document) {
            let sv1Doc = sv1Frame.contentWindow.document;
            
            // Sucht nach dem ersten Input in der SV1 (üblicherweise das Kundenfeld/Adressfeld)
            let inputs = sv1Doc.querySelectorAll('.dotted-input');
            if(inputs.length > 2) {
                if(inputs.value) datum = inputs.value; // Datum
                if(inputs[2].value) kunde = inputs[2].value; // Kunde (Name 1)
            }
        }
    } catch(e) {}

    // C) Alle IFrames durchlaufen und die Daten "durchstempeln"
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(ifr => {
        try {
            if(ifr.contentWindow && ifr.contentWindow.document) {
                const doc = ifr.contentWindow.document;

                // 1. Unterschriften (i.A. Vorname Nachname) ausfüllen
                doc.querySelectorAll('input[placeholder*="Zuname in Druckbuchstaben"]').forEach(el => {
                    if(!el.value || el.value.startsWith("i.A.")) {
                        el.value = "i.A. " + globalName;
                    }
                });

                // 2. Dynamische Signatur-Namen (wie in SV2) updaten
                doc.querySelectorAll('span').forEach(span => {
                    if(span.style.fontFamily === 'cursive' && span.style.color === 'rgb(0, 90, 156)') {
                        span.innerText = globalName;
                    }
                });

                // 3. Personalnummer (907757) in alle Footer stempeln
                doc.querySelectorAll('.footer-sig-box').forEach(box => {
                    if(box.innerText.includes('907757') || box.innerText.trim() === "") {
                        if(box.parentElement && box.parentElement.innerText.includes('Personalnummer')) {
                            box.innerText = globalPersnr;
                        }
                    }
                });

                // 4. Kundenname & Datum in die Header-Leisten von Kalkulation & IPC stempeln
                doc.querySelectorAll('.header-inputs div').forEach(div => {
                    let input = div.querySelector('input');
                    if(input) {
                        if(div.innerText.includes('Kunde:') && kunde !== "") {
                            // Verhindert Endlosschleifen beim Tippen im Ziel-Feld
                            if(input.value !== kunde) input.value = kunde; 
                        }
                        if(div.innerText.includes('Datum:') && datum !== "") {
                            if(input.value !== datum) input.value = datum;
                        }
                    }
                });

                // 5. Spezieller Sync für das CEPA-Protokoll (Seite 1 hat direkte dotted-inputs)
                if(ifr.id === 'frame-proto' && (kunde !== "" || datum !== "")) {
                    let protoInputs = doc.querySelectorAll('.dotted-row .dotted-input');
                    if(protoInputs.length >= 2) {
                        if(datum !== "" && protoInputs.value !== datum) protoInputs.value = datum;
                        if(kunde !== "" && protoInputs[2].value !== kunde) protoInputs[2].value = kunde;
                    }
                }
            }
        } catch(e) {}
    });
}

