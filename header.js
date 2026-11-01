document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("app-header");
    if (!headerContainer) return;

    const isInsideSubfolder = window.location.pathname.includes('/pages/');
    const logoPath = isInsideSubfolder ? "../../logowb.jpeg" : "logowb.jpeg";
    const logoutPath = isInsideSubfolder ? "../../index.html" : "index.html";

    headerContainer.innerHTML = `
        <header class="w-full bg-slate-900/95 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3 shadow-lg">
            <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
              
              <div class="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
                <div class="flex items-center gap-3">
                  <img src="${logoPath}" alt="Webuild" class="h-10 object-contain rounded bg-white p-1" onerror="this.src='https://via.placeholder.com/120x40?text=WEBUILD'">
                  <div class="h-8 w-[1px] bg-slate-700 hidden sm:block"></div>
                  <div>
                    <h1 class="font-black text-base sm:text-lg text-white tracking-wide uppercase leading-none">Portale QHSE Cantiere</h1>
                    <p class="text-[11px] text-sky-400 font-semibold mt-1">Quarto Valico dei Giovi — VICOC</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                
                <div onclick="apriGestoreScadenze()" class="flex items-center gap-2 bg-slate-800/90 border border-slate-700 hover:border-sky-400 rounded-xl px-3 py-1.5 shadow-inner cursor-pointer transition group" title="Clicca per aprire il calendario mensile">
                  <div class="bg-sky-500 text-slate-950 font-black text-[10px] px-2 py-1 rounded-lg text-center uppercase tracking-wider group-hover:scale-105 transition">
                    <span id="calMonth">OTT</span> <span id="calDay">30</span>
                  </div>
                  <div class="text-left text-xs leading-tight">
                    <div class="font-bold text-white flex items-center gap-1.5">
                      <span id="calFullDate">Venerdì, 30 OTT</span>
                      <span class="w-4 h-4 rounded-full bg-sky-500/20 border border-sky-400 text-sky-400 flex items-center justify-center text-[10px] font-black group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                        <i class="fa-solid fa-plus"></i>
                      </span>
                    </div>
                    <div class="text-[10px] text-slate-400 font-medium">Calendario & Scadenze</div>
                  </div>
                </div>

                <div onclick="apriGestoreScadenze()" class="flex items-center gap-2.5 bg-slate-800/90 border border-sky-500/40 hover:border-sky-500 transition rounded-xl px-3 py-1.5 shadow-sm cursor-pointer" title="Visualizza scadenze attive">
                  <div class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
                  <div class="text-left text-xs leading-tight">
                    <div class="font-extrabold text-sky-400 tracking-wide uppercase text-[10px]">Avvisi & Scadenze</div>
                    <div id="testo-prossima-scadenza" class="text-[11px] text-slate-300 truncate max-w-[160px] sm:max-w-[200px]">
                      Caricamento promemoria...
                    </div>
                  </div>
                </div>

                <!-- PROFILO UTENTE (LEONE BASTIANCICH) -->
                <div class="relative">
                  <button onclick="toggleUserMenu(event)" class="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-1.5 rounded-xl transition text-left focus:outline-none">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs shadow">
                      LB
                    </div>
                    <div class="hidden md:block">
                      <p class="text-[10px] text-slate-400 leading-tight">Benvenuto</p>
                      <p class="text-xs font-bold text-slate-100">Ciao Leone Bastiancich</p>
                    </div>
                    <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-1"></i>
                  </button>

                  <div id="userMenu" class="hidden absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-[150] backdrop-blur-xl">
                    <div class="px-4 py-2 border-b border-slate-800 md:hidden">
                      <p class="text-xs text-slate-400">Benvenuto</p>
                      <p class="text-sm font-bold text-slate-100">Ciao Leone Bastiancich</p>
                    </div>
                    <a href="${logoutPath}" onclick="handleLogout(event)" class="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition">
                      <i class="fa-solid fa-right-from-bracket text-sm"></i> Cambia Account / Logout
                    </a>
                  </div>
                </div>

              </div>

            </div>
        </header>

        <!-- MODALE CALENDARIO E RECAP GIORNALIERO -->
        <div id="modal-scadenze" class="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[200] hidden flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-auto space-y-5" onclick="event.stopPropagation()">
            
            <button onclick="chiudiGestoreScadenze()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>
            
            <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
              <i class="fa-solid fa-calendar-days text-sky-400 text-lg"></i>
              <h3 class="text-base font-black text-white uppercase tracking-wider">Calendario Mensile & Scadenze di Cantiere</h3>
            </div>

            <!-- GRIGLIA CALENDARIO MESE -->
            <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <button onclick="cambiaMeseCalendario(-1)" class="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 rounded-lg flex items-center justify-center text-xs transition cursor-pointer" title="Mese precedente">
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                  <span id="label-mese-corrente" class="text-sm font-black text-sky-400 uppercase tracking-widest min-w-[160px] text-center">OTTOBRE 2026</span>
                  <button onclick="cambiaMeseCalendario(1)" class="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 rounded-lg flex items-center justify-center text-xs transition cursor-pointer" title="Mese successivo">
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <div class="text-[10px] text-sky-400 font-semibold italic hidden sm:block">💡 Clicca su un giorno per vedere il recap sotto</div>
              </div>
              
              <div class="grid grid-cols-8 gap-1 text-center text-[11px] font-bold text-slate-400 border-b border-slate-800 pb-1">
                <div class="text-sky-500">W</div>
                <div>Lun</div><div>Mar</div><div>Mer</div><div>Gio</div><div>Ven</div><div>Sab</div><div>Dom</div>
              </div>
              <div id="griglia-calendario-mese" class="grid grid-cols-8 gap-1 text-center text-xs"></div>
            </div>

            <!-- BOX RECAP APPUNTAMENTI DEL GIORNO SELEZIONATO -->
            <div id="box-recap-giorno" class="bg-sky-950/20 border border-sky-500/30 rounded-xl p-4 space-y-2 hidden">
              <div class="flex items-center justify-between border-b border-sky-900/50 pb-2">
                <h4 id="recap-data-titolo" class="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <i class="fa-solid fa-clipboard-list"></i> Appuntamenti del Giorno
                </h4>
                <span class="text-[10px] bg-sky-900/50 text-sky-300 px-2 py-0.5 rounded font-bold">RECAP</span>
              </div>
              <div id="recap-lista-appuntamenti" class="space-y-1.5 max-h-32 overflow-y-auto pr-1"></div>
            </div>

            <!-- FORM AGGIUNGI PROMEMORIA -->
            <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 class="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <i class="fa-solid fa-circle-plus"></i> AGGIUNGI PROMEMORIA / ATTIVITÀ
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1">Titolo Attività</label>
                  <input type="text" id="input-titolo-attivita" placeholder="Es. Audit ISO / Scadenza Verbali" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400">
                </div>
                <div>
                  <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1">Data</label>
                  <input type="date" id="input-data-attivita" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400 cursor-pointer">
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs items-end">
                <div>
                  <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1">Settore Competenza (Q / HS / E)</label>
                  <select id="input-settore-attivita" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400 font-bold">
                    <option value="E">Environment (E - Blu)</option>
                    <option value="HS">Health & Safety (HS - Arancione)</option>
                    <option value="Q">Quality (Q - Verde)</option>
                  </select>
                </div>
                <button onclick="salvaNuovaAttivita()" class="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-2.5 rounded-xl transition shadow-lg cursor-pointer flex items-center justify-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i> Salva in Calendario
                </button>
              </div>
            </div>

            <!-- SCADENZE IN ARCHIVIO -->
            <div class="space-y-2">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-400">SCADENZE IN ARCHIVIO</h4>
              <div id="lista-scadenze-archivio" class="space-y-2 max-h-40 overflow-y-auto pr-1">
                <p class="text-xs text-slate-500 italic">Caricamento scadenze dal Cloud...</p>
              </div>
            </div>

          </div>
        </div>
    `;

    inizializzaHeaderCalendario();
});

