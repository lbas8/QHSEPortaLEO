document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("app-header");
    if (!headerContainer) return;

    // Determina il percorso relativo corretto in base alla posizione della pagina
    const isInsideSubfolder = window.location.pathname.includes('/pages/');
    const logoPath = isInsideSubfolder ? "../../logowb.jpeg" : "logowb.jpeg";
    const logoutPath = isInsideSubfolder ? "../../index.html" : "index.html";

    headerContainer.innerHTML = `
        <header class="w-full bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              <!-- Logo e Titolo -->
              <div class="flex items-center gap-4">
                <img src="${logoPath}" alt="Webuild" class="h-10 object-contain rounded bg-white p-1" onerror="this.src='https://via.placeholder.com/120x40?text=WEBUILD'">
                <div class="h-8 w-[1px] bg-slate-700 hidden sm:block"></div>
                <div>
                  <h1 class="font-black text-lg tracking-wide uppercase text-slate-100">Portale QHSE Cantiere</h1>
                  <p class="text-xs text-sky-400 font-semibold">Quarto Valico dei Giovi — VICOC</p>
                </div>
              </div>
              
              <!-- Area Destra: Stato, Widget Calendario & Profilo Utente -->
              <div class="flex items-center gap-3 sm:gap-4">
                
                <!-- Stato Sistema -->
                <span class="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sistema Attivo
                </span>

                <!-- WIDGET CALENDARIO & SCADENZE -->
                <div class="relative">
                  <button onclick="toggleCalendarWidget(event)" class="relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3 py-2 rounded-xl transition text-slate-200 focus:outline-none">
                    <i class="fa-solid fa-calendar-days text-sky-400 text-base"></i>
                    <span class="hidden sm:inline text-xs font-bold">Scadenze</span>
                    <span id="calendarBadge" class="hidden absolute -top-1.5 -right-1.5 w-5 h-5 bg-sky-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-900">0</span>
                  </button>

                  <!-- Pannello Dropdown Calendario / Promemoria -->
                  <div id="calendarDropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-xl" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-clock text-sky-400"></i>
                        <h4 class="text-sm font-black text-white uppercase tracking-wide">AGGIUNGI PROMEMORIA / ATTIVITÀ</h4>
                      </div>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">CANTIERE</span>
                    </div>

                    <!-- Form di Inserimento -->
                    <form onsubmit="addReminder(event)" class="flex flex-col gap-2.5 mb-4">
                      <div>
                        <input type="text" id="reminderText" placeholder="Es. Campionamento acque ITA / Audit ISO" required class="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500">
                      </div>
                      <div class="flex gap-2">
                        <input type="date" id="reminderDate" required class="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500">
                        <button type="submit" class="bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1">
                          <i class="fa-solid fa-plus"></i> Salva
                        </button>
                      </div>
                    </form>

                    <!-- Lista Scadenze Registrate -->
                    <div class="border-t border-slate-800 pt-3">
                      <p class="text-[11px] font-extrabold uppercase text-slate-400 mb-2 tracking-wider">Prossimi Appuntamenti</p>
                      <ul id="reminderList" class="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
                        <!-- Popolato via JS -->
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Profilo Utente Dropdown (Ciao Leone) -->
                <div class="relative">
                  <button onclick="toggleUserMenu(event)" class="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl transition text-left focus:outline-none">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white font-black text-sm shadow">
                      L
                    </div>
                    <div class="hidden md:block">
                      <p class="text-xs text-slate-400 leading-tight">Benvenuto</p>
                      <p class="text-sm font-bold text-slate-100">Ciao Leone</p>
                    </div>
                    <i class="fa-solid fa-chevron-down text-xs text-slate-400 ml-1"></i>
                  </button>

                  <!-- Menu a tendina Logout -->
                  <div id="userMenu" class="hidden absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                    <div class="px-4 py-2 border-b border-slate-800 md:hidden">
                      <p class="text-xs text-slate-400">Benvenuto</p>
                      <p class="text-sm font-bold text-slate-100">Ciao Leone</p>
                    </div>
                    <a href="${logoutPath}" onclick="handleLogout(event)" class="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition">
                      <i class="fa-solid fa-right-from-bracket text-sm"></i> Cambia Account / Logout
                    </a>
                  </div>
                </div>

              </div>
            </div>
        </header>
    `;

    // Carica le scadenze esistenti da localStorage
    renderReminders();
});