let dataCalendarioAttuale = new Date();
const mesi = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];
const giorniSettimana = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
let scadenzeCloudHeader = {};
let dataSelezionataRecap = null;

function inizializzaHeaderCalendario() {
    const oggi = new Date();
    const elMonth = document.getElementById('calMonth');
    const elDay = document.getElementById('calDay');
    const elFullDate = document.getElementById('calFullDate');
    const elInputData = document.getElementById('input-data-attivita');

    if (elMonth) elMonth.innerText = mesi[oggi.getMonth()];
    if (elDay) elDay.innerText = oggi.getDate();
    if (elFullDate) elFullDate.innerText = `${giorniSettimana[oggi.getDay()]}, ${oggi.getDate()} ${mesi[oggi.getMonth()]}`;
    
    if (elInputData) {
        const anno = oggi.getFullYear();
        const mese = String(oggi.getMonth() + 1).padStart(2, '0');
        const giorno = String(oggi.getDate()).padStart(2, '0');
        elInputData.value = `${anno}-${mese}-${giorno}`;
        dataSelezionataRecap = `${anno}-${mese}-${giorno}`;
    }

    if (typeof firebase !== 'undefined') {
        try {
            const db = firebase.database();
            db.ref('scadenze_cantiere').on('value', (snapshot) => {
                scadenzeCloudHeader = snapshot.val() || {};
                renderizzaCalendarioMese();
                renderizzaListaScadenze();
                aggiornaBoxAvvisiHeader();
                if (dataSelezionataRecap) mostraRecapGiorno(dataSelezionataRecap);
            });
        } catch (e) {
            console.log("Firebase non inizializzato nel modulo header.");
        }
    }
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

function cambiaMeseCalendario(delta) {
    dataCalendarioAttuale.setMonth(dataCalendarioAttuale.getMonth() + delta);
    renderizzaCalendarioMese();
}

function selezionaGiornoForm(anno, mese, giorno) {
    const mStr = String(mese + 1).padStart(2, '0');
    const gStr = String(giorno).padStart(2, '0');
    const dataIso = `${anno}-${mStr}-${gStr}`;
    
    const inputData = document.getElementById('input-data-attivita');
    if (inputData) inputData.value = dataIso;

    dataSelezionataRecap = dataIso;
    mostraRecapGiorno(dataIso);
}

function mostraRecapGiorno(dataIso) {
    const boxRecap = document.getElementById('box-recap-giorno');
    const titoloRecap = document.getElementById('recap-data-titolo');
    const listaRecap = document.getElementById('recap-lista-appuntamenti');
    if (!boxRecap || !listaRecap) return;

    boxRecap.classList.remove('hidden');
    titoloRecap.innerHTML = `<i class="fa-solid fa-clipboard-list text-sky-400"></i> Appuntamenti del giorno: ${dataIso.split('-').reverse().join('/')}`;

    const scadenzeDelGiorno = Object.values(scadenzeCloudHeader).filter(s => s.data === dataIso);

    if (scadenzeDelGiorno.length === 0) {
        listaRecap.innerHTML = `<p class="text-xs text-slate-500 italic py-1">Nessun appuntamento o scadenza fissata per questa data.</p>`;
        return;
    }

    listaRecap.innerHTML = scadenzeDelGiorno.map(item => {
        let badgeColor = 'bg-sky-950 text-sky-300 border-sky-800';
        let dotColor = 'bg-sky-400';
        let ambitoNome = 'ENVIRONMENT (E)';

        if (item.settore === 'Q') {
            badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-800';
            dotColor = 'bg-emerald-500';
            ambitoNome = 'QUALITY (Q)';
        } else if (item.settore === 'HS') {
            badgeColor = 'bg-amber-950 text-amber-300 border-amber-800';
            dotColor = 'bg-amber-500';
            ambitoNome = 'HEALTH & SAFETY (HS)';
        }

        const autoreSigla = item.autoreSigla || "LB"; // Sigla con le iniziali (Leone Bastiancich -> LB)

        return `
            <div class="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs">
                <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                    <span class="font-bold text-white">${item.titolo}</span>
                    <span class="px-2 py-0.5 rounded border text-[9px] font-extrabold ${badgeColor}">${ambitoNome}</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
                    <span class="bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700" title="Account Responsabile">Autore: [${autoreSigla}]</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderizzaCalendarioMese() {
    const container = document.getElementById('griglia-calendario-mese');
    const labelMese = document.getElementById('label-mese-corrente');
    if (!container || !labelMese) return;

    container.innerHTML = '';
    const year = dataCalendarioAttuale.getFullYear();
    const month = dataCalendarioAttuale.getMonth();

    labelMese.innerText = `${mesi[month]} ${year}`;

    const primoGiornoMese = new Date(year, month, 1);
    const ultimoGiornoMese = new Date(year, month + 1, 0);
    const totaleGiorni = ultimoGiornoMese.getDate();

    let giornoInizio = primoGiornoMese.getDay() - 1;
    if (giornoInizio === -1) giornoInizio = 6;

    let giornoCorrente = 1;
    let htmlRighe = '';
    let numSettimana = getWeekNumber(primoGiornoMese);
    const oggi = new Date();

    while (giornoCorrente <= totaleGiorni) {
        htmlRighe += `<div class="flex items-center justify-center font-bold text-sky-500/80 bg-slate-900/50 rounded text-[10px]">W${numSettimana}</div>`;
        
        for (let i = 0; i < 7; i++) {
            if ((giornoCorrente === 1 && i < giornoInizio) || giornoCorrente > totaleGiorni) {
                htmlRighe += `<div class="p-1"></div>`;
            } else {
                const mStr = String(month + 1).padStart(2, '0');
                const gStr = String(giornoCorrente).padStart(2, '0');
                const dataIsoKey = `${year}-${mStr}-${gStr}`;
                
                const scadenzeGiorno = Object.values(scadenzeCloudHeader).filter(s => s.data === dataIsoKey);
                const quanti = scadenzeGiorno.length;

                let indicatoriHtml = '';
                if (quanti > 0) {
                    const pallini = scadenzeGiorno.slice(0, 3).map(s => {
                        let colorClass = 'bg-sky-500';
                        if (s.settore === 'Q') colorClass = 'bg-emerald-500';
                        else if (s.settore === 'HS') colorClass = 'bg-amber-500';
                        return `<span class="w-1.5 h-1.5 rounded-full ${colorClass}"></span>`;
                    }).join('');

                    const counterBadge = quanti > 1 ? `<span class="text-[8px] font-black text-white px-1 bg-slate-800 rounded-full leading-none">${quanti}</span>` : '';

                    indicatoriHtml = `
                        <div class="absolute bottom-1 flex items-center gap-0.5">
                            ${pallini}
                            ${counterBadge}
                        </div>
                    `;
                }

                let isOggi = (giornoCorrente === oggi.getDate() && month === oggi.getMonth() && year === oggi.getFullYear()) 
                    ? 'border-2 border-sky-400 font-black text-sky-300' 
                    : 'border border-slate-800 text-slate-300';

                if (dataSelezionataRecap === dataIsoKey) {
                    isOggi += ' ring-2 ring-sky-500 bg-sky-950/40';
                }

                htmlRighe += `
                    <div onclick="selezionaGiornoForm(${year}, ${month}, ${giornoCorrente})" class="p-1 rounded-lg transition text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 flex flex-col items-center justify-between min-h-[40px] cursor-pointer relative ${isOggi}">
                        <span>${giornoCorrente}</span>
                        ${indicatoriHtml}
                    </div>`;
                giornoCorrente++;
            }
        }
        numSettimana++;
    }
    container.innerHTML = htmlRighe;
}

function salvaNuovaAttivita() {
    const titolo = document.getElementById('input-titolo-attivita').value.trim();
    const data = document.getElementById('input-data-attivita').value;
    const settore = document.getElementById('input-settore-attivita').value;

    if (!titolo || !data) {
        alert("Inserisci un titolo e seleziona una data valida.");
        return;
    }

    if (typeof firebase === 'undefined') {
        alert("Errore: Firebase non connesso.");
        return;
    }

    const db = firebase.database();
    const id = "scad_" + Date.now();
    const payload = {
        id: id,
        titolo: titolo,
        data: data,
        settore: settore,
        autoreSigla: "LB", // Salva la sigla LB (Leone Bastiancich)
        timestamp: Date.now()
    };

    db.ref('scadenze_cantiere/' + id).set(payload, (err) => {
        if (err) {
            alert("Errore salvataggio: " + err.message);
        } else {
            document.getElementById('input-titolo-attivita').value = '';
            alert("📅 Promemoria salvato con successo nel Cloud!");
            dataSelezionataRecap = data;
            mostraRecapGiorno(data);
        }
    });
}

function eliminaScadenza(id) {
    if (confirm("Vuoi eliminare questa scadenza dall'archivio?")) {
        if (typeof firebase !== 'undefined') {
            firebase.database().ref('scadenze_cantiere/' + id).remove();
        }
    }
}

function aggiornaBoxAvvisiHeader() {
    const boxAvviso = document.getElementById('testo-prossima-scadenza');
    if (!boxAvviso) return;
    const keys = Object.keys(scadenzeCloudHeader);
    if (keys.length === 0) {
        boxAvviso.innerText = "Nessun promemoria attivo";
        return;
    }
    keys.sort((a,b) => new Date(scadenzeCloudHeader[a].data) - new Date(scadenzeCloudHeader[b].data));
    boxAvviso.innerText = scadenzeCloudHeader[keys[0]].titolo;
}

function renderizzaListaScadenze() {
    const container = document.getElementById('lista-scadenze-archivio');
    if (!container) return;

    container.innerHTML = '';
    const keys = Object.keys(scadenzeCloudHeader);

    if (keys.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-500 italic">Nessuna scadenza in archivio.</p>';
        return;
    }

    keys.sort((a,b) => new Date(scadenzeCloudHeader[a].data) - new Date(scadenzeCloudHeader[b].data));

    keys.forEach(key => {
        const item = scadenzeCloudHeader[key];
        
        let badgeColore = 'bg-sky-950 text-sky-300 border-sky-800';
        let puntoColore = 'bg-sky-500';
        let nomeSettore = 'ENVIRONMENT (E)';

        if (item.settore === 'Q') {
            badgeColore = 'bg-emerald-950 text-emerald-300 border-emerald-800';
            puntoColore = 'bg-emerald-500';
            nomeSettore = 'QUALITY (Q)';
        } else if (item.settore === 'HS') {
            badgeColore = 'bg-amber-950 text-amber-300 border-amber-800';
            puntoColore = 'bg-amber-500';
            nomeSettore = 'HEALTH & SAFETY (HS)';
        }

        const autoreSigla = item.autoreSigla || "LB";

        const div = document.createElement('div');
        div.className = "flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm text-xs";
        div.innerHTML = `
            <div class="flex items-start gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full ${puntoColore} mt-1 flex-shrink-0"></span>
                <div>
                    <div class="font-bold text-white">${item.titolo}</div>
                    <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span><i class="fa-regular fa-calendar"></i> ${item.data}</span>
                        <span class="px-2 py-0.5 rounded border text-[9px] font-extrabold ${badgeColore}">${nomeSettore}</span>
                        <span class="text-sky-400 font-semibold">• Autore: [${autoreSigla}]</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-1.5">
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('Promemoria Cantiere Terzo Valico [' + item.settore + ']: ' + item.titolo + ' in data ' + item.data + ' (Autore: [' + autoreSigla + '])')}" target="_blank" class="w-7 h-7 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-lg flex items-center justify-center transition" title="Condividi su WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
                <button onclick="eliminaScadenza('${key}')" class="w-7 h-7 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 rounded-lg flex items-center justify-center transition" title="Elimina">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function apriGestoreScadenze() {
    const modal = document.getElementById('modal-scadenze');
    if (modal) {
        modal.classList.remove('hidden');
        renderizzaCalendarioMese();
        if (dataSelezionataRecap) mostraRecapGiorno(dataSelezionataRecap);
    }
}

function chiudiGestoreScadenze() {
    const modal = document.getElementById('modal-scadenze');
    if (modal) modal.classList.add('hidden');
}

function toggleUserMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('userMenu');
    if (menu) menu.classList.toggle('hidden');
}

window.addEventListener('click', function() {
    const menu = document.getElementById('userMenu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

function handleLogout(event) {
    event.preventDefault();
    const isInsideSubfolder = window.location.pathname.includes('/pages/');
    const logoutTarget = isInsideSubfolder ? "../../index.html" : "index.html";
    window.location.href = logoutTarget;
}