/* FUNZIONALITÀ DROPDOWN UTENTE E LOGOUT */
function toggleUserMenu(event) {
    event.stopPropagation();
    const calendarDropdown = document.getElementById('calendarDropdown');
    if (calendarDropdown) calendarDropdown.classList.add('hidden');
    
    const menu = document.getElementById('userMenu');
    if (menu) menu.classList.toggle('hidden');
}

function handleLogout(event) {
    event.preventDefault();
    const isInsideSubfolder = window.location.pathname.includes('/pages/');
    const logoutTarget = isInsideSubfolder ? "../../index.html" : "index.html";
    window.location.href = logoutTarget;
}

/* FUNZIONALITÀ CALENDARIO / PROMEMORIA */
function toggleCalendarWidget(event) {
    event.stopPropagation();
    const userMenu = document.getElementById('userMenu');
    if (userMenu) userMenu.classList.add('hidden');

    const calendarDropdown = document.getElementById('calendarDropdown');
    if (calendarDropdown) calendarDropdown.classList.toggle('hidden');
}

// Chiusura automatica dei menu cliccando all'esterno
window.addEventListener('click', function () {
    const userMenu = document.getElementById('userMenu');
    if (userMenu && !userMenu.classList.contains('hidden')) {
        userMenu.classList.add('hidden');
    }
    const calendarDropdown = document.getElementById('calendarDropdown');
    if (calendarDropdown && !calendarDropdown.classList.contains('hidden')) {
        calendarDropdown.classList.add('hidden');
    }
});

/* GESTIONE SCADENZE LOCAL STORAGE */
function getReminders() {
    return JSON.parse(localStorage.getItem('qhse_reminders') || '[]');
}

function addReminder(event) {
    event.preventDefault();
    const textInput = document.getElementById('reminderText');
    const dateInput = document.getElementById('reminderDate');

    if (!textInput.value.trim() || !dateInput.value) return;

    const reminders = getReminders();
    reminders.push({
        id: Date.now(),
        title: textInput.value.trim(),
        date: dateInput.value
    });

    // Ordina per data crescente
    reminders.sort((a, b) => new Date(a.date) - new Date(b.date));

    localStorage.setItem('qhse_reminders', JSON.stringify(reminders));
    textInput.value = '';
    dateInput.value = '';

    renderReminders();
}

function deleteReminder(id) {
    let reminders = getReminders();
    reminders = reminders.filter(r => r.id !== id);
    localStorage.setItem('qhse_reminders', JSON.stringify(reminders));
    renderReminders();
}

function renderReminders() {
    const list = document.getElementById('reminderList');
    const badge = document.getElementById('calendarBadge');
    if (!list || !badge) return;

    const reminders = getReminders();

    if (reminders.length > 0) {
        badge.innerText = reminders.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    if (reminders.length === 0) {
        list.innerHTML = `<li class="text-xs text-slate-500 italic text-center py-2">Nessun promemoria salvato</li>`;
        return;
    }

    list.innerHTML = reminders.map(item => {
        const formattedDate = new Date(item.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `
            <li class="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-xs">
                <div class="flex flex-col gap-0.5">
                    <span class="font-semibold text-slate-200">${item.title}</span>
                    <span class="text-[10px] text-sky-400 font-bold"><i class="fa-regular fa-clock"></i> ${formattedDate}</span>
                </div>
                <button onclick="deleteReminder(${item.id})" class="text-slate-500 hover:text-rose-400 p-1 transition">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </li>
        `;
    }).join('');
}
