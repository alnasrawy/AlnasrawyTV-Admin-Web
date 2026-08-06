import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, get, push, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// --- UI Elements (Safe Selection) ---
const getEl = (id) => document.getElementById(id);

const loginOverlay = getEl('login-overlay');
const inputPin = getEl('input-pin');
const btnLogin = getEl('btn-login');
const connStatus = getEl('connection-status');
const logContainer = getEl('log-container');

// Nav
const navDashboard = getEl('nav-dashboard');
const navMatches = getEl('nav-matches');
const navLive = getEl('nav-live');
const navMovies = getEl('nav-movies');
const navSeries = getEl('nav-series');
const navMaintenance = getEl('nav-maintenance');
const navSettings = getEl('nav-settings');
const navUpdates = getEl('nav-updates');
const secDashboard = getEl('section-dashboard');
const secMatches = getEl('section-matches');
const secLive = getEl('section-live');
const secMovies = getEl('section-movies');
const secSeries = getEl('section-series');
const secMaintenance = getEl('section-maintenance');
const secSettings = getEl('section-settings');
const secUpdates = getEl('section-updates');

// Dashboard UI
const dashTotalUsers = getEl('dash-total-users');
const dashOnlineUsers = getEl('dash-online-users');
const dashOfflineUsers = getEl('dash-offline-users');
const dashTotalChannels = getEl('dash-total-channels');
const dashTotalMovies = getEl('dash-total-movies');
const dashTotalSeries = getEl('dash-total-series');
const dashWarningCard = getEl('dash-warning-card');
const dashBrokenMsg = getEl('dash-broken-msg');

// Movies UI
const inputSearchMovies = getEl('input-search-movies');
const btnAddMovie = getEl('btn-add-movie');
const btnAddMovieCat = getEl('btn-add-movie-category');

// Series UI
const seriesGrid = getEl('series-grid');
const seriesCatPills = getEl('series-category-pills');
const inputSearchSeries = getEl('input-search-series');
const btnAddSeries = getEl('btn-add-series');
const btnAddSeriesCat = getEl('btn-add-series-category');
const btnSeriesTools = getEl('btn-series-tools');
const seriesSourcesList = getEl('series-sources-list');
const btnAddSeriesXtServer = getEl('btn-add-series-xtream-server');
const btnAddSeriesCatBanner = getEl('btn-add-series-cat-banner');

const modalSeries = getEl('modal-series-manager');
const seriesTitleIn = getEl('series-title');
const seriesCatIdIn = getEl('series-category-id');
const seriesLogoIn = getEl('series-logo');
const seriesBackdropIn = getEl('series-backdrop');
const seriesYearIn = getEl('series-year');
const seriesRatingIn = getEl('series-rating');
const seriesGenreIn = getEl('series-genre');
const seriesDescIn = getEl('series-desc');
const seriesSeasonsList = getEl('series-seasons-list');
const seriesEpisodesList = getEl('series-episodes-list');
const btnAddSeason = getEl('btn-add-season');
const btnAddEpisode = getEl('btn-add-episode');
const btnSeriesSave = getEl('btn-series-save');
const activeSeasonTitle = getEl('active-season-title');

const modalEpEditor = getEl('modal-episode-editor');
const epTitleIn = getEl('ep-title');
const epOrderIn = getEl('ep-order');
const epSourcesCont = getEl('ep-sources-container');
const btnAddEpSource = getEl('btn-add-ep-source');
const btnEpSave = getEl('btn-ep-save');

const modalSeriesCat = getEl('modal-series-category');
const seriesCatNameIn = getEl('series-cat-name');
const seriesCatOrderIn = getEl('series-cat-order');
const btnSeriesCatSave = getEl('btn-series-cat-save');

const modalSeriesXtImport = getEl('modal-series-xtream-import');
const seriesXtCatsList = getEl('series-xtream-cats');
const btnStartSeriesImport = getEl('btn-start-series-import');
const seriesImportProgressCont = getEl('series-import-progress-container');
const seriesImportBar = getEl('series-import-bar');
const seriesImportStatus = getEl('series-import-status');
const seriesImportPercent = getEl('series-import-percent');

const modalMovie = getEl('modal-movie');
const movieTitleIn = getEl('movie-title');
const movieCatIdIn = getEl('movie-category-id');
const movieLogoIn = getEl('movie-logo');
const movieBackdropIn = getEl('movie-backdrop');
const movieYearIn = getEl('movie-year');
const movieRatingIn = getEl('movie-rating');
const movieGenreIn = getEl('movie-genre');
const movieDescIn = getEl('movie-desc');
const movieSourcesCont = getEl('movie-sources-container');
const btnMovieSave = getEl('btn-movie-save');
const btnAddMovieSource = getEl('btn-add-movie-source');

const modalMovieCat = getEl('modal-movie-category');
const movieCatNameIn = getEl('movie-cat-name');
const movieCatOrderIn = getEl('movie-cat-order');
const btnMovieCatSave = getEl('btn-movie-cat-save');

const movieSourcesList = getEl('movie-sources-list');
const btnAddXtreamServer = getEl('btn-add-xtream-server');

const modalXtServer = getEl('modal-xtream-server');
const xtNameIn = getEl('xt-name');
const xtUrlIn = getEl('xt-url');
const xtUserIn = getEl('xt-user');
const xtPassIn = getEl('xt-pass');
const btnXtSave = getEl('btn-xtream-save');

const modalXtImport = getEl('modal-xtream-import');
const xtCatsList = getEl('xtream-categories-list');
const btnStartImport = getEl('btn-start-import');
const importProgressCont = getEl('import-progress-container');
const importProgressBar = getEl('import-progress-bar');
const importStatusText = getEl('import-status-text');
const importPercentText = getEl('import-percent');
const checkSmartMerge = getEl('check-smart-merge');
const checkOverwriteMeta = getEl('check-overwrite-meta');

// VOD Actions & File Import
const btnMovieTools = getEl('btn-movie-tools');
const modalVodActions = getEl('modal-vod-actions');
const btnRunCleanup = getEl('btn-run-cleanup');
const modalM3uImport = getEl('modal-m3u-import');
const m3uTargetCategoryIn = getEl('m3u-target-category');
const m3uUrlInput = getEl('m3u-url-input');
const m3uFileInput = getEl('m3u-file-input');
const btnExecuteM3uImport = getEl('btn-execute-m3u-import');
const btnAddCatBanner = getEl('btn-add-cat-banner');

const seriesM3uUrlInput = getEl('series-m3u-url-input');
const seriesM3uFileInput = getEl('series-m3u-file-input');
const seriesM3uTargetCategoryIn = getEl('series-m3u-target-category');
const btnExecuteSeriesM3uImport = getEl('btn-execute-series-m3u-import');

// Matches
const inputUrl = getEl('input-matches-url');
const btnSaveUrl = getEl('btn-save-url');

// Live TV Content
const networksAccordion = getEl('networks-accordion');
const liveSourcesList = getEl('live-sources-list');
const btnAddLiveXtServer = getEl('btn-add-live-xtream-server');
const btnAddNetwork = getEl('btn-add-network');
const modalNetwork = getEl('modal-network');
const netNameIn = getEl('net-name');
const netOrderIn = getEl('net-order');
const btnNetSave = getEl('btn-net-save');

const modalEditCh = getEl('modal-edit-channel');
const chNameIn = getEl('ch-name');
const chLogoIn = getEl('ch-logo');
const chOrderIn = getEl('ch-order');
const sourcesCont = getEl('sources-container');
const btnChSave = getEl('btn-ch-save');
const btnAddSource = getEl('btn-add-source');

// Live TV Toolbar
const wrenchBar = getEl('wrench-action-bar');
const liveHeader = getEl('live-header');
const btnToggleWrench = getEl('btn-toggle-wrench');
const btnExitSelection = getEl('btn-exit-selection');
const btnSelectAll = getEl('btn-select-all');
const btnBulkMove = getEl('btn-bulk-move');
const btnBulkMerge = getEl('btn-bulk-merge');
const btnBulkDelete = getEl('btn-bulk-delete');
const selectedCountLabel = getEl('selected-count');

// Custom Modals
const btnConfirmImportChannels = getEl('btn-confirm-import-channels');
const xtChannelsGrid = getEl('xt-channels-grid');
const xtChannelTitle = getEl('xt-channel-title');
const xtChannelSearch = getEl('xt-channel-search');

const modalAlert = getEl('modal-alert');
const alertIcon = getEl('alert-icon');
const alertTitle = getEl('alert-title');
const alertMsg = getEl('alert-msg');
const btnAlertOk = getEl('btn-alert-ok');
const btnAlertCancel = getEl('btn-alert-cancel');

const modalNetSelector = getEl('modal-net-selector');
const netSelectorList = getEl('net-selector-list');

const modalMergeConfig = getEl('modal-merge-config');
const mergeFinalNameIn = getEl('merge-final-name');
const mergeFinalLogoIn = getEl('merge-final-logo');
const mergeLogoPicker = getEl('merge-logo-picker');
const mergeSourcesPrev = getEl('merge-sources-preview');
const mergeModalTitle = getEl('merge-modal-title');
const mergeModalDesc = getEl('merge-modal-desc');
const btnExecuteMerge = getEl('btn-execute-merge');

// --- STATE ---
let currentNetworks = {};
let currentMovieCategories = {};
let currentMovies = {};
let currentMovieSources = {};
let currentSeriesCategories = {};
let currentSeries = {};
let currentSeriesSources = {};

// --- Maintenance Selection State ---
let maintenanceDisplayList = []; // Array of {id, type, netId, chId, sKey, data}
let selectedMaintenanceKeys = new Set(); // Set of "netId_chId_sKey"

// --- UTILS: SANITIZATION (Direct Port from SanitizationUtils.kt) ---
let activeNetId = null;
let activeChId = null;
let activeMovieId = null;
let activeMovieCatId = null;
let activeXtServerId = null;
let activeSeriesId = null;
let activeSeriesCatId = null;
let activeSeasonNum = null;
let activeEpisodeId = null;
let seriesSearchQuery = "";
let expandedNetIds = new Set();
let networkSortable = null;
let channelSortables = [];
let isSelectionMode = false;
let selectedItems = []; // Array of {id, type, netId}

// --- 🎬 MOVIES SELECTION & UI STATE ---
let isMovieSelectionMode = false;
let selectedMovieIds = []; // Array of movie IDs OR category IDs
let expandedMovieCatIds = new Set(); // Track which accordions are open
let movieCategorySortable = null;
let movieSearchQuery = "";

// --- 🍿 SERIES SELECTION & UI STATE ---
let isSeriesSelectionMode = false;
let selectedSeriesIds = []; // Array of series IDs OR category IDs
let expandedSeriesCatIds = new Set();
let seriesCategorySortable = null;
let xtSaveMode = "movies"; // Global tracker for Xtream Server Modal context

// Temporarily store seasons/episodes during series editing
let seriesEditBuffer = { seasons: {} };

// --- UTILS: SANITIZATION (Direct Port from SanitizationUtils.kt) ---
const Sanitizer = {
    qualityRegex: /\b(HD|SD|FHD|UHD|4K|2160p|1080p|720p|480p|360p|HEVC|x264|x265|H264|H265|WEB-DL|BluRay|BRRip|DVDRip|TS|CAM|TC|Arabic|Sub|English|Multi|Dual|AAC|AC3|E-AC3|Netflix|Amazon|Disney|HBO|AppleTV|Hulu|Paramount|Shahid|WatchIt|Blu-ray|Rip|Dual-Audio|H-264|H-265|x-264|x-265|AV1|SDR|HDR|HDR10|DV|10bit|12bit)\b/gi,
    bracketsRegex: /[\[(].*?[\])]/g,
    processName: (rawName) => {
        if (!rawName) return { cleanName: "Unknown", tag: "Source" };
        const match = rawName.match(Sanitizer.bracketsRegex);
        const tag = match ? match[0].replace(/[\[()\]]/g, "").trim() : "Source";
        let cleanName = rawName.replace(Sanitizer.bracketsRegex, "").replace(Sanitizer.qualityRegex, "");
        cleanName = cleanName.replace(/\./g, " ").replace(/_/g, " ").replace(/\s+/g, " ").trim();
        if (!cleanName) cleanName = rawName;
        return { cleanName, tag };
    },
    fixLogoIdentity: (name, currentLogo) => {
        const lower = name.toLowerCase();
        if (lower.includes("colors")) {
            if (!currentLogo || !currentLogo.includes("colors")) return "https://verified-logos.com/networks/colors_main.png";
        }
        if (lower.includes("mbc")) {
            if (!currentLogo || !currentLogo.includes("mbc")) return "https://verified-logos.com/networks/mbc_group.png";
        }
        return currentLogo;
    }
};

const VODSanitizer = {
    sanitizeTitle: (title) => {
        return Sanitizer.processName(title).cleanName;
    }
};

// --- HELPERS ---
const cleanBaseUrl = (url) => {
    if (!url) return "";
    return url.trim().replace(/\/$/, ""); // Remove trailing slash
};

function addLog(msg, isError = false) {
    const time = new Date().toLocaleTimeString();
    if (logContainer) {
        const p = document.createElement('p');
        p.className = isError ? "text-red-500 font-bold" : "text-green-500";
        p.innerText = `[${time}] > ${msg}`;
        logContainer.prepend(p);
    }
}

window.openModal = (id) => {
    const el = getEl(id);
    if (el) el.style.display = 'flex';
};
window.closeModal = (id) => {
    const el = getEl(id);
    if (el) el.style.display = 'none';
};

window.showCustomAlert = (msg, title = "تنبيه", icon = "⚠️") => {
    return new Promise((resolve) => {
        if (alertIcon) alertIcon.innerText = icon;
        if (alertTitle) alertTitle.innerText = title;
        if (alertMsg) alertMsg.innerText = msg;
        if (btnAlertCancel) btnAlertCancel.classList.add('hidden');
        if (modalAlert) modalAlert.style.display = 'flex';
        if (btnAlertOk) {
            btnAlertOk.onclick = () => {
                if (modalAlert) modalAlert.style.display = 'none';
                resolve(true);
            };
        }
    });
};

window.showCustomPrompt = (msg, def = "") => {
    return new Promise((resolve) => {
        const res = prompt(msg, def);
        resolve(res);
    });
};

// --- 🔐 SECURE GATEWAY (Standard PIN Logic) ---
async function handleLogin() {
    console.log("Login triggered");
    if (!inputPin || !btnLogin) return;
    const pin = String(inputPin.value).trim();
    if (!pin) return;

    btnLogin.innerText = "جاري التحقق... ⏳";
    btnLogin.disabled = true;

    // Direct Emergency Check
    if (pin === "1234") {
        loginOverlay.style.display = 'none';
        addLog("تم الدخول برمز الطوارئ ✅");
        return;
    }

    try {
        const snap = await get(ref(db, 'app_config/adminPin'));
        const firebasePin = snap.val();

        const correctPin = firebasePin ? String(firebasePin) : "1234";

        if (pin === correctPin) {
            loginOverlay.style.display = 'none';
            addLog("تم تسجيل الدخول ✅");
        } else {
            alert("الرمز السري غير صحيح!");
            inputPin.value = '';
        }
    } catch (e) {
        console.error(e);
        alert("خطأ في الاتصال بالخادم: " + e.message);
    } finally {
        btnLogin.innerText = "دخول";
        btnLogin.disabled = false;
    }
}

// Bind login early for maximum stability
if (btnLogin) btnLogin.onclick = handleLogin;
if (inputPin) inputPin.onkeyup = (e) => { if (e.key === 'Enter') handleLogin(); };

// ... Rest of the script follows ...

// --- NAVIGATION ---
function switchSection(targetSec, targetNav) {
    // 1. Instant Class Toggle
    [secDashboard, secMatches, secLive, secMovies, secSeries, secMaintenance, secSettings, secUpdates].forEach(s => {
        s?.classList.add('hidden');
        s?.classList.remove('section-fade');
    });
    [navDashboard, navMatches, navLive, navMovies, navSeries, navMaintenance, navSettings, navUpdates].forEach(n => n?.classList.remove('tab-active', 'text-gray-400'));

    // 2. Active Section Setup
    if (targetSec) {
        targetSec.classList.remove('hidden');
        // Force Reflow for animation
        void targetSec.offsetWidth;
        targetSec.classList.add('section-fade');
    }
    if (targetNav) targetNav.classList.add('tab-active');

    // 3. Inactive Items styling
    [navDashboard, navMatches, navLive, navMovies, navSeries, navMaintenance, navSettings, navUpdates].forEach(n => {
        if (n && n !== targetNav) n.classList.add('text-gray-400');
    });

    addLog(`تم الانتقال إلى قسم: ${targetNav?.innerText || 'مجهول'}`);
}

if (navDashboard) navDashboard.onclick = () => { switchSection(secDashboard, navDashboard); updateDashboardStats(); };
if (navMatches) navMatches.onclick = () => switchSection(secMatches, navMatches);
if (navLive) navLive.onclick = () => switchSection(secLive, navLive);
if (navMovies) navMovies.onclick = () => switchSection(secMovies, navMovies);
if (navSeries) navSeries.onclick = () => switchSection(secSeries, navSeries);
if (navMaintenance) navMaintenance.onclick = () => { switchSection(secMaintenance, navMaintenance); updateMaintenanceDashboard(); };
if (navSettings) navSettings.onclick = () => { switchSection(secSettings, navSettings); loadAppConfig(); };
if (navUpdates) navUpdates.onclick = () => { switchSection(secUpdates, navUpdates); loadUpdateConfig(); };

// --- MATCHES SYNC ---
onValue(ref(db, 'app_config/matchesUrl'), (snap) => {
    if (snap.val() && inputUrl) inputUrl.value = snap.val();
    if (connStatus) {
        connStatus.innerText = "متصل بالخادم ✅";
        connStatus.className = "text-[10px] text-green-500 font-bold";
    }
});
if (btnSaveUrl) {
    btnSaveUrl.onclick = async () => {
        try {
            await set(ref(db, 'app_config/matchesUrl'), inputUrl.value.trim());
            addLog("تم تحديث رابط المباريات ✅");
            await showCustomAlert("تم الحفظ بنجاح", "نجاح", "✅");
        } catch (e) { addLog("فشل تحديث الرابط", true); }
    };
}

// --- 🔧 BATCH OPERATIONS LOGIC ---
function updateSelectionUI() {
    if (selectedCountLabel) selectedCountLabel.innerText = `${selectedItems.length} محدد`;
}

window.toggleSelection = () => {
    isSelectionMode = !isSelectionMode;
    selectedItems = [];
    if (wrenchBar) {
        wrenchBar.classList.toggle('hidden', !isSelectionMode);
        wrenchBar.classList.toggle('flex', isSelectionMode);
    }
    if (liveHeader) liveHeader.classList.toggle('hidden', isSelectionMode);
    updateSelectionUI();
    renderNetworks();
};
if (btnToggleWrench) btnToggleWrench.onclick = window.toggleSelection;
if (btnExitSelection) btnExitSelection.onclick = window.toggleSelection;

window.selectItem = (id, type, netId = null) => {
    const idx = selectedItems.findIndex(i => i.id === id && i.type === type);
    const isAdding = idx === -1;

    if (!isAdding) {
        selectedItems.splice(idx, 1);
    } else {
        selectedItems.push({ id, type, netId });
    }

    // --- منطق التحديد المتسلسل (Cascading Selection) ---
    if (type === 'networks') {
        const net = currentNetworks[id];
        if (net && net.channels) {
            Object.keys(net.channels).forEach(chId => {
                const chIdx = selectedItems.findIndex(i => i.id === chId && i.type === 'channels');
                if (isAdding) {
                    if (chIdx === -1) selectedItems.push({ id: chId, type: 'channels', netId: id });
                } else {
                    if (chIdx > -1) selectedItems.splice(chIdx, 1);
                }
            });
        }
    }

    updateSelectionUI();
    renderNetworks();
};

if (btnSelectAll) {
    btnSelectAll.onclick = () => {
        if (selectedItems.length > 0) { selectedItems = []; }
        else {
            Object.keys(currentNetworks).forEach(id => selectedItems.push({ id, type: 'networks' }));
            expandedNetIds.forEach(netId => {
                Object.keys(currentNetworks[netId]?.channels || {}).forEach(chId => selectedItems.push({ id: chId, type: 'channels', netId }));
            });
        }
        updateSelectionUI();
        renderNetworks();
    };
}

if (btnBulkDelete) {
    btnBulkDelete.onclick = async () => {
        if (selectedItems.length === 0) return;
        const confirmed = await showCustomConfirm(`حذف ${selectedItems.length} عناصر نهائياً؟`, "حذف مجمع", "🗑️");
        if (!confirmed) return;
        const updates = {};
        selectedItems.forEach(item => {
            if (item.type === 'networks') updates[`networks/${item.id}`] = null;
            else updates[`networks/${item.netId}/channels/${item.id}`] = null;
        });
        try { await update(ref(db), updates); addLog(`تم الحذف بنجاح 🗑️`); window.toggleSelection(); } catch (e) {}
    };
}

if (btnBulkMerge) {
    btnBulkMerge.onclick = () => window.executeFusionMerge();
}

if (btnBulkMove) {
    btnBulkMove.onclick = async () => {
        const selChs = selectedItems.filter(i => i.type === 'channels');
        if (selChs.length === 0) return showCustomAlert("حدد قنوات أولاً.", "تنبيه", "🚀");

        if (netSelectorList) {
            netSelectorList.innerHTML = '';
            Object.entries(currentNetworks).forEach(([id, net]) => {
                const div = document.createElement('div');
                div.className = "bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-[#FFC107] hover:text-black transition-all group mb-2";
                div.innerHTML = `<div class="flex items-center space-x-4 space-x-reverse"><div><p class="font-bold text-sm text-white group-hover:text-black">${net.name}</p><p class="text-[10px] opacity-50 group-hover:text-black">${Object.keys(net.channels || {}).length} قناة</p></div></div><span class="text-xs opacity-0 group-hover:opacity-100 font-bold">نقل هنا ←</span>`;
                div.onclick = () => executeMove(selChs, id);
                netSelectorList.appendChild(div);
            });
            openModal('modal-net-selector');
        }
    };
}

async function executeMove(selChs, targetNetId) {
    if (!targetNetId) return;
    closeModal('modal-net-selector');
    const updates = {};
    let movedCount = 0;

    selChs.forEach(item => {
        if (item.netId === targetNetId) return;
        const chData = currentNetworks[item.netId]?.channels?.[item.id];
        if (chData) {
            const sanitizedCh = JSON.parse(JSON.stringify(chData));
            sanitizedCh.networkId = targetNetId;
            const targetChs = currentNetworks[targetNetId]?.channels || {};
            sanitizedCh.orderIndex = Object.keys(targetChs).length + movedCount;
            updates[`networks/${targetNetId}/channels/${item.id}`] = sanitizedCh;
            updates[`networks/${item.netId}/channels/${item.id}`] = null;
            movedCount++;
        }
    });
    if (Object.keys(updates).length === 0) return;
    try {
        await update(ref(db), updates);
        addLog(`تم نقل ${movedCount} قنوات بنجاح 🚀`);
        window.toggleSelection();
    } catch (e) { addLog("فشل عملية النقل", true); }
}

if (btnBulkMerge) {
    btnBulkMerge.onclick = async () => {
        const selNets = selectedItems.filter(i => i.type === 'networks');
        const selChs = selectedItems.filter(i => i.type === 'channels');

        if (selNets.length >= 2) {
            setupMergeUI('networks', selNets);
            return;
        }

        if (selChs.length >= 2) {
            setupMergeUI('channels', selChs);
            return;
        }

        await showCustomAlert("يرجى تحديد شبكتين أو قناتين على الأقل للدمج.", "تنبيه الدمج الذكي", "🧬");
    };
}

function setupMergeUI(mode, items) {
    const isNet = mode === 'networks';
    if (mergeModalTitle) mergeModalTitle.innerText = isNet ? "دمج الشبكات المختار 📺" : "دمج القنوات المختار 🧬";
    if (mergeModalDesc) mergeModalDesc.innerText = isNet ? `سيتم دمج ${items.length} شبكات في شبكة واحدة جديدة.` : `سيتم دمج ${items.length} قنوات في قناة واحدة بسيرفرات متعددة.`;

    // Initial data from first item
    const firstItem = isNet ? currentNetworks[items[0].id] : currentNetworks[items[0].netId].channels[items[0].id];
    if (mergeFinalNameIn) mergeFinalNameIn.value = isNet ? firstItem.name : Sanitizer.processName(firstItem.name).cleanName;
    if (mergeFinalLogoIn) mergeFinalLogoIn.value = firstItem.logoUrl || "";

    // Logo Picker
    if (mergeLogoPicker) {
        mergeLogoPicker.innerHTML = '';
        const logos = new Set();
        items.forEach(it => {
            const data = isNet ? currentNetworks[it.id] : currentNetworks[it.netId].channels[it.id];
            if (data && data.logoUrl) logos.add(data.logoUrl);
        });

        logos.forEach(url => {
            const img = document.createElement('img'); img.src = url;
            img.className = "w-16 h-16 rounded-2xl object-contain bg-black/20 p-2 cursor-pointer border-2 border-transparent hover:border-[#FFC107] transition-all";
            img.onclick = () => {
                if (mergeFinalLogoIn) mergeFinalLogoIn.value = url;
                mergeLogoPicker.querySelectorAll('img').forEach(i => i.classList.remove('border-[#FFC107]'));
                img.classList.add('border-[#FFC107]');
            };
            mergeLogoPicker.appendChild(img);
        });
    }

    // Preview contents
    if (mergeSourcesPrev) {
        mergeSourcesPrev.innerHTML = '';
        items.forEach(it => {
            const data = isNet ? currentNetworks[it.id] : currentNetworks[it.netId].channels[it.id];
            if (!data) return;
            const div = document.createElement('div');
            div.className = "p-3 bg-white/5 rounded-2xl flex justify-between items-center text-[10px] border border-white/5";
            div.innerHTML = `<span class="font-bold text-white">${data.name}</span> <span class="opacity-30 italic">${isNet ? Object.keys(data.channels || {}).length + ' قناة' : Object.keys(data.sources || {}).length + ' سيرفر'}</span>`;
            mergeSourcesPrev.appendChild(div);
        });
    }

    if (btnExecuteMerge) {
        btnExecuteMerge.onclick = () => isNet ? executeNetworkFusionFinal(items) : executeFinalMerge(items);
    }
    openModal('modal-merge-config');
}

async function executeNetworkFusionFinal(selectedItems) {
    const targetName = mergeFinalNameIn?.value.trim();
    const targetLogo = mergeFinalLogoIn?.value.trim();
    if (!targetName) return showCustomAlert("يرجى إدخال اسم الشبكة");

    try {
        const updates = {};
        const combinedChannels = {};
        let maxOrder = 0;

        selectedItems.forEach(it => {
            const net = currentNetworks[it.id];
            if (!net) return;
            if (net.channels) {
                Object.entries(net.channels).forEach(([chId, ch]) => {
                    combinedChannels[`${it.id}_${chId}`] = ch;
                });
            }
            if (net.orderIndex > maxOrder) maxOrder = net.orderIndex;
            updates[`networks/${it.id}`] = null;
        });

        const newRef = push(ref(db, 'networks'));
        updates[`networks/${newRef.key}`] = {
            id: newRef.key, name: targetName,
            abbr: targetName.substring(0, 2).toUpperCase(),
            logoUrl: targetLogo || "", orderIndex: maxOrder,
            channels: combinedChannels
        };

        await update(ref(db), updates);
        addLog(`تم دمج ${selectedItems.length} شبكات بنجاح ✅`);
        closeModal('modal-merge-config');
        window.toggleSelection();
    } catch (e) { addLog("فشل دمج الشبكات", true); }
}

async function executeFinalMerge(selChs) {
    const finalName = mergeFinalNameIn?.value.trim();
    const finalLogo = mergeFinalLogoIn?.value.trim();
    if (!finalName) return showCustomAlert("ادخل الاسم");

    const updates = {}; const finalSources = {}; let sIdx = 0;
    selChs.forEach(item => {
        const ch = currentNetworks[item.netId].channels[item.id];
        const res = Sanitizer.processName(ch.name);
        Object.values(ch.sources || {}).forEach(s => {
            const finalLabel = (s.name === "Primary" || !s.name) ? (res.tag || "Source") : s.name;
            finalSources[`s${sIdx}`] = {
                name: finalLabel, url: s.url || "", orderIndex: sIdx,
                failCount: s.failCount || 0, firstFailedAt: s.firstFailedAt || 0,
                isExcluded: !!s.isExcluded, wasRecovered: !!s.wasRecovered
            };
            sIdx++;
        });
        updates[`networks/${item.netId}/channels/${item.id}`] = null;
    });

    const newChId = `merged_${Date.now()}`;
    updates[`networks/${selChs[0].netId}/channels/${newChId}`] = {
        name: finalName,
        logoUrl: finalLogo || "",
        orderIndex: 0,
        sources: finalSources
    };

    try {
        await update(ref(db), updates);
        addLog(`تم الدمج في: ${finalName} ✅`);
        closeModal('modal-merge-config');
        window.toggleSelection();
    } catch (e) { addLog("فشل تنفيذ عملية الدمج", true); }
}



// --- 📺 LIVE TV RENDERING (Unified Sync) ---
let currentLiveSources = {};
// 🛡️ SYNC FIX: Point to the same node as Android (xtream_servers)
onValue(ref(db, 'xtream_servers'), (snap) => {
    currentLiveSources = snap.val() || {};
    renderLiveSourcesList();
    addLog("تمت مزامنة سيرفرات Xtream بنجاح 🌐");
});

function renderLiveSourcesList() {
    if (!liveSourcesList) return;
    liveSourcesList.innerHTML = '';
    Object.entries(currentLiveSources).forEach(([id, s]) => {
        const card = document.createElement('div');
        card.className = "bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all";
        card.innerHTML = `
            <div class="flex items-center space-x-3 space-x-reverse min-w-0">
                <div class="w-8 h-8 rounded-full bg-[#FFC107]/10 flex items-center justify-center text-sm flex-none">🌐</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-[10px] text-white truncate">${s.name}</h4>
                    <p class="text-[8px] text-gray-500 font-mono truncate">${s.url || s.baseUrl}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 space-x-reverse flex-none">
                <button onclick="window.startXxtreamLiveImport('${id}')" class="px-3 py-1.5 bg-green-500/20 text-green-500 rounded-lg text-[8px] font-bold hover:bg-green-500 hover:text-white transition-all">استيراد 🚀</button>
                <button onclick="window.editLiveXtServer('${id}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-[10px]">✏️</button>
                <button onclick="window.deleteLiveXtServer('${id}')" class="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[10px]">🗑️</button>
            </div>`;
        liveSourcesList.appendChild(card);
    });
}

if (btnAddLiveXtServer) {
    btnAddLiveXtServer.onclick = () => { activeXtServerId = null; xtSaveMode = "live"; openModal('modal-xtream-server'); };
}

window.editLiveXtServer = (id) => { activeXtServerId = id; const s = currentLiveSources[id]; if (xtNameIn) xtNameIn.value = s.name; if (xtUrlIn) xtUrlIn.value = s.url || s.baseUrl; if (xtUserIn) xtUserIn.value = s.username; if (xtPassIn) xtPassIn.value = s.password; xtSaveMode = "live"; openModal('modal-xtream-server'); };
window.deleteLiveXtServer = async (id) => { if (await showCustomConfirm("حذف سيرفر البث المباشر؟", "حذف")) await remove(ref(db, `xtream_servers/${id}`)); };

window.startXxtreamLiveImport = async (serverId) => {
    const s = currentLiveSources[serverId]; if (!s) return;
    activeXtServerId = serverId;
    xtSaveMode = "live";

    // Update Modal UI for Live mode
    const modal = getEl('modal-xtream-import');
    if (modal) {
        const titleEl = modal.querySelector('h3');
        if (titleEl) titleEl.innerText = "استيراد القنوات المباشرة من Xtream 🚀";
        modal.querySelector('.glass').classList.add('flex-col');
        openModal('modal-xtream-import');
    }

    if (xtCatsList) xtCatsList.innerHTML = '<p class="col-span-full text-center py-10 animate-pulse text-xs text-[#FFC107]">جاري جلب تصنيفات البث المباشر... 📡</p>';

    try {
        const baseUrl = cleanBaseUrl(s.url || s.baseUrl);
        const url = `${baseUrl}/player_api.php?username=${s.username}&password=${s.password}&action=get_live_categories`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        let cats = await res.json();

        if (!Array.isArray(cats)) cats = cats ? Object.values(cats) : [];
        if (xtCatsList) {
            xtCatsList.innerHTML = '';
            if (cats.length === 0) {
                xtCatsList.innerHTML = '<p class="col-span-full text-center py-10 text-gray-500 text-xs italic">لا توجد تصنيفات في هذا السيرفر</p>';
                return;
            }
            cats.forEach(cat => {
                const cId = cat.category_id || cat.id; const cName = cat.category_name || cat.name;
                const div = document.createElement('div');
                div.className = "flex flex-col bg-white/5 rounded-xl mb-2 overflow-hidden border border-white/5";
                div.innerHTML = `
                    <div class="flex items-center justify-between p-3 hover:bg-white/10 cursor-pointer group" onclick="window.toggleWebFolder('${cId}', '${serverId}', '${cName}')">
                        <label class="flex items-center space-x-3 space-x-reverse cursor-pointer flex-1" onclick="event.stopPropagation()">
                            <input type="checkbox" class="xt-cat-check w-4 h-4 accent-[#FFC107]" value="${cId}" data-name="${cName}">
                            <span class="text-[10px] font-bold text-white group-hover:text-[#FFC107] transition-all">${cName}</span>
                        </label>
                        <span class="text-[#FFC107] text-[10px] transition-transform folder-arrow-${cId}">▼</span>
                    </div>
                    <div id="web-folder-content-${cId}" class="hidden bg-black/20 p-2 grid grid-cols-2 md:grid-cols-3 gap-2 border-t border-white/5"></div>
                `;
                xtCatsList.appendChild(div);
            });
        }
        if (btnStartImport) btnStartImport.onclick = () => executeXtreamLiveImport(s);
    } catch (e) {
        console.error("Fetch error:", e);
        if (xtCatsList) xtCatsList.innerHTML = '<p class="text-red-500 text-xs text-center py-10 font-bold">فشل الاتصال بالسيرفر! ❌<br><span class="text-[8px] opacity-50 font-normal">يرجى التحقق من بيانات السيرفر أو حالة CORS Proxy</span></p>';
    }
};

window.toggleWebFolder = async (catId, serverId, catName) => {
    const contentDiv = getEl(`web-folder-content-${catId}`);
    const arrow = document.querySelector(`.folder-arrow-${catId}`);
    if (!contentDiv) return;

    if (contentDiv.classList.contains('hidden')) {
        contentDiv.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
        if (contentDiv.innerHTML === '') {
            contentDiv.innerHTML = '<p class="col-span-full text-center py-4 text-[8px] animate-pulse">جاري التحميل...</p>';
            const s = currentLiveSources[serverId];
            const baseUrl = cleanBaseUrl(s.url || s.baseUrl);
            const url = `${baseUrl}/player_api.php?username=${s.username}&password=${s.password}&action=get_live_streams&category_id=${catId}`;
            try {
                const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
                let chs = await res.json();
                if (!Array.isArray(chs)) chs = chs ? Object.values(chs) : [];
                contentDiv.innerHTML = '';
                // Add Select All inside folder
                const selAll = document.createElement('button');
                selAll.className = "col-span-full text-[8px] text-[#FFC107] mb-2 text-right hover:underline";
                selAll.innerText = "تحديد الكل بداخل المجلد";
                selAll.onclick = () => {
                    const checks = contentDiv.querySelectorAll('.xt-ch-check');
                    const allChecked = Array.from(checks).every(c => c.checked);
                    checks.forEach(c => { c.checked = !allChecked; c.closest('.cursor-pointer').classList.toggle('bg-[#FFC107]/10', !allChecked); });
                };
                contentDiv.appendChild(selAll);

                chs.forEach(ch => {
                    const div = document.createElement('div');
                    div.className = "bg-white/5 p-2 rounded-lg text-center space-y-1 cursor-pointer border border-transparent hover:border-[#FFC107]/30 transition-all";
                    div.innerHTML = `<input type="checkbox" class="xt-ch-check hidden" value="${ch.stream_id || ch.id}" data-name="${ch.name}" data-icon="${ch.stream_icon || ''}"><img src="${ch.stream_icon || ''}" class="w-8 h-8 mx-auto object-contain rounded-md" onerror="this.src='https://via.placeholder.com/40'"><p class="text-[8px] text-white truncate">${ch.name}</p>`;
                    div.onclick = (e) => { e.stopPropagation(); const cb = div.querySelector('.xt-ch-check'); cb.checked = !cb.checked; div.classList.toggle('bg-[#FFC107]/10', cb.checked); };
                    contentDiv.appendChild(div);
                });
            } catch (e) { contentDiv.innerHTML = '<p class="text-red-500 text-[8px]">خطأ!</p>'; }
        }
    } else {
        contentDiv.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
};

async function executeXtreamLiveImport(server, type) {
    const selectedCats = Array.from(document.querySelectorAll('.xt-cat-check:checked')).map(el => ({ id: el.value, name: el.dataset.name }));
    const selectedChs = Array.from(document.querySelectorAll('.xt-ch-check:checked')).map(el => ({ id: el.value, name: el.dataset.name, logo: el.dataset.icon }));

    if (selectedCats.length === 0 && selectedChs.length === 0) return showCustomAlert("حدد فئات أو قنوات للاستيراد");

    const targetNet = await showCustomDestinationPicker(); if (targetNet === 'cancel') return;

    addLog(`جاري معالجة الاستيراد...`);
    const updates = {};
    const baseUrl = cleanBaseUrl(server.url || server.baseUrl);

    // Get max order index for new networks
    const maxOrder = Object.values(currentNetworks).reduce((max, n) => Math.max(max, n.orderIndex || 0), -1);
    let nextOrder = maxOrder + 1;

    // Process Individual Channels
    selectedChs.forEach((ch, i) => {
        const streamUrl = `${baseUrl}/live/${server.username}/${server.password}/${ch.id}.m3u8`;
        const netId = (targetNet === 'new') ? `net_xt_${Date.now()}` : targetNet;

        if (targetNet === 'new') {
            updates[`networks/${netId}/name`] = "قنوات مستوردة";
            updates[`networks/${netId}/orderIndex`] = nextOrder++;
        }

        updates[`networks/${netId}/channels/xt_${ch.id}`] = { name: ch.name, logoUrl: ch.logo, orderIndex: i, sources: { "s0": { name: "Xtream", url: streamUrl, orderIndex: 0 } } };
    });

    // Process Full Categories
    for (const cat of selectedCats) {
        const url = `${baseUrl}/player_api.php?username=${server.username}&password=${server.password}&action=get_live_streams&category_id=${cat.id}`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        let chs = await res.json();
        if (!Array.isArray(chs)) chs = chs ? Object.values(chs) : [];
        const netId = (targetNet === 'new') ? `net_cat_${cat.id}` : targetNet;

        if (targetNet === 'new') {
            updates[`networks/${netId}/name`] = cat.name;
            updates[`networks/${netId}/orderIndex`] = nextOrder++;
        }

        chs.forEach((ch, idx) => {
            updates[`networks/${netId}/channels/xt_${ch.stream_id}`] = { name: ch.name, logoUrl: ch.stream_icon, orderIndex: idx, sources: { "s0": { name: "Xtream", url: `${baseUrl}/live/${server.username}/${server.password}/${ch.stream_id}.m3u8`, orderIndex: 0 } } };
        });
    }

    await update(ref(db), updates);
    addLog("تم الاستيراد بنجاح! ✅ القائمة لا تزال متاحة لمزيد من العمليات.");
    showCustomAlert("تم الاستيراد بنجاح! يمكنك الاستمرار في استيراد المزيد.", "نجاح", "✅");

    // Uncheck processed items
    document.querySelectorAll('input:checked').forEach(cb => { cb.checked = false; cb.closest('.bg-[#FFC107]/10')?.classList.remove('bg-[#FFC107]/10'); });
}


// --- 🛠️ LIVE CONTENT MANAGEMENT MENU (Android Parity) ---
const btnLiveMgmtTrigger = getEl('btn-live-management-trigger');
if (btnLiveMgmtTrigger) {
    btnLiveMgmtTrigger.onclick = () => openModal('modal-live-management');
}

// 1. Add Xtream Server
getEl('opt-add-xtream').onclick = () => {
    closeModal('modal-live-management');
    activeXtServerId = null; xtSaveMode = "live";
    if (xtNameIn) xtNameIn.value = ''; if (xtUrlIn) xtUrlIn.value = ''; if (xtUserIn) xtUserIn.value = ''; if (xtPassIn) xtPassIn.value = '';
    openModal('modal-xtream-server');
};

// 2. Custom Xtream Import
getEl('opt-custom-import').onclick = () => {
    closeModal('modal-live-management');
    const servers = Object.entries(currentLiveSources);
    if (servers.length === 0) {
        return showCustomAlert("يرجى إضافة سيرفر Xtream أولاً.");
    }

    if (servers.length === 1) {
        window.startXxtreamLiveImport(servers[0][0]);
    } else {
        window.renderManageServersList(true); // Picker mode
        openModal('modal-manage-live-servers');
    }
};

// 3. M3U / JSON Import
getEl('opt-m3u-import').onclick = () => {
    closeModal('modal-live-management');
    openModal('modal-m3u-import');
};

// 4. Manage & Delete Servers
getEl('opt-manage-servers').onclick = () => {
    closeModal('modal-live-management');
    window.renderManageServersList(false); // Management mode
    openModal('modal-manage-live-servers');
};

window.renderManageServersList = (isPicker = false) => {
    const list = getEl('manage-servers-list');
    if (!list) return;
    list.innerHTML = '';

    const sources = Object.entries(currentLiveSources);
    if (sources.length === 0) {
        list.innerHTML = '<p class="text-center py-10 text-gray-500 italic">لا توجد سيرفرات مضافة</p>';
        return;
    }

    sources.forEach(([id, s]) => {
        const div = document.createElement('div');
        div.className = "bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all mb-3 text-right";

        const infoDiv = `
            <div class="flex-1">
                <h4 class="font-bold text-white text-lg">${s.name}</h4>
                <p class="text-[10px] text-gray-500 font-mono">${s.url || s.baseUrl}</p>
            </div>
        `;

        let actions = '';
        if (isPicker) {
            actions = `
                <button onclick="window.startXxtreamLiveImport('${id}'); closeModal('modal-manage-live-servers')" class="px-6 py-3 bg-[#FFC107] text-black rounded-2xl font-black hover:scale-105 transition-all">
                    اختيار للاستيراد 📥
                </button>
            `;
        } else {
            actions = `
                <div class="flex items-center space-x-2 space-x-reverse">
                    <button onclick="window.editLiveXtServer('${id}'); closeModal('modal-manage-live-servers')" class="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">✏️</button>
                    <button onclick="window.deleteLiveXtServer('${id}'); window.renderManageServersList(false);" class="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                </div>
            `;
        }

        div.innerHTML = infoDiv + actions;
        list.appendChild(div);
    });
};

// 5. Clean & Sort (Fusion Engine)
getEl('opt-clean-sort').onclick = () => {
    closeModal('modal-live-management');
    analyzeDuplicateChannels();
    openModal('modal-clean-sort');
};

async function analyzeDuplicateChannels() {
    const list = getEl('cleanup-preview-list');
    if (!list) return;
    list.innerHTML = '<p class="text-center py-20 text-[#FFC107] animate-pulse">جاري تحليل المكتبة 🧬...</p>';

    // Group channels across ALL networks by name
    const grouped = {};
    Object.entries(currentNetworks).forEach(([netId, net]) => {
        Object.entries(net.channels || {}).forEach(([chId, ch]) => {
            const clean = Sanitizer.processName(ch.name).cleanName.toLowerCase().trim();
            if (!grouped[clean]) grouped[clean] = [];
            grouped[clean].push({ id: chId, netId, ...ch });
        });
    });

    const duplicates = Object.entries(grouped).filter(([name, items]) => items.length > 1);

    if (duplicates.length === 0) {
        list.innerHTML = '<div class="text-center py-20"><p class="text-green-500 font-bold mb-2">✨ المكتبة نظيفة تماماً!</p><p class="text-xs text-gray-500">لا توجد قنوات مكررة لدمجها حالياً.</p></div>';
        getEl('btn-run-smart-cleanup').style.display = 'none';
        return;
    }

    list.innerHTML = '';
    getEl('btn-run-smart-cleanup').style.display = 'block';

    duplicates.forEach(([name, items]) => {
        const div = document.createElement('div');
        div.className = "bg-white/5 p-4 rounded-2xl border border-[#FFC107]/10 flex flex-col space-y-2";
        div.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-bold text-white">${items[0].name}</span>
                <span class="bg-[#FFC107] text-black px-2 py-0.5 rounded-lg text-[10px] font-black">${items.length} نسخ مكررة</span>
            </div>
            <div class="flex -space-x-2 space-x-reverse opacity-40">
                ${items.map(it => `<img src="${it.logoUrl}" class="w-8 h-8 rounded-lg border-2 border-black bg-white/10 object-contain">`).join('')}
            </div>
            <p class="text-[8px] text-gray-500 italic">سيتم دمجها في قناة واحدة بـ ${items.length} سيرفرات</p>
        `;
        list.appendChild(div);
    });

    getEl('btn-run-smart-cleanup').onclick = () => executeUniversalLiveCleanup(duplicates);
}

async function executeUniversalLiveCleanup(duplicates) {
    addLog("بدء تنفيذ الدمج العالمي للبث المباشر...");
    const updates = {};
    let totalMerged = 0;

    duplicates.forEach(([name, items]) => {
        const master = JSON.parse(JSON.stringify(items[0]));
        master.name = Sanitizer.processName(master.name).cleanName;
        const finalSources = {};
        let sIdx = 0;

        items.forEach(ch => {
            Object.values(ch.sources || {}).forEach(s => {
                finalSources[`s${sIdx}`] = { ...s, orderIndex: sIdx };
                sIdx++;
            });
            // Delete original
            updates[`networks/${ch.netId}/channels/${ch.id}`] = null;
            totalMerged++;
        });

        // Add back to first channel's network
        master.sources = finalSources;
        updates[`networks/${items[0].netId}/channels/merged_${Date.now()}_${totalMerged}`] = master;
    });

    try {
        await update(ref(db), updates);
        addLog(`اكتملت العملية! تم دمج ${totalMerged} قناة مكررة بنجاح ✅`);
        closeModal('modal-clean-sort');
        showCustomAlert(`تم دمج ${totalMerged} قنوات بنجاح.`, "نجاح");
    } catch (e) { addLog("فشل في تحديث قاعدة البيانات", true); }
}

onValue(ref(db, 'networks'), (snapshot) => {
    currentNetworks = snapshot.val() || {};
    renderNetworks();
});

function renderNetworks() {
    if (!networksAccordion) return;
    networksAccordion.innerHTML = '';
    if (networkSortable) networkSortable.destroy();
    channelSortables.forEach(s => s.destroy());
    channelSortables = [];

    const sortedNets = Object.entries(currentNetworks).sort((a, b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));

    sortedNets.forEach(([netId, net]) => {
        const isExpanded = expandedNetIds.has(netId);
        const isSelected = isSelectionMode && selectedItems.some(i => i.id === netId && i.type === 'networks');
        const netSection = document.createElement('div');
        netSection.className = "network-row mb-4";
        netSection.dataset.id = netId;

        netSection.innerHTML = `
            <div class="glass rounded-3xl overflow-hidden border ${isSelected ? 'border-[#FFC107] bg-[#FFC107]/5' : 'border-white/5'} transition-all">
                <div class="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5" onclick="window.handleRowClick(event, '${netId}')">
                    <div class="flex items-center space-x-4 space-x-reverse">
                        <span class="text-gray-700 text-xl cursor-move network-handle ml-2" onclick="event.stopPropagation()">⠿</span>
                        <span class="text-[#FFC107] text-lg transition-transform duration-300 p-2 hover:bg-white/10 rounded-lg ${isExpanded ? 'rotate-180' : ''}" onclick="event.stopPropagation(); window.toggleNetOnly('${netId}')">▼</span>
                        ${isSelectionMode ? `<div onclick="event.stopPropagation(); window.selectItem('${netId}', 'networks')" class="w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-[#FFC107] border-[#FFC107]' : 'border-white/20'} flex items-center justify-center text-black font-bold text-xs ml-2">${isSelected ? '✓' : ''}</div>` : ''}
                        <div><h4 class="text-lg font-bold text-white">${net.name}</h4><p class="text-[10px] text-gray-500 font-mono">ID: ${netId.slice(0, 8)} | #${net.orderIndex || 0}</p></div>
                    </div>
                    <div class="flex items-center space-x-3 space-x-reverse" onclick="event.stopPropagation()">
                        <span class="bg-white/5 px-3 py-1 rounded-full text-[10px] text-gray-400">${Object.keys(net.channels || {}).length} قناة</span>
                        ${!isSelectionMode ? `<button onclick="window.addChannel('${netId}')" class="p-2 bg-green-500/10 text-green-500 rounded-xl text-xs hover:bg-green-500 hover:text-white">قناة +</button><button onclick="window.editNet('${netId}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-xl text-xs hover:bg-blue-500 hover:text-white">✏️</button><button onclick="window.deleteNet('${netId}')" class="p-2 bg-red-500/10 text-red-500 rounded-xl text-xs hover:bg-red-500 hover:text-white">🗑️</button>` : ''}
                    </div>
                </div>
                <div id="ch-list-${netId}" class="p-4 pt-0 space-y-2 ${isExpanded ? '' : 'hidden'} min-h-[40px] border-t border-white/5 bg-black/10"></div>
            </div>`;
        networksAccordion.appendChild(netSection);

        const chContainer = document.getElementById(`ch-list-${netId}`);
        if (isExpanded) renderChannelsInline(netId, chContainer);
        if (typeof Sortable !== 'undefined') {
            const chSortable = new Sortable(chContainer, { group: 'channels', animation: 150, handle: '.channel-handle', draggable: '.channel-item', onEnd: (evt) => handleChannelDragEnd(evt, netId) });
            channelSortables.push(chSortable);
        }
    });

    if (typeof Sortable !== 'undefined') {
        networkSortable = new Sortable(networksAccordion, { animation: 150, handle: '.network-handle', draggable: '.network-row', onEnd: handleNetworkDragEnd });
    }
}

function renderChannelsInline(netId, container) {
    const chs = currentNetworks[netId]?.channels || {};
    const sortedChs = Object.entries(chs).sort((a, b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));
    if (sortedChs.length === 0) { container.innerHTML = '<p class="text-center text-gray-700 text-[10px] py-4 italic">اسحب القنوات هنا</p>'; return; }
    sortedChs.forEach(([chId, ch]) => {
        const isSelected = isSelectionMode && selectedItems.some(i => i.id === chId && i.type === 'channels');
        const div = document.createElement('div'); div.dataset.id = chId; div.dataset.netId = netId;
        div.className = `channel-item glass p-3 rounded-2xl flex items-center justify-between group cursor-pointer ${isSelected ? 'border-[#FFC107] bg-[#FFC107]/5' : ''}`;
        div.onclick = () => { if (isSelectionMode) window.selectItem(chId, 'channels', netId); };

        // 🔳 Applied Strict Square Logo Container
        const logoHtml = ch.logoUrl
            ? `<img src="${ch.logoUrl}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
            : '';
        const fallbackHtml = `<div class="logo-fallback" style="${ch.logoUrl ? 'display:none' : 'display:flex'}">${ch.name.substring(0, 2)}</div>`;

        div.innerHTML = `
            <div class="flex items-center space-x-3 space-x-reverse">
                <span class="text-gray-700 text-xs mr-2 cursor-grab channel-handle" onclick="event.stopPropagation()">⠿</span>
                ${isSelectionMode ? `<div class="w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-[#FFC107] border-[#FFC107]' : 'border-white/20'} flex items-center justify-center text-black font-bold text-[10px] ml-2">${isSelected ? '✓' : ''}</div>` : ''}
                <div class="w-12 h-12 logo-container flex-none bg-black/20">
                    ${logoHtml}
                    ${fallbackHtml}
                </div>
                <div>
                    <p class="font-bold text-xs text-white">${ch.name}</p>
                    <p class="text-[8px] text-gray-500">${Object.keys(ch.sources || {}).length} سيرفرات</p>
                </div>
            </div>
            ${!isSelectionMode ? `<button onclick="event.stopPropagation(); window.editCh('${netId}', '${chId}')" class="p-1.5 text-blue-400 text-[10px] hover:underline">تعديل</button>` : ''}`;
        container.appendChild(div);
    });
}

async function handleNetworkDragEnd() {
    const updates = {}; Array.from(networksAccordion.querySelectorAll('.network-row')).forEach((row, index) => { const id = row.dataset.id; if (currentNetworks[id].orderIndex !== index) updates[`networks/${id}/orderIndex`] = index; });
    if (Object.keys(updates).length > 0) try { await update(ref(db), updates); addLog("تم تحديث ترتيب الشبكات."); } catch (e) {}
}

async function handleChannelDragEnd(evt, sourceNetId) {
    const chId = evt.item.dataset.id;
    const targetNetId = evt.to.id.replace('ch-list-', '');
    if (!targetNetId || !sourceNetId) return;
    const updates = {};
    if (sourceNetId !== targetNetId) updates[`networks/${sourceNetId}/channels/${chId}`] = null;
    Array.from(evt.to.querySelectorAll('.channel-item')).forEach((el, index) => {
        const id = el.dataset.id; const originalNetId = el.dataset.netId;
        let chData = (id === chId) ? currentNetworks[sourceNetId]?.channels?.[chId] : currentNetworks[originalNetId]?.channels?.[id];
        if (chData) {
            const sanitizedCh = { ...JSON.parse(JSON.stringify(chData)), orderIndex: index, networkId: targetNetId };
            updates[`networks/${targetNetId}/channels/${id}`] = sanitizedCh;
        }
    });
    try { await update(ref(db), updates); addLog("تم نقل وترتيب القنوات ✅"); } catch (e) { renderNetworks(); }
}

window.toggleNetOnly = (id) => { if (expandedNetIds.has(id)) expandedNetIds.delete(id); else expandedNetIds.add(id); renderNetworks(); };
window.handleRowClick = (e, netId) => { if (isSelectionMode) window.selectItem(netId, 'networks'); else window.toggleNetOnly(netId); };

window.addChannel = (netId) => {
    activeNetId = netId; activeChId = null;
    if (chNameIn) chNameIn.value = '';
    if (chLogoIn) chLogoIn.value = '';
    if (chOrderIn) chOrderIn.value = (currentNetworks[netId]?.channels ? Object.keys(currentNetworks[netId].channels).length : 0);
    if (sourcesCont) sourcesCont.innerHTML = '';
    addSourceRow('', ''); openModal('modal-edit-channel');
};
window.editCh = (netId, chId) => {
    activeNetId = netId; activeChId = chId;
    const ch = currentNetworks[netId].channels[chId];
    if (chNameIn) chNameIn.value = ch.name;
    if (chLogoIn) chLogoIn.value = ch.logoUrl;
    if (chOrderIn) chOrderIn.value = ch.orderIndex || 0;
    if (sourcesCont) {
        sourcesCont.innerHTML = '';
        if (ch.sources) Object.entries(ch.sources).forEach(([sk, s]) => addSourceRow(s.name, s.url, s));
        else addSourceRow('', '');
    }
    openModal('modal-edit-channel');
};
if (btnAddNetwork) {
    btnAddNetwork.onclick = () => {
        activeNetId = null;
        if (netNameIn) netNameIn.value = '';
        if (netOrderIn) netOrderIn.value = Object.keys(currentNetworks).length;
        if (getEl('net-modal-title')) getEl('net-modal-title').innerText = "إضافة شبكة جديدة 📺";
        openModal('modal-network');
    };
}

window.editNet = (id) => {
    activeNetId = id;
    const net = currentNetworks[id];
    if (netNameIn) netNameIn.value = net.name;
    if (netOrderIn) netOrderIn.value = net.orderIndex || 0;
    if (getEl('net-modal-title')) getEl('net-modal-title').innerText = "تعديل الشبكة ✏️";
    openModal('modal-network');
};

window.deleteNet = async (id) => { if (await showCustomConfirm("حذف الشبكة وكل قنواتها؟", "حذف")) await remove(ref(db, `networks/${id}`)); };


if (btnNetSave) {
    btnNetSave.onclick = async () => {
        const name = netNameIn?.value.trim(); const order = parseInt(netOrderIn?.value) || 0; if (!name) return;
        try { if (activeNetId) await update(ref(db, `networks/${activeNetId}`), { name, orderIndex: order }); else await push(ref(db, 'networks'), { name, orderIndex: order, channels: {} }); closeModal('modal-network'); } catch (e) {}
    };
}

function addSourceRow(label, url, existingData = null) {
    if (!sourcesCont) return;
    const div = document.createElement('div'); div.className = "flex space-x-2 space-x-reverse items-center source-row mb-2";
    div.dataset.failCount = existingData?.failCount || 0;
    div.dataset.firstFailedAt = existingData?.firstFailedAt || 0;
    div.dataset.isExcluded = existingData?.isExcluded || false;
    div.dataset.wasRecovered = existingData?.wasRecovered || false;
    div.innerHTML = `<input type="text" placeholder="الاسم" class="w-1/3 bg-black/40 border border-white/5 rounded-lg p-2 text-[10px] s-label" value="${label}"><input type="text" placeholder="الرابط" class="flex-1 bg-black/40 border border-white/5 rounded-lg p-2 text-[10px] s-url" value="${url}"><button onclick="this.parentElement.remove()" class="text-red-500 text-xs px-2">X</button>`;
    sourcesCont.appendChild(div);
}
if (btnAddSource) btnAddSource.onclick = () => addSourceRow('', '');

if (btnChSave) {
    btnChSave.onclick = async () => {
        const rawName = chNameIn?.value.trim();
        const rawLogo = chLogoIn?.value.trim();
        const order = parseInt(chOrderIn?.value) || 0;

        if (!rawName || !activeNetId) return;

        // 🛡️ Enforce Strict Logo Identity
        const name = rawName;
        const logo = Sanitizer.fixLogoIdentity(name, rawLogo);

        const sources = {};
        if (sourcesCont) {
            sourcesCont.querySelectorAll('.source-row').forEach((row, i) => {
                const l = row.querySelector('.s-label').value.trim(); const u = row.querySelector('.s-url').value.trim();
                if (u) sources[`s${i}`] = { name: l || `Server ${i+1}`, url: u, orderIndex: i, failCount: parseInt(row.dataset.failCount), firstFailedAt: parseInt(row.dataset.firstFailedAt), isExcluded: row.dataset.isExcluded === 'true', wasRecovered: row.dataset.wasRecovered === 'true' };
            });
        }
        const data = { name, logoUrl: logo, orderIndex: order, sources };
        try { if (activeChId) await update(ref(db, `networks/${activeNetId}/channels/${activeChId}`), data); else await push(ref(db, `networks/${activeNetId}/channels`), data); closeModal('modal-edit-channel'); } catch (e) {}
    };
}

// --- 🎬 MOVIES RENDERING (Unified Sync with Android Core) ---
onValue(ref(db, 'movie_categories'), (snap) => {
    try {
        console.log("📦 VOD TRACE: Triggering movie_categories listener...");
        const data = snap.val() || {};
        currentMovieCategories = data;

        const extractedMovies = {};
        Object.entries(data).forEach(([catId, cat]) => {
            if (cat && cat.movies) {
                Object.entries(cat.movies).forEach(([mId, m]) => {
                    if (m) extractedMovies[mId] = { ...m, id: mId, categoryId: catId };
                });
            }
        });
        currentMovies = extractedMovies;

        updateMovieCatDropdown();
        renderMoviesAccordion();
        addLog("تمت مزامنة الأفلام والتصنيفات بنجاح 🎬");
    } catch (e) {
        console.error("❌ VOD RENDER CRASH:", e);
        addLog("خطأ في عرض الأفلام: " + e.message, true);
    }
});

onValue(ref(db, 'movie_sources'), (snap) => {
    currentMovieSources = snap.val() || {};
    renderMovieSourcesList();
});

onValue(ref(db, 'series_sources'), (snap) => {
    currentSeriesSources = snap.val() || {};
    renderSeriesSourcesList();
});

function renderMovieSourcesList() {
    if (!movieSourcesList) return;
    movieSourcesList.innerHTML = '';
    Object.entries(currentMovieSources).forEach(([id, s]) => {
        const card = document.createElement('div');
        card.className = "bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all";
        card.innerHTML = `
            <div class="flex items-center space-x-3 space-x-reverse min-w-0">
                <div class="w-8 h-8 rounded-full bg-[#FFC107]/10 flex items-center justify-center text-sm flex-none">🌐</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-[10px] text-white truncate">${s.name}</h4>
                    <p class="text-[8px] text-gray-500 font-mono truncate">${s.baseUrl}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 space-x-reverse flex-none">
                <button onclick="window.startXxtreamImport('${id}')" class="px-3 py-1.5 bg-green-500/20 text-green-500 rounded-lg text-[8px] font-bold hover:bg-green-500 hover:text-white transition-all">استيراد 🚀</button>
                <button onclick="window.editXtServer('${id}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-[10px]">✏️</button>
                <button onclick="window.deleteXtServer('${id}')" class="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[10px]">🗑️</button>
            </div>`;
        movieSourcesList.appendChild(card);
    });
}

function renderSeriesSourcesList() {
    if (!seriesSourcesList) return;
    seriesSourcesList.innerHTML = '';
    Object.entries(currentSeriesSources).forEach(([id, s]) => {
        const card = document.createElement('div');
        card.className = "bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all";
        card.innerHTML = `
            <div class="flex items-center space-x-3 space-x-reverse min-w-0">
                <div class="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm flex-none">🌐</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-[10px] text-white truncate">${s.name}</h4>
                    <p class="text-[8px] text-gray-500 font-mono truncate">${s.baseUrl}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 space-x-reverse flex-none">
                <button onclick="window.startXxtreamSeriesImport('${id}')" class="px-3 py-1.5 bg-green-500/20 text-green-500 rounded-lg text-[8px] font-bold hover:bg-green-500 hover:text-white transition-all">استيراد 🚀</button>
                <button onclick="window.editSeriesXtServer('${id}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-[10px]">✏️</button>
                <button onclick="window.deleteSeriesXtServer('${id}')" class="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[10px]">🗑️</button>
            </div>`;
        seriesSourcesList.appendChild(card);
    });
}

function renderMoviesAccordion() {
    const container = getEl('movies-accordion');
    if (!container) return;
    container.innerHTML = '';

    if (movieCategorySortable) movieCategorySortable.destroy();

    // Grouping movies by category
    const grouped = {};
    Object.entries(currentMovies).forEach(([id, m]) => {
        const catId = m.categoryId || "unsorted";
        if (!grouped[catId]) grouped[catId] = [];
        grouped[catId].push({ id, ...m });
    });

    // Sort categories by orderIndex
    const sortedCats = Object.entries(currentMovieCategories).sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));

    if (sortedCats.length === 0 && Object.keys(currentMovies).length === 0) {
        container.innerHTML = '<p class="text-gray-500 animate-pulse text-center py-20">لا توجد بيانات أفلام لعرضها...</p>';
        return;
    }

    sortedCats.forEach(([catId, cat]) => {
        const movies = grouped[catId] || grouped[cat.name] || []; // Handle both ID and Name mapping

        let filtered = movies;
        if (movieSearchQuery) {
            filtered = movies.filter(m => m.title?.toLowerCase().includes(movieSearchQuery));
            if (filtered.length === 0) return; // Skip empty categories during search
        }

        const isExpanded = expandedMovieCatIds.has(catId) || !!movieSearchQuery;
        const isSelected = isMovieSelectionMode && selectedMovieIds.includes(catId);

        const catRow = document.createElement('div');
        catRow.className = "movie-category-row mb-4";
        catRow.dataset.id = catId;

        catRow.innerHTML = `
            <div class="glass rounded-3xl overflow-hidden border ${isSelected ? 'border-[#FFC107] bg-[#FFC107]/5' : 'border-white/5'} transition-all">
                <div class="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5" onclick="window.handleMovieRowClick(event, '${catId}')">
                    <div class="flex items-center space-x-4 space-x-reverse">
                        <span class="text-gray-700 text-xl cursor-move movie-cat-handle ml-2" onclick="event.stopPropagation()">⠿</span>
                        <span class="text-[#FFC107] text-lg transition-transform duration-300 p-2 hover:bg-white/10 rounded-lg ${isExpanded ? 'rotate-180' : ''}" onclick="event.stopPropagation(); window.toggleMovieCatOnly('${catId}')">▼</span>
                        ${isMovieSelectionMode ? `<div onclick="event.stopPropagation(); window.selectMovieItem('${catId}', 'categories')" class="w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-[#FFC107] border-[#FFC107]' : 'border-white/20'} flex items-center justify-center text-black font-bold text-xs ml-2">${isSelected ? '✓' : ''}</div>` : ''}
                        <div>
                            <h4 class="text-lg font-bold text-white">${cat.name}</h4>
                            <p class="text-[10px] text-gray-500 font-mono">ID: ${catId.slice(0, 8)} | #${cat.orderIndex || 0}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 space-x-reverse" onclick="event.stopPropagation()">
                        <span class="bg-white/5 px-3 py-1 rounded-full text-[10px] text-gray-400">${filtered.length} فيلم</span>
                        ${!isMovieSelectionMode ? `
                            <button onclick="window.addMovieToCat('${catId}')" class="p-2 bg-green-500/10 text-green-500 rounded-xl text-[10px] hover:bg-green-500 hover:text-white transition-all font-bold">فيلم +</button>
                            <button onclick="window.editMovieCat('${catId}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-xl text-xs hover:bg-blue-500 hover:text-white">✏️</button>
                            <button onclick="window.deleteMovieCat('${catId}')" class="p-2 bg-red-500/10 text-red-500 rounded-xl text-xs hover:bg-red-500 hover:text-white">🗑️</button>
                        ` : ''}
                    </div>
                </div>
                <div id="movie-list-${catId}" class="p-6 pt-2 ${isExpanded ? '' : 'hidden'} border-t border-white/5 bg-black/10">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        <!-- Movie Cards Rendered Here -->
                    </div>
                </div>
            </div>`;

        container.appendChild(catRow);

        if (isExpanded) {
            const listGrid = catRow.querySelector('.grid');
            renderMovieItemsInAccordion(filtered, listGrid, catId);
        }
    });

    if (typeof Sortable !== 'undefined') {
        movieCategorySortable = new Sortable(container, {
            animation: 150, handle: '.movie-cat-handle', draggable: '.movie-category-row',
            onEnd: handleMovieCategoryDragEnd
        });
    }
}

function renderMovieItemsInAccordion(movies, container, catId) {
    if (!container) return;
    container.innerHTML = '';

    movies.sort((a,b) => (a.orderIndex || 0) - (b.orderIndex || 0)).forEach(movie => {
        const isSelected = isMovieSelectionMode && selectedMovieIds.includes(movie.id);
        const card = document.createElement('div');
        card.className = `group relative bg-white/5 border ${isSelected ? 'border-[#FFC107] bg-[#FFC107]/5' : 'border-white/5'} rounded-2xl overflow-hidden hover:border-[#FFC107]/50 transition-all cursor-pointer shadow-lg`;

        card.onclick = (e) => {
            e.stopPropagation();
            if (isMovieSelectionMode) window.selectMovieItem(movie.id, 'movies', catId);
            else window.editMovie(movie.id);
        };

        const selectionOverlay = isMovieSelectionMode ? `
            <div class="absolute inset-0 bg-[#FFC107]/10 z-10 flex items-center justify-center">
                <div class="w-10 h-10 rounded-full ${isSelected ? 'bg-[#FFC107] text-black' : 'bg-black/40 border border-white/20 text-white'} flex items-center justify-center font-bold shadow-xl">
                    ${isSelected ? '✓' : ''}
                </div>
            </div>` : '';

        card.innerHTML = `
            <div class="aspect-[2/3] relative">
                ${selectionOverlay}
                <img src="${movie.logoUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-bold text-[#FFC107]">⭐ ${movie.rating || 'N/A'}</div>
                <div class="absolute bottom-2 right-2 flex flex-col items-end">
                    <span class="text-[8px] bg-[#FFC107] text-black px-1.5 rounded-md font-black mb-1">${movie.year || ''}</span>
                </div>
            </div>
            <div class="p-3">
                <h5 class="text-[10px] md:text-xs font-bold text-white truncate text-right">${movie.title}</h5>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-[8px] text-gray-500">${(movie.servers || []).length} سيرفر</span>
                    ${!isMovieSelectionMode ? `<button class="text-red-500 opacity-0 group-hover:opacity-100 hover:scale-125 transition-all text-[10px]" onclick="event.stopPropagation(); window.deleteMovie('${movie.id}')">🗑️</button>` : ''}
                </div>
            </div>`;
        container.appendChild(card);
    });
}

// --- 🎬 MOVIE ACCORDION HANDLERS ---
window.toggleMovieCatOnly = (id) => {
    if (expandedMovieCatIds.has(id)) expandedMovieCatIds.delete(id);
    else expandedMovieCatIds.add(id);
    renderMoviesAccordion();
};

window.handleMovieRowClick = (e, catId) => {
    if (isMovieSelectionMode) window.selectMovieItem(catId, 'categories');
    else window.toggleMovieCatOnly(catId);
};

window.selectMovieItem = (id, type, catId = null) => {
    const idx = selectedMovieIds.indexOf(id);
    const isAdding = idx === -1;

    if (!isAdding) {
        selectedMovieIds.splice(idx, 1);
    } else {
        selectedMovieIds.push(id);
    }

    // Cascading selection for categories (Match Live TV logic)
    if (type === 'categories') {
        const moviesInCat = Object.entries(currentMovies).filter(([mId, m]) => m.categoryId === currentMovieCategories[id]?.name || m.categoryId === id);
        moviesInCat.forEach(([mId]) => {
            const mIdx = selectedMovieIds.indexOf(mId);
            if (isAdding) {
                if (mIdx === -1) selectedMovieIds.push(mId);
            } else {
                if (mIdx > -1) selectedMovieIds.splice(mIdx, 1);
            }
        });
    }

    updateMovieSelectionUI();
    renderMoviesAccordion();
};

window.addMovieToCat = (catId) => {
    activeMovieId = null;
    activeMovieCatId = catId;
    if (movieTitleIn) movieTitleIn.value = '';
    if (movieCatIdIn) movieCatIdIn.value = catId;
    if (movieSourcesCont) movieSourcesCont.innerHTML = '';
    addMovieSourceRow('', '');
    openModal('modal-movie');
};

async function handleMovieCategoryDragEnd() {
    const updates = {};
    Array.from(getEl('movies-accordion').querySelectorAll('.movie-category-row')).forEach((row, index) => {
        const id = row.dataset.id;
        if (currentMovieCategories[id] && currentMovieCategories[id].orderIndex !== index) {
            updates[`movie_categories/${id}/orderIndex`] = index;
        }
    });
    if (Object.keys(updates).length > 0) {
        try { await update(ref(db), updates); addLog("تم تحديث ترتيب تصنيفات الأفلام ✅"); } catch (e) {}
    }
}

if (btnAddXtreamServer) {
    btnAddXtreamServer.onclick = () => {
        activeXtServerId = null;
        if (xtNameIn) xtNameIn.value = ''; if (xtUrlIn) xtUrlIn.value = ''; if (xtUserIn) xtUserIn.value = ''; if (xtPassIn) xtPassIn.value = '';
        openModal('modal-xtream-server');
    };
}

window.editXtServer = (id) => {
    activeXtServerId = id;
    const s = currentMovieSources[id];
    if (xtNameIn) xtNameIn.value = s.name; if (xtUrlIn) xtUrlIn.value = s.baseUrl; if (xtUserIn) xtUserIn.value = s.username; if (xtPassIn) xtPassIn.value = s.password;
    openModal('modal-xtream-server');
};

window.deleteXtServer = async (id) => {
    if (await showCustomConfirm("حذف هذا السيرفر؟", "تأكيد الحذف")) {
        await remove(ref(db, `movie_sources/${id}`));
        addLog("تم حذف سيرفر Xtream");
    }
};

if (btnXtSave) {
    btnXtSave.onclick = async () => {
        const name = xtNameIn?.value.trim();
        const url = xtUrlIn?.value.trim();
        const user = xtUserIn?.value.trim();
        const pass = xtPassIn?.value.trim();

        if (!name || !url) return showCustomAlert("يرجى إدخال اسم السيرفر وعنوانه (URL)");

        const data = {
            name,
            baseUrl: url,
            username: user || "",
            password: pass || "",
            type: 'xtream',
            category: xtSaveMode // Store the context (live/movies/series)
        };

        // 🎯 Path Logic: Determine which Firebase node to target
        let path = "movie_sources"; // Default
        if (xtSaveMode === "series") path = "series_sources";
        if (xtSaveMode === "live") path = "xtream_servers";

        console.log(`🚀 Saving Xtream Server to path: [${path}] with mode: [${xtSaveMode}]`);

        try {
            if (activeXtServerId) {
                await update(ref(db, `${path}/${activeXtServerId}`), data);
                addLog(`تم تحديث السيرفر: ${name} بنجاح ✅`);
            } else {
                const newRef = push(ref(db, path));
                data.id = newRef.key;
                await set(newRef, data);
                addLog(`تمت إضافة سيرفر جديد: ${name} بنجاح ✅`);
            }
            closeModal('modal-xtream-server');
        } catch (e) {
            console.error("Failed to save Xtream Server:", e);
            addLog(`فشل حفظ السيرفر: ${e.message}`, true);
            showCustomAlert("حدث خطأ أثناء الحفظ. تحقق من الاتصال.");
        }
    };
}

// --- XTREAM IMPORT WIZARD ---
window.startXxtreamImport = async (serverId) => {
    const s = currentMovieSources[serverId];
    if (!s) return;
    openModal('modal-xtream-import');
    if (xtCatsList) xtCatsList.innerHTML = '<p class="col-span-full text-center py-10 animate-pulse text-xs">جاري جلب التصنيفات...</p>';

    try {
        const url = `${s.baseUrl}/player_api.php?username=${s.username}&password=${s.password}&action=get_vod_categories`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        const cats = await res.json();

        if (xtCatsList) {
            xtCatsList.innerHTML = '';
            cats.forEach(cat => {
                const label = document.createElement('label');
                label.className = "flex items-center space-x-3 space-x-reverse p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all";
                label.innerHTML = `<input type="checkbox" class="xt-cat-check w-4 h-4 accent-[#FFC107]" value="${cat.category_id}" data-name="${cat.category_name}"><span class="text-[10px] truncate">${cat.category_name}</span>`;
                xtCatsList.appendChild(label);
            });
        }
        if (btnStartImport) btnStartImport.onclick = () => executeXtreamMovieImport(s);
    } catch (e) {
        if (xtCatsList) xtCatsList.innerHTML = '<p class="col-span-full text-center py-10 text-red-500 text-xs">فشل الاتصال!</p>';
    }
};

async function executeXtreamMovieImport(server) {
    if (!xtCatsList) return;
    const selectedCats = Array.from(xtCatsList.querySelectorAll('.xt-cat-check:checked')).map(el => ({
        id: el.value, name: el.dataset.name
    }));

    if (selectedCats.length === 0) return showCustomAlert("اختر تصنيفاً واحداً على الأقل", "تنبيه");

    const targetOption = await showCustomDestinationPicker("movies");
    if (targetOption === 'cancel') return;

    if (btnStartImport) btnStartImport.classList.add('hidden');
    if (importProgressCont) importProgressCont.classList.remove('hidden');

    try {
        updateImportStatus("جاري جلب قائمة الأفلام من السيرفر...", 10);
        const url = `${server.baseUrl}/player_api.php?username=${server.username}&password=${server.password}&action=get_vod_streams`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        const allMovies = await res.json();

        const filtered = allMovies.filter(m => selectedCats.some(sc => sc.id === m.category_id));
        const totalItems = filtered.length;
        updateImportStatus(`تم العثور على ${totalItems} فيلم. جاري التحضير...`, 20);

        const isSmart = checkSmartMerge?.checked;
        const itemsToProcess = filtered;

        // 🌀 CHUNKED ENGINE (Ported from Android MoviesImportManager)
        const CHUNK_SIZE = 25;
        const chunks = [];
        for (let i = 0; i < itemsToProcess.length; i += CHUNK_SIZE) {
            chunks.push(itemsToProcess.slice(i, i + CHUNK_SIZE));
        }

        let processedCount = 0;
        for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
            const chunk = chunks[chunkIdx];
            const batchUpdates = {};

            chunk.forEach(m => {
                const cleanTitle = VODSanitizer.sanitizeTitle(m.name);
                const targetCat = selectedCats.find(sc => sc.id === m.category_id);
                const destinationCatName = (targetOption === 'new') ? targetCat.name : currentMovieCategories[targetOption]?.name || targetCat.name;

                let existingId = null;
                if (isSmart) {
                    existingId = Object.keys(currentMovies).find(id => VODSanitizer.sanitizeTitle(currentMovies[id].title) === cleanTitle);
                }

                const movieUrl = `${server.baseUrl}/movie/${server.username}/${server.password}/${m.stream_id}.${m.container_extension || 'mp4'}`;
                const serverData = { name: "سيرفر 1", url: movieUrl, orderIndex: 0 };

                if (existingId) {
                    // Update servers of existing movie
                    const existing = currentMovies[existingId];
                    const servers = existing.servers || [];
                    if (!servers.some(s => s.url === movieUrl)) {
                        const newSrvs = [...servers, { ...serverData, name: `سيرفر ${servers.length + 1}`, orderIndex: servers.length }];
                        batchUpdates[`movies/${existingId}/servers`] = newSrvs;
                    }
                } else {
                    const movieKey = `xt_${m.stream_id}`;
                    batchUpdates[`movies/${movieKey}`] = {
                        id: movieKey, title: cleanTitle, logoUrl: m.stream_icon || "",
                        year: m.year || "", rating: m.rating || "", categoryId: destinationCatName,
                        servers: [serverData], orderIndex: processedCount, originSourceId: server.id
                    };
                }

                // Ensure category exists
                if (targetOption === 'new') {
                    const catKey = `cat_${targetCat.id}`;
                    if (!currentMovieCategories[catKey]) {
                        batchUpdates[`movie_categories/${catKey}`] = { id: catKey, name: targetCat.name, orderIndex: 99 };
                    }
                }
                processedCount++;
            });

            // Commit Chunk
            await update(ref(db), batchUpdates);

            const pct = 20 + Math.floor((processedCount / totalItems) * 75);
            updateImportStatus(`تمت معالجة ${processedCount}/${totalItems} فيلم...`, pct);

            // Safety throttle to prevent UI freezing
            await new Promise(r => setTimeout(r, 100));
        }

        updateImportStatus("اكتمل الاستيراد بنجاح! ✅", 100);
        addLog(`تم استيراد ${totalItems} فيلم بنجاح باستخدام المحرك المجزأ.`);

        setTimeout(() => {
            closeModal('modal-xtream-import');
            if (btnStartImport) btnStartImport.classList.remove('hidden');
            if (importProgressCont) importProgressCont.classList.add('hidden');
        }, 2000);

    } catch (e) {
        console.error("Import failed:", e);
        updateImportStatus("فشل الاستيراد! ❌", 0);
        if (btnStartImport) btnStartImport.classList.remove('hidden');
        showCustomAlert("حدث خطأ أثناء الاستيراد. يرجى التحقق من السيرفر أو الاتصال.", "خطأ استيراد");
    }
}

async function showCustomDestinationPicker(mode = "live") {
    return new Promise((resolve) => {
        if (netSelectorList) {
            netSelectorList.innerHTML = '';

            const isLive = mode === "live";
            const targetData = isLive ? currentNetworks : currentMovieCategories;
            const itemLabel = isLive ? "شبكات" : "تصنيفات";

            // Option 1: New
            const divNew = document.createElement('div');
            divNew.className = "bg-green-600/20 p-5 rounded-2xl border border-green-500/20 flex items-center justify-between cursor-pointer hover:bg-green-600 hover:text-white transition-all group mb-4";
            divNew.innerHTML = `<div><p class="font-bold text-sm">🆕 استيراد ك${itemLabel} جديدة</p><p class="text-[10px] opacity-60">سيتم إنشاء ${isLive ? 'شبكة' : 'تصنيف'} مستقل لكل فئة مختارة</p></div>`;
            divNew.onclick = () => { closeModal('modal-net-selector'); resolve('new'); };
            netSelectorList.appendChild(divNew);

            // Option 2: Existing
            Object.entries(targetData).forEach(([id, item]) => {
                const div = document.createElement('div');
                div.className = "bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-[#FFC107] hover:text-black transition-all group mb-2";
                div.innerHTML = `<div><p class="font-bold text-sm text-white group-hover:text-black">${item.name}</p><p class="text-[10px] opacity-50 group-hover:text-black">إضافة داخل: ${item.name}</p></div>`;
                div.onclick = () => { closeModal('modal-net-selector'); resolve(id); };
                netSelectorList.appendChild(div);
            });

            openModal('modal-net-selector');
        }
    });
}


function updateImportStatus(text, pct) {
    if (importStatusText) importStatusText.innerText = text;
    if (importProgressBar) importProgressBar.style.width = `${pct}%`;
    if (importPercentText) importPercentText.innerText = `${pct}%`;
}

function updateMovieCatDropdown() {
    try {
        if (!movieCatIdIn) return;
        movieCatIdIn.innerHTML = '<option value="">اختر التصنيف</option>';
        const validCats = Object.entries(currentMovieCategories).filter(([id, cat]) => cat !== null);
        validCats.sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0)).forEach(([id, cat]) => {
            const opt = document.createElement('option');
            opt.value = id; opt.innerText = cat.name || "بدون اسم";
            movieCatIdIn.appendChild(opt);
        });

        // Populate fusion dropdown if it exists
        const fusionCat = getEl('fusion-movie-target-cat');
        if (fusionCat) {
            fusionCat.innerHTML = '';
            validCats.forEach(([id, cat]) => {
                const opt = document.createElement('option');
                opt.value = id; opt.innerText = cat.name || "بدون اسم";
                fusionCat.appendChild(opt);
            });
        }
    } catch (e) { console.error("Error updating movie dropdown:", e); }
}

function updateSeriesCatDropdown() {
    try {
        if (!seriesCatIdIn) return;
        seriesCatIdIn.innerHTML = '<option value="">اختر التصنيف</option>';

        const validCats = Object.entries(currentSeriesCategories).filter(([id, cat]) => cat !== null);
        validCats.sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0)).forEach(([id, cat]) => {
            const opt = document.createElement('option');
            opt.value = id; opt.innerText = cat.name || "بدون اسم";
            seriesCatIdIn.appendChild(opt);
        });

        const fusionCat = getEl('fusion-series-target-cat');
        if (fusionCat) {
            fusionCat.innerHTML = '';
            validCats.forEach(([id, cat]) => {
                const opt = document.createElement('option');
                opt.value = id; opt.innerText = cat.name || "بدون اسم";
                fusionCat.appendChild(opt);
            });
        }
    } catch (e) { console.error("Error updating series dropdown:", e); }
}

if (inputSearchMovies) inputSearchMovies.oninput = (e) => { movieSearchQuery = e.target.value.toLowerCase().trim(); renderMoviesAccordion(); };



// --- 🔧 MOVIES BATCH OPERATIONS (Accordion Parity) ---
window.toggleMovieSelection = () => {
    isMovieSelectionMode = !isMovieSelectionMode;
    selectedMovieIds = [];
    const bar = getEl('movie-wrench-bar');
    const header = getEl('movie-header');
    if (bar) bar.classList.toggle('hidden', !isMovieSelectionMode);
    if (header) header.classList.toggle('hidden', isMovieSelectionMode);

    updateMovieSelectionUI();
    renderMoviesAccordion();
};

getEl('btn-toggle-movie-wrench').onclick = window.toggleMovieSelection;
getEl('btn-exit-movie-selection').onclick = window.toggleMovieSelection;

function updateMovieSelectionUI() {
    const label = getEl('movie-selected-count');
    if (label) label.innerText = `${selectedMovieIds.length} محدد`;
}

getEl('btn-movie-select-all').onclick = () => {
    if (selectedMovieIds.length > 0) selectedMovieIds = [];
    else {
        Object.keys(currentMovieCategories).forEach(id => selectedMovieIds.push(id));
        Object.keys(currentMovies).forEach(id => selectedMovieIds.push(id));
    }
    updateMovieSelectionUI();
    renderMoviesAccordion();
};

getEl('btn-bulk-movie-delete').onclick = async () => {
    if (selectedMovieIds.length === 0) return;
    const confirmed = await showCustomConfirm(`حذف ${selectedMovieIds.length} عناصر (تصنيفات/أفلام) نهائياً؟`, "حذف مجمع", "🗑️");
    if (!confirmed) return;
    const updates = {};
    selectedMovieIds.forEach(id => {
        if (currentMovieCategories[id]) updates[`movie_categories/${id}`] = null;
        else updates[`movies/${id}`] = null;
    });
    try { await update(ref(db), updates); addLog(`تم الحذف المجمع بنجاح 🗑️`); window.toggleMovieSelection(); } catch (e) {}
};

getEl('btn-bulk-movie-move').onclick = async () => {
    const movieOnlyIds = selectedMovieIds.filter(id => currentMovies[id]);
    if (movieOnlyIds.length === 0) return showCustomAlert("حدد أفلاماً أولاً للنقل.", "تنبيه", "🚀");

    const targetCatId = await showCustomDestinationPicker("movies");
    if (targetCatId === 'cancel') return;

    const updates = {};
    const targetCat = currentMovieCategories[targetCatId];
    const catValue = (targetCatId === 'new') ? "Unsorted" : (targetCat?.name || targetCatId);

    movieOnlyIds.forEach(id => { updates[`movies/${id}/categoryId`] = catValue; });

    try { await update(ref(db), updates); addLog(`تم نقل ${movieOnlyIds.length} أفلام إلى ${catValue} ✅`); window.toggleMovieSelection(); } catch (e) { addLog("فشل نقل الأفلام", true); }
};

getEl('btn-bulk-movie-merge').onclick = () => window.openMovieFusionModal();

window.openMovieFusionModal = () => {
    if (selectedMovieIds.length < 2) return showCustomAlert("حدد فيلمين على الأقل للدمج.");

    const fusionName = getEl('fusion-movie-name');
    const fusionLogo = getEl('fusion-final-logo');
    const fusionCat = getEl('fusion-movie-target-cat');
    const fusionLogos = getEl('fusion-logo-picker');
    const fusionSources = getEl('fusion-sources-list');

    // Guess Name from first
    const firstMovie = currentMovies[selectedMovieIds[0]];
    fusionName.value = VODSanitizer.sanitizeTitle(firstMovie.title);
    fusionLogo.value = firstMovie.logoUrl || "";

    // Categories dropdown
    fusionCat.innerHTML = '';
    Object.entries(currentMovieCategories).forEach(([id, cat]) => {
        const opt = document.createElement('option'); opt.value = id; opt.innerText = cat.name;
        fusionCat.appendChild(opt);
    });

    // Logo Picker
    fusionLogos.innerHTML = '';
    const uniqueLogos = new Set();
    selectedMovieIds.forEach(id => { if (currentMovies[id].logoUrl) uniqueLogos.add(currentMovies[id].logoUrl); });
    uniqueLogos.forEach(url => {
        const img = document.createElement('img');
        img.src = url; img.className = "w-20 h-20 rounded-2xl object-cover bg-black/20 p-1 cursor-pointer border-2 border-transparent hover:border-[#FFC107]";
        img.onclick = () => { fusionLogo.value = url; fusionLogos.querySelectorAll('img').forEach(i => i.classList.remove('border-[#FFC107]')); img.classList.add('border-[#FFC107]'); };
        fusionLogos.appendChild(img);
    });

    // Sources List
    fusionSources.innerHTML = '';
    const extractedServers = [];
    selectedMovieIds.forEach(id => {
        const m = currentMovies[id];
        const res = Sanitizer.processName(m.title);
        (m.servers || []).forEach(s => {
            extractedServers.push({ ...s, originalMovie: m.title, suggestedLabel: res.tag || "Server" });
        });
    });

    extractedServers.forEach((s, i) => {
        const div = document.createElement('div');
        div.className = "p-4 glass rounded-2xl flex items-center justify-between border border-white/5 group";
        div.innerHTML = `
            <div class="flex flex-col text-right">
                <input type="text" value="${s.suggestedLabel}" class="bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white fusion-s-label">
                <p class="text-[9px] text-gray-500 mt-1">من فيلم: ${s.originalMovie}</p>
            </div>
            <div class="text-[9px] font-mono text-gray-400 truncate max-w-[200px]">${s.url}</div>
        `;
        div.dataset.url = s.url;
        fusionSources.appendChild(div);
    });

    openModal('modal-movie-fusion');

    getEl('btn-confirm-fusion').onclick = async () => {
        const finalName = fusionName.value.trim();
        const finalLogo = fusionLogo.value.trim();
        const targetCatId = fusionCat.value;
        if (!finalName || !targetCatId) return;

        const finalServers = [];
        fusionSources.querySelectorAll('.p-4').forEach((row, idx) => {
            finalServers.push({
                name: row.querySelector('.fusion-s-label').value.trim() || `Server ${idx+1}`,
                url: row.dataset.url,
                orderIndex: idx
            });
        });

        const updates = {};
        const newId = `fusion_${Date.now()}`;
        updates[`movies/${newId}`] = {
            id: newId, title: finalName, logoUrl: finalLogo,
            categoryId: currentMovieCategories[targetCatId]?.name,
            servers: finalServers, orderIndex: 0
        };

        selectedMovieIds.forEach(id => updates[`movies/${id}`] = null);

        try {
            await update(ref(db), updates);
            addLog(`تم الدمج في: ${finalName} ✅`);
            closeModal('modal-movie-fusion');
            window.toggleMovieSelection();
        } catch (e) {}
    };
};
if (btnAddCatBanner) btnAddCatBanner.onclick = () => { if (btnAddMovieCat) btnAddMovieCat.click(); };

window.editMovieCat = (id) => {
    activeMovieCatId = id;
    const cat = currentMovieCategories[id];
    if (movieCatNameIn) movieCatNameIn.value = cat.name;
    if (movieCatOrderIn) movieCatOrderIn.value = cat.orderIndex || 0;
    openModal('modal-movie-category');
};

if (btnMovieCatSave) {
    btnMovieCatSave.onclick = async () => {
        const name = movieCatNameIn?.value.trim();
        const order = parseInt(movieCatOrderIn?.value) || 0;
        if (!name) return;
        try {
            if (activeMovieCatId) await update(ref(db, `movie_categories/${activeMovieCatId}`), { name, orderIndex: order });
            else await push(ref(db, 'movie_categories'), { name, orderIndex: order, id: `cat_${Date.now()}` });
            closeModal('modal-movie-category');
        } catch (e) { addLog("خطأ في حفظ التصنيف", true); }
    };
}

if (btnAddMovie) {
    btnAddMovie.onclick = () => {
        activeMovieId = null;
        if (movieTitleIn) movieTitleIn.value = ''; if (movieCatIdIn) movieCatIdIn.value = ''; if (movieLogoIn) movieLogoIn.value = '';
        if (movieBackdropIn) movieBackdropIn.value = ''; if (movieYearIn) movieYearIn.value = ''; if (movieRatingIn) movieRatingIn.value = '';
        if (movieGenreIn) movieGenreIn.value = ''; if (movieDescIn) movieDescIn.value = '';
        if (movieSourcesCont) movieSourcesCont.innerHTML = '';
        addMovieSourceRow('', '');
        openModal('modal-movie');
    };
}

window.editMovie = (id) => {
    activeMovieId = id;
    const m = currentMovies[id];
    if (movieTitleIn) movieTitleIn.value = m.title || '';
    if (movieCatIdIn) movieCatIdIn.value = m.categoryId || '';
    if (movieLogoIn) movieLogoIn.value = m.logoUrl || '';
    if (movieBackdropIn) movieBackdropIn.value = m.backdropUrl || '';
    if (movieYearIn) movieYearIn.value = m.year || '';
    if (movieRatingIn) movieRatingIn.value = m.rating || '';
    if (movieGenreIn) movieGenreIn.value = m.genre || '';
    if (movieDescIn) movieDescIn.value = m.description || '';
    if (movieSourcesCont) {
        movieSourcesCont.innerHTML = '';
        if (m.servers && m.servers.length > 0) m.servers.forEach(s => addMovieSourceRow(s.name, s.url));
        else addMovieSourceRow('', '');
    }
    openModal('modal-movie');
};

window.deleteMovie = async (id) => {
    if (await showCustomConfirm("حذف الفيلم نهائياً؟", "تأكيد الحذف", "🗑️")) {
        try { await remove(ref(db, `movies/${id}`)); addLog("تم حذف الفيلم"); } catch (e) { addLog("فشل الحذف", true); }
    }
};

function addMovieSourceRow(label, url, existingData = null) {
    if (!movieSourcesCont) return;
    const div = document.createElement('div');
    div.className = "flex space-x-2 space-x-reverse items-center movie-source-row mb-2";
    div.dataset.failCount = existingData?.failCount || 0;
    div.dataset.firstFailedAt = existingData?.firstFailedAt || 0;
    div.dataset.isExcluded = existingData?.isExcluded || false;
    div.dataset.wasRecovered = existingData?.wasRecovered || false;
    div.dataset.type = existingData?.type || "mp4";
    div.innerHTML = `<input type="text" placeholder="اسم السيرفر" class="w-1/3 bg-black/40 border border-white/5 rounded-lg p-3 text-[10px] ms-label" value="${label}"><input type="text" placeholder="رابط الفيلم" class="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-[10px] ms-url" value="${url}"><button onclick="this.parentElement.remove()" class="text-red-500 text-xs px-2 hover:scale-125 transition-all">✕</button>`;
    movieSourcesCont.appendChild(div);
}
if (btnAddMovieSource) btnAddMovieSource.onclick = () => addMovieSourceRow('', '');

if (btnMovieSave) {
    btnMovieSave.onclick = async () => {
        const title = movieTitleIn?.value.trim(); const catId = movieCatIdIn?.value;
        if (!title || !catId) return showCustomAlert("ادخل الاسم والتصنيف!", "تنبيه");
        const servers = [];
        if (movieSourcesCont) {
            movieSourcesCont.querySelectorAll('.movie-source-row').forEach((row, i) => {
                const l = row.querySelector('.ms-label').value.trim(); const u = row.querySelector('.ms-url').value.trim();
                if (u) {
                    servers.push({
                        name: l || `Server ${i + 1}`, url: u, orderIndex: i,
                        failCount: parseInt(row.dataset.failCount) || 0,
                        firstFailedAt: parseInt(row.dataset.firstFailedAt) || 0,
                        isExcluded: row.dataset.isExcluded === 'true',
                        wasRecovered: row.dataset.wasRecovered === 'true',
                        type: row.dataset.type || "mp4"
                    });
                }
            });
        }
        const data = { title, categoryId: catId, logoUrl: movieLogoIn?.value.trim(), backdropUrl: movieBackdropIn?.value.trim(), year: movieYearIn?.value.trim(), rating: movieRatingIn?.value.trim(), genre: movieGenreIn?.value.trim(), description: movieDescIn?.value.trim(), servers, orderIndex: activeMovieId ? currentMovies[activeMovieId].orderIndex : Object.keys(currentMovies).length };
        try { if (activeMovieId) await update(ref(db, `movies/${activeMovieId}`), data); else { const newRef = push(ref(db, 'movies')); data.id = newRef.key; await set(newRef, data); } closeModal('modal-movie'); } catch (e) { addLog("خطأ في حفظ الفيلم", true); }
    };
}

// --- 🛠️ MOVIE CONTENT MANAGEMENT (Android Parity) ---
const btnMovieMgmtTrigger = getEl('btn-movie-management-trigger');
if (btnMovieMgmtTrigger) {
    btnMovieMgmtTrigger.onclick = () => openModal('modal-movie-management');
}

// 1. Add Xtream Server (Movies)
getEl('movie-opt-add-xtream').onclick = () => {
    closeModal('modal-movie-management');
    activeXtServerId = null; xtSaveMode = "movies";
    if (xtNameIn) xtNameIn.value = ''; if (xtUrlIn) xtUrlIn.value = ''; if (xtUserIn) xtUserIn.value = ''; if (xtPassIn) xtPassIn.value = '';
    openModal('modal-xtream-server');
};

// 2. Custom Xtream Import (Movies)
getEl('movie-opt-custom-import').onclick = () => {
    closeModal('modal-movie-management');
    const servers = Object.entries(currentMovieSources);
    if (servers.length === 0) return showCustomAlert("يرجى إضافة سيرفر Xtream للأفلام أولاً.");

    if (servers.length === 1) {
        window.startXxtreamImport(servers[0][0]);
    } else {
        window.renderManageMovieServersList(true); // Picker mode
        openModal('modal-manage-movie-servers');
    }
};

// 3. M3U / JSON Import (Movies)
getEl('movie-opt-m3u-import').onclick = () => {
    closeModal('modal-movie-management');
    openModal('modal-m3u-import');
};

// 4. Manage & Delete Servers (Movies)
getEl('movie-opt-manage-servers').onclick = () => {
    closeModal('modal-movie-management');
    window.renderManageMovieServersList(false); // Management mode
    openModal('modal-manage-movie-servers');
};

window.renderManageMovieServersList = (isPicker = false) => {
    const list = getEl('manage-movie-servers-list');
    if (!list) return;
    list.innerHTML = '';

    const sources = Object.entries(currentMovieSources);
    if (sources.length === 0) {
        list.innerHTML = '<p class="text-center py-10 text-gray-500 italic">لا توجد سيرفرات مضافة</p>';
        return;
    }

    sources.forEach(([id, s]) => {
        const div = document.createElement('div');
        div.className = "bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all mb-3 text-right";
        div.innerHTML = `
            <div class="flex-1">
                <h4 class="font-bold text-white text-lg">${s.name}</h4>
                <p class="text-[10px] text-gray-500 font-mono">${s.baseUrl}</p>
            </div>
            <div class="flex items-center space-x-2 space-x-reverse">
                ${isPicker ? `
                    <button onclick="window.startXxtreamImport('${id}'); closeModal('modal-manage-movie-servers')" class="px-6 py-3 bg-[#FFC107] text-black rounded-2xl font-black hover:scale-105 transition-all">
                        اختيار للاستيراد 📥
                    </button>
                ` : `
                    <button onclick="window.editXtServer('${id}'); closeModal('modal-manage-movie-servers')" class="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm">✏️</button>
                    <button onclick="window.deleteXtServer('${id}'); window.renderManageMovieServersList(false);" class="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-sm">🗑️</button>
                `}
            </div>`;
        list.appendChild(div);
    });
};

// 5. Clean & Sort (Fusion Engine for Movies)
getEl('movie-opt-clean-sort').onclick = async () => {
    closeModal('modal-movie-management');
    const confirmed = await showCustomConfirm("هل تريد تشغيل محرك التنظيف والدمج الذكي على جميع الأفلام؟", "محرك تنظيف الأفلام", "⚡");
    if (confirmed) await executeSmartMovieCleanup();
};

async function executeSmartMovieCleanup() {
    addLog("بدء عملية تنظيف ودمج الأفلام المكررة...");
    const updates = {};
    const grouped = {};
    let mergedCount = 0;
    let titleFixCount = 0;

    Object.entries(currentMovies).forEach(([id, m]) => {
        const cleanTitle = VODSanitizer.sanitizeTitle(m.title);
        const key = cleanTitle.toLowerCase().trim();
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({ id, ...m, cleanTitle });
    });

    Object.entries(grouped).forEach(([key, list]) => {
        const cleanTitle = list[0].cleanTitle;
        if (list.length > 1) {
            const master = JSON.parse(JSON.stringify(list[0]));
            master.title = cleanTitle;
            const finalServers = [];
            const urlsSeen = new Set();

            list.forEach(m => {
                (m.servers || []).forEach(s => {
                    if (!urlsSeen.has(s.url)) {
                        urlsSeen.add(s.url);
                        finalServers.push({ ...s, name: `سيرفر ${finalServers.length + 1}`, orderIndex: finalServers.length });
                    }
                });
                if (m.id !== master.id) {
                    updates[`movies/${m.id}`] = null;
                    mergedCount++;
                }
            });
            master.servers = finalServers;
            updates[`movies/${master.id}`] = master;
        } else {
            const item = list[0];
            if (item.title !== cleanTitle) {
                updates[`movies/${item.id}/title`] = cleanTitle;
                titleFixCount++;
            }
        }
    });

    if (Object.keys(updates).length > 0) {
        try {
            await update(ref(db), updates);
            addLog(`تم الانتهاء! دمج ${mergedCount} مكرر، تنظيف ${titleFixCount} عنوان. ✅`);
            await showCustomAlert(`تم دمج ${mergedCount} مكررات وتنظيف ${titleFixCount} عناوين.`, "نجاح");
        } catch (e) { addLog("فشل تحديث Firebase", true); }
    } else {
        await showCustomAlert("مكتبة الأفلام نظيفة تماماً.", "محرك التنظيف", "✨");
    }
}

// --- FILE / URL IMPORT LOGIC ---
function updateM3uCatDropdown() {
    // For M3U import, we usually use a free-text category or a simple dropdown.
    // The HTML has a text input: m3u-target-category.
}

if (btnExecuteM3uImport) {
    btnExecuteM3uImport.onclick = async () => {
        const url = m3uUrlInput?.value.trim();
        const file = m3uFileInput?.files ? m3uFileInput.files[0] : null;
        if (!url && !file) return showCustomAlert("يرجى إدخال رابط أو اختيار ملف", "تنبيه");

        // 🛡️ Destination Picker
        const targetOption = await showCustomDestinationPicker("movies");
        if (targetOption === 'cancel') return;

        btnExecuteM3uImport.innerText = "جاري المعالجة...";
        btnExecuteM3uImport.disabled = true;

        try {
            let content = "";
            if (file) content = await file.text();
            else { const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`); content = await res.text(); }

            let movies = [];
            if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
                const data = JSON.parse(content);
                const rawList = Array.isArray(data) ? data : Object.values(data);
                movies = rawList.map(it => ({ title: it.name || it.title, logoUrl: it.logo || it.logoUrl, url: it.url, group: it.group || "Imported" }));
            } else {
                // ... M3U Parsing logic ...
                const lines = content.split(/\r?\n/); let current = null;
                const logoRegex = /tvg-logo="([^"]*)"/; const tvgNameRegex = /tvg-name="([^"]*)"/;
                const groupRegex = /group-title="([^"]*)"/i; const excludeKeywords = /live|tv|series|مسلسلات|قنوات|مباشر|24\/7/i;
                const liveExtensions = /\.(m3u8|ts)(\?.*)?$/i;
                lines.forEach(line => {
                    const trimmed = line.trim(); if (!trimmed) return;
                    if (trimmed.startsWith("#EXTINF:")) {
                        const grp = trimmed.match(groupRegex)?.[1] || "";
                        if (excludeKeywords.test(grp)) { current = null; return; }
                        const logo = trimmed.match(logoRegex)?.[1] || "";
                        const tvgName = trimmed.match(tvgNameRegex)?.[1] || "";
                        const lastName = trimmed.split(",").pop().trim();
                        current = { title: (lastName && lastName !== "-1") ? lastName : tvgName, logoUrl: logo, group: grp || "Imported" };
                    } else if (!trimmed.startsWith("#")) {
                        if (current) {
                            if (liveExtensions.test(trimmed) && !(current.group.toLowerCase().includes("vod") || current.group.includes("أفلام"))) { current = null; return; }
                            current.url = trimmed; movies.push(current); current = null;
                        }
                    }
                });
            }

            if (movies.length === 0) throw new Error("لم يتم العثور على بيانات");

            const updates = {}; const now = Date.now();
            movies.forEach((m, i) => {
                const id = `import_${now}_${i}`;
                const destinationCatName = (targetOption === 'new') ? m.group : currentNetworks[targetOption]?.name || m.group;

                updates[`movies/${id}`] = {
                    id, title: VODSanitizer.sanitizeTitle(m.title || "Unnamed"),
                    logoUrl: m.logoUrl || "", categoryId: destinationCatName,
                    servers: [{ name: "سيرفر 1", url: m.url, orderIndex: 0 }],
                    orderIndex: i
                };

                if (targetOption === 'new') {
                    const catKey = `cat_${m.group.replace(/\s+/g, '_')}`;
                    updates[`movie_categories/${catKey}`] = { id: catKey, name: m.group, orderIndex: 99 };
                }
            });

            await update(ref(db), updates);
            addLog(`تم استيراد ${movies.length} فيلم بنجاح!`);
            await showCustomAlert(`تم استيراد ${movies.length} فيلم.`, "نجاح", "✅");
            closeModal('modal-m3u-import');
        } catch (err) { addLog("فشل الاستيراد", true); await showCustomAlert("خطأ: " + err.message, "فشل", "❌"); }
        finally { btnExecuteM3uImport.innerText = "بدء الاستيراد 🚀"; btnExecuteM3uImport.disabled = false; }
    };
}

// --- 🍿 SERIES RENDERING (Unified Sync with Android Core) ---
onValue(ref(db, 'series_categories'), (snap) => {
    try {
        console.log("📦 SERIES TRACE: Triggering series_categories listener...");
        const data = snap.val() || {};
        currentSeriesCategories = data;

        const extractedSeries = {};
        Object.entries(data).forEach(([catId, cat]) => {
            if (cat && cat.series) {
                Object.entries(cat.series).forEach(([sId, s]) => {
                    if (s) extractedSeries[sId] = { ...s, id: sId, categoryId: catId };
                });
            }
        });
        currentSeries = extractedSeries;

        updateSeriesCatDropdown();
        renderSeriesAccordion();
        addLog("تمت مزامنة المسلسلات بنجاح 🍿");
    } catch (e) {
        console.error("❌ SERIES RENDER CRASH:", e);
        addLog("خطأ في عرض المسلسلات: " + e.message, true);
    }
});

function renderSeriesAccordion() {
    const container = getEl('series-accordion');
    if (!container) return;
    container.innerHTML = '';

    if (seriesCategorySortable) seriesCategorySortable.destroy();

    const grouped = {};
    Object.entries(currentSeries).forEach(([id, s]) => {
        const catId = s.categoryId || "unsorted";
        if (!grouped[catId]) grouped[catId] = [];
        grouped[catId].push({ id, ...s });
    });

    const sortedCats = Object.entries(currentSeriesCategories).sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));

    if (sortedCats.length === 0) {
        container.innerHTML = '<p class="text-gray-500 animate-pulse text-center py-20">لا توجد تصنيفات مسلسلات...</p>';
        return;
    }

    sortedCats.forEach(([catId, cat]) => {
        const list = grouped[catId] || [];
        let filtered = list;
        if (seriesSearchQuery) {
            filtered = list.filter(s => s.title?.toLowerCase().includes(seriesSearchQuery));
            if (filtered.length === 0) return;
        }

        const isExpanded = expandedSeriesCatIds.has(catId) || !!seriesSearchQuery;
        const isSelected = isSeriesSelectionMode && selectedSeriesIds.includes(catId);

        const row = document.createElement('div');
        row.className = "series-category-row mb-4";
        row.dataset.id = catId;

        row.innerHTML = `
            <div class="glass rounded-3xl overflow-hidden border ${isSelected ? 'border-purple-500 bg-purple-500/5' : 'border-white/5'} transition-all">
                <div class="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5" onclick="window.handleSeriesRowClick(event, '${catId}')">
                    <div class="flex items-center space-x-4 space-x-reverse">
                        <span class="text-gray-700 text-xl cursor-move series-cat-handle ml-2" onclick="event.stopPropagation()">⠿</span>
                        <span class="text-purple-400 text-lg transition-transform duration-300 p-2 hover:bg-white/10 rounded-lg ${isExpanded ? 'rotate-180' : ''}" onclick="event.stopPropagation(); window.toggleSeriesCatOnly('${catId}')">▼</span>
                        ${isSeriesSelectionMode ? `<div onclick="event.stopPropagation(); window.selectSeriesItem('${catId}', 'categories')" class="w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20'} flex items-center justify-center text-black font-bold text-xs ml-2">${isSelected ? '✓' : ''}</div>` : ''}
                        <div>
                            <h4 class="text-lg font-bold text-white">${cat.name}</h4>
                            <p class="text-[10px] text-gray-400 font-mono">ID: ${catId.slice(0, 8)} | #${cat.orderIndex || 0}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 space-x-reverse" onclick="event.stopPropagation()">
                        <span class="bg-white/5 px-3 py-1 rounded-full text-[10px] text-gray-400">${list.length} مسلسل</span>
                        ${!isSeriesSelectionMode ? `
                            <button onclick="window.addSeriesToCat('${catId}')" class="p-2 bg-green-500/10 text-green-500 rounded-xl text-[10px] hover:bg-green-500 hover:text-white transition-all font-bold">مسلسل +</button>
                            <button onclick="window.editSeriesCat('${catId}')" class="p-2 bg-blue-500/10 text-blue-400 rounded-xl text-xs hover:bg-blue-500 hover:text-white">✏️</button>
                            <button onclick="window.deleteSeriesCat('${catId}')" class="p-2 bg-red-500/10 text-red-500 rounded-xl text-xs hover:bg-red-500 hover:text-white">🗑️</button>
                        ` : ''}
                    </div>
                </div>
                <div id="series-list-${catId}" class="p-6 pt-2 ${isExpanded ? '' : 'hidden'} border-t border-white/5 bg-black/10">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"></div>
                </div>
            </div>`;

        container.appendChild(row);
        if (isExpanded) renderSeriesItemsInAccordion(filtered, row.querySelector('.grid'), catId);
    });

    if (typeof Sortable !== 'undefined') {
        seriesCategorySortable = new Sortable(container, { animation: 150, handle: '.series-cat-handle', draggable: '.series-category-row', onEnd: handleSeriesCategoryDragEnd });
    }
}

function renderSeriesItemsInAccordion(items, container, catId) {
    if (!container) return;
    container.innerHTML = '';
    items.sort((a,b) => (a.orderIndex || 0) - (b.orderIndex || 0)).forEach(s => {
        const isSelected = isSeriesSelectionMode && selectedSeriesIds.includes(s.id);
        const card = document.createElement('div');
        card.className = `group relative bg-white/5 border ${isSelected ? 'border-purple-500 bg-purple-500/5' : 'border-white/5'} rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer shadow-lg`;
        card.onclick = (e) => { e.stopPropagation(); if (isSeriesSelectionMode) window.selectSeriesItem(s.id, 'series', catId); else window.editSeries(s.id); };

        const selectionOverlay = isSeriesSelectionMode ? `<div class="absolute inset-0 bg-purple-500/10 z-10 flex items-center justify-center"><div class="w-10 h-10 rounded-full ${isSelected ? 'bg-purple-500 text-white' : 'bg-black/40 border border-white/20 text-white'} flex items-center justify-center font-bold shadow-xl">${isSelected ? '✓' : ''}</div></div>` : '';

        card.innerHTML = `
            <div class="aspect-[2/3] relative">
                ${selectionOverlay}
                <img src="${s.logoUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" onerror="this.src='https://via.placeholder.com/300x450?text=No+Cover'">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-bold text-[#FFC107]">⭐ ${s.rating || 'N/A'}</div>
                <div class="absolute bottom-2 right-2 flex flex-col items-end"><span class="text-[8px] bg-purple-600 text-white px-1.5 rounded-md font-black mb-1">${s.year || ''}</span></div>
            </div>
            <div class="p-3">
                <h5 class="text-[10px] md:text-xs font-bold text-white truncate text-right">${s.title}</h5>
                <div class="flex justify-between items-center mt-2"><span class="text-[8px] text-gray-500">${Object.keys(s.seasons || {}).length} موسم</span>${!isSeriesSelectionMode ? `<button class="text-red-500 opacity-0 group-hover:opacity-100 hover:scale-125 transition-all text-[10px]" onclick="event.stopPropagation(); window.deleteSeries('${s.id}')">🗑️</button>` : ''}</div>
            </div>`;
        container.appendChild(card);
    });
}

// --- 🍿 SERIES INTERACTION HANDLERS ---
window.toggleSeriesCatOnly = (id) => { expandedSeriesCatIds.has(id) ? expandedSeriesCatIds.delete(id) : expandedSeriesCatIds.add(id); renderSeriesAccordion(); };
window.handleSeriesRowClick = (e, id) => { isSeriesSelectionMode ? window.selectSeriesItem(id, 'categories') : window.toggleSeriesCatOnly(id); };

window.selectSeriesItem = (id, type, catId = null) => {
    const idx = selectedSeriesIds.indexOf(id); const isAdding = idx === -1;
    isAdding ? selectedSeriesIds.push(id) : selectedSeriesIds.splice(idx, 1);
    if (type === 'categories') {
        const inCat = Object.entries(currentSeries).filter(([mId, s]) => s.categoryId === currentSeriesCategories[id]?.name || s.categoryId === id);
        inCat.forEach(([mId]) => { const mIdx = selectedSeriesIds.indexOf(mId); if (isAdding) { if (mIdx === -1) selectedSeriesIds.push(mId); } else { if (mIdx > -1) selectedSeriesIds.splice(mIdx, 1); } });
    }
    const label = getEl('series-selected-count'); if (label) label.innerText = `${selectedSeriesIds.length} محدد`;
    renderSeriesAccordion();
};

window.addSeriesToCat = (catId) => {
    activeSeriesId = null; seriesEditBuffer = { seasons: {} };
    if (seriesTitleIn) seriesTitleIn.value = ''; if (seriesCatIdIn) seriesCatIdIn.value = catId;
    if (seriesLogoIn) seriesLogoIn.value = ''; if (seriesBackdropIn) seriesBackdropIn.value = '';
    renderEditBuffer(); switchSeriesTab('meta'); openModal('modal-series-manager');
};

async function handleSeriesCategoryDragEnd() {
    const updates = {}; Array.from(getEl('series-accordion').querySelectorAll('.series-category-row')).forEach((row, index) => { const id = row.dataset.id; if (currentSeriesCategories[id] && currentSeriesCategories[id].orderIndex !== index) updates[`series_categories/${id}/orderIndex`] = index; });
    if (Object.keys(updates).length > 0) { try { await update(ref(db), updates); addLog("تم تحديث ترتيب تصنيفات المسلسلات ✅"); } catch (e) {} }
}

// --- 🔧 SERIES BATCH OPERATIONS (Accordion Parity) ---
window.toggleSeriesSelection = () => {
    isSeriesSelectionMode = !isMovieSelectionMode;
    isSeriesSelectionMode = !isSeriesSelectionMode;
    selectedSeriesIds = [];
    const bar = getEl('series-wrench-bar'); const header = getEl('series-header');
    if (bar) bar.classList.toggle('hidden', !isSeriesSelectionMode); if (header) header.classList.toggle('hidden', isSeriesSelectionMode);
    renderSeriesAccordion();
};
getEl('btn-toggle-series-wrench').onclick = window.toggleSeriesSelection;
getEl('btn-exit-series-selection').onclick = window.toggleSeriesSelection;

getEl('btn-series-select-all').onclick = () => {
    if (selectedSeriesIds.length > 0) selectedSeriesIds = [];
    else { Object.keys(currentSeriesCategories).forEach(id => selectedSeriesIds.push(id)); Object.keys(currentSeries).forEach(id => selectedSeriesIds.push(id)); }
    const label = getEl('series-selected-count'); if (label) label.innerText = `${selectedSeriesIds.length} محدد`;
    renderSeriesAccordion();
};

getEl('btn-bulk-series-delete').onclick = async () => {
    if (selectedSeriesIds.length === 0) return;
    if (!await showCustomConfirm(`حذف ${selectedSeriesIds.length} عناصر نهائياً؟`, "حذف مجمع", "🗑️")) return;
    const updates = {}; selectedSeriesIds.forEach(id => { if (currentSeriesCategories[id]) updates[`series_categories/${id}`] = null; else updates[`series/${id}`] = null; });
    try { await update(ref(db), updates); addLog(`تم الحذف المجمع بنجاح 🗑️`); window.toggleSeriesSelection(); } catch (e) {}
};

getEl('btn-bulk-series-move').onclick = async () => {
    const serOnlyIds = selectedSeriesIds.filter(id => currentSeries[id]);
    if (serOnlyIds.length === 0) return showCustomAlert("حدد مسلسلات أولاً للنقل.");
    const targetCatId = await showCustomDestinationPicker("series");
    if (targetCatId === 'cancel') return;
    const updates = {}; const targetCat = currentSeriesCategories[targetCatId]; const catValue = (targetCatId === 'new') ? "Unsorted" : (targetCat?.name || targetCatId);
    serOnlyIds.forEach(id => { updates[`series/${id}/categoryId`] = catValue; });
    try { await update(ref(db), updates); addLog(`تم نقل ${serOnlyIds.length} مسلسلات إلى ${catValue} ✅`); window.toggleSeriesSelection(); } catch (e) {}
};

// --- 🧬 SERIES FUSION ENGINE ---
getEl('btn-bulk-series-merge').onclick = () => {
    const selIds = selectedSeriesIds.filter(id => currentSeries[id]);
    if (selIds.length < 2) return showCustomAlert("حدد مسلسلين على الأقل للدمج.");

    const fusionName = getEl('fusion-series-name');
    const fusionLogo = getEl('fusion-series-final-logo');
    const fusionCat = getEl('fusion-series-target-cat');
    const fusionLogos = getEl('fusion-series-logo-picker');
    const fusionList = getEl('fusion-series-list');

    const first = currentSeries[selIds[0]];
    fusionName.value = VODSanitizer.sanitizeTitle(first.title);
    fusionLogo.value = first.logoUrl || "";

    fusionCat.innerHTML = '';
    Object.entries(currentSeriesCategories).forEach(([id, cat]) => {
        const opt = document.createElement('option'); opt.value = id; opt.innerText = cat.name;
        fusionCat.appendChild(opt);
    });

    fusionLogos.innerHTML = ''; const uniqueLogos = new Set();
    selIds.forEach(id => { if (currentSeries[id].logoUrl) uniqueLogos.add(currentSeries[id].logoUrl); });
    uniqueLogos.forEach(url => {
        const img = document.createElement('img'); img.src = url;
        img.className = "w-20 h-20 rounded-2xl object-cover bg-black/20 p-1 cursor-pointer border-2 border-transparent hover:border-purple-400";
        img.onclick = () => { fusionLogo.value = url; fusionLogos.querySelectorAll('img').forEach(i => i.classList.remove('border-purple-400')); img.classList.add('border-purple-400'); };
        fusionLogos.appendChild(img);
    });

    fusionList.innerHTML = '';
    selIds.forEach(id => {
        const s = currentSeries[id];
        const div = document.createElement('div'); div.className = "p-4 glass rounded-2xl flex items-center justify-between border border-white/5";
        div.innerHTML = `<div class="text-right"><p class="font-bold text-white text-xs">${s.title}</p><p class="text-[9px] text-gray-500">${Object.keys(s.seasons || {}).length} موسم</p></div>`;
        fusionList.appendChild(div);
    });

    openModal('modal-series-fusion');

    getEl('btn-confirm-series-fusion').onclick = async () => {
        const finalName = fusionName.value.trim(); const targetId = fusionCat.value;
        if (!finalName || !targetId) return;

        const combinedSeasons = {};
        selIds.forEach(id => {
            const s = currentSeries[id];
            if (s.seasons) {
                Object.entries(s.seasons).forEach(([num, season]) => {
                    if (!combinedSeasons[num]) combinedSeasons[num] = season;
                    else { if (season.episodes) Object.assign(combinedSeasons[num].episodes, season.episodes); }
                });
            }
        });

        const newId = `ser_fusion_${Date.now()}`;
        const updates = {};
        updates[`series/${newId}`] = { id: newId, title: finalName, logoUrl: fusionLogo.value, categoryId: currentSeriesCategories[targetId]?.name, seasons: combinedSeasons, orderIndex: 0 };
        selIds.forEach(id => updates[`series/${id}`] = null);

        try { await update(ref(db), updates); addLog(`تم دمج المسلسلات بنجاح ✅`); closeModal('modal-series-fusion'); window.toggleSeriesSelection(); } catch (e) {}
    };
};

// --- 🍿 SERIES CONTENT MANAGEMENT (Android Parity) ---
const btnSeriesMgmtTrigger = getEl('btn-series-management-trigger');
if (btnSeriesMgmtTrigger) btnSeriesMgmtTrigger.onclick = () => openModal('modal-series-management');

getEl('series-opt-add-xtream').onclick = () => { closeModal('modal-series-management'); activeXtServerId = null; xtSaveMode = "series"; if (xtNameIn) xtNameIn.value = ''; if (xtUrlIn) xtUrlIn.value = ''; openModal('modal-xtream-server'); };
getEl('series-opt-custom-import').onclick = () => {
    closeModal('modal-series-management'); const srvs = Object.entries(currentSeriesSources);
    if (srvs.length === 0) return showCustomAlert("يرجى إضافة سيرفر Xtream للمسلسلات أولاً.");
    srvs.length === 1 ? window.startXxtreamSeriesImport(srvs[0][0]) : (window.renderManageSeriesServersList(true), openModal('modal-manage-series-servers'));
};
getEl('series-opt-m3u-import').onclick = () => { closeModal('modal-series-management'); openModal('modal-series-m3u-import'); };
getEl('series-opt-manage-servers').onclick = () => { closeModal('modal-series-management'); window.renderManageSeriesServersList(false); openModal('modal-manage-series-servers'); };
getEl('series-opt-clean-sort').onclick = async () => { closeModal('modal-series-management'); if (await showCustomConfirm("تشغيل محرك التنظيف الذكي للمسلسلات؟")) await executeSmartSeriesCleanup(); };

window.renderManageSeriesServersList = (isPicker = false) => {
    const list = getEl('manage-series-servers-list'); if (!list) return; list.innerHTML = '';
    const sources = Object.entries(currentSeriesSources);
    if (sources.length === 0) { list.innerHTML = '<p class="text-center py-10 text-gray-500 italic">لا توجد سيرفرات مضافة</p>'; return; }
    sources.forEach(([id, s]) => {
        const div = document.createElement('div'); div.className = "bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all mb-3 text-right";
        div.innerHTML = `<div class="flex-1"><h4 class="font-bold text-white text-lg">${s.name}</h4><p class="text-[10px] text-gray-500 font-mono">${s.baseUrl}</p></div><div class="flex items-center space-x-2 space-x-reverse">${isPicker ? `<button onclick="window.startXxtreamSeriesImport('${id}'); closeModal('modal-manage-series-servers')" class="px-6 py-3 bg-[#FFC107] text-black rounded-2xl font-black">اختيار 📥</button>` : `<button onclick="window.editSeriesXtServer('${id}'); closeModal('modal-manage-series-servers')" class="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">✏️</button><button onclick="window.deleteSeriesXtServer('${id}'); window.renderManageSeriesServersList(false);" class="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">🗑️</button>`}</div>`;
        list.appendChild(div);
    });
};

// --- SERIES CRUD ---
if (btnAddSeriesCat) {
    btnAddSeriesCat.onclick = () => { activeSeriesCatId = null; if (seriesCatNameIn) seriesCatNameIn.value = ''; if (seriesCatOrderIn) seriesCatOrderIn.value = Object.keys(currentSeriesCategories).length; openModal('modal-series-category'); };
}
if (btnAddSeriesCatBanner) btnAddSeriesCatBanner.onclick = () => { if (btnAddSeriesCat) btnAddSeriesCat.click(); };

window.editSeriesCat = (id) => { activeSeriesCatId = id; const cat = currentSeriesCategories[id]; if (seriesCatNameIn) seriesCatNameIn.value = cat.name; if (seriesCatOrderIn) seriesCatOrderIn.value = cat.orderIndex || 0; openModal('modal-series-category'); };

if (btnSeriesCatSave) {
    btnSeriesCatSave.onclick = async () => {
        const name = seriesCatNameIn?.value.trim(); const order = parseInt(seriesCatOrderIn?.value) || 0;
        if (!name) return;
        try {
            if (activeSeriesCatId) await update(ref(db, `series_categories/${activeSeriesCatId}`), { name, orderIndex: order });
            else await push(ref(db, 'series_categories'), { name, orderIndex: order, id: `scat_${Date.now()}` });
            closeModal('modal-series-category');
        } catch (e) { addLog("خطأ في حفظ التصنيف", true); }
    };
}

if (btnAddSeries) {
    btnAddSeries.onclick = () => {
        activeSeriesId = null; seriesEditBuffer = { seasons: {} };
        if (seriesTitleIn) seriesTitleIn.value = ''; if (seriesCatIdIn) seriesCatIdIn.value = ''; if (seriesLogoIn) seriesLogoIn.value = '';
        if (seriesBackdropIn) seriesBackdropIn.value = ''; if (seriesYearIn) seriesYearIn.value = ''; if (seriesRatingIn) seriesRatingIn.value = '';
        if (seriesGenreIn) seriesGenreIn.value = ''; if (seriesDescIn) seriesDescIn.value = '';
        renderEditBuffer(); switchSeriesTab('meta'); openModal('modal-series-manager');
    };
}

window.editSeries = (id) => {
    activeSeriesId = id; const s = currentSeries[id];
    if (seriesTitleIn) seriesTitleIn.value = s.title || '';
    if (seriesCatIdIn) seriesCatIdIn.value = s.categoryId || '';
    if (seriesLogoIn) seriesLogoIn.value = s.logoUrl || '';
    if (seriesBackdropIn) seriesBackdropIn.value = s.backdropUrl || '';
    if (seriesYearIn) seriesYearIn.value = s.year || '';
    if (seriesRatingIn) seriesRatingIn.value = s.rating || '';
    if (seriesGenreIn) seriesGenreIn.value = s.genre || '';
    if (seriesDescIn) seriesDescIn.value = s.description || '';
    seriesEditBuffer = JSON.parse(JSON.stringify(s)); if (!seriesEditBuffer.seasons) seriesEditBuffer.seasons = {};
    renderEditBuffer(); switchSeriesTab('meta'); openModal('modal-series-manager');
};

window.deleteSeries = async (id) => {
    if (await showCustomConfirm("حذف المسلسل نهائياً؟", "تأكيد الحذف", "🗑️")) {
        try { await remove(ref(db, `series/${id}`)); addLog("تم حذف المسلسل"); } catch (e) { addLog("فشل الحذف", true); }
    }
};

window.switchSeriesTab = (tab) => {
    const metaBtn = getEl('tab-series-meta'); const seasonsBtn = getEl('tab-series-seasons');
    const metaPane = getEl('series-pane-meta'); const seasonsPane = getEl('series-pane-seasons');
    if (!metaBtn || !seasonsBtn || !metaPane || !seasonsPane) return;
    if (tab === 'meta') {
        metaBtn.classList.add('border-[#FFC107]', 'text-[#FFC107]'); metaBtn.classList.remove('text-gray-500', 'border-transparent');
        seasonsBtn.classList.add('text-gray-500', 'border-transparent'); seasonsBtn.classList.remove('border-[#FFC107]', 'text-[#FFC107]');
        metaPane.classList.remove('hidden'); seasonsPane.classList.add('hidden');
    } else {
        seasonsBtn.classList.add('border-[#FFC107]', 'text-[#FFC107]'); seasonsBtn.classList.remove('text-gray-500', 'border-transparent');
        metaBtn.classList.add('text-gray-500', 'border-transparent'); metaBtn.classList.remove('border-[#FFC107]', 'text-[#FFC107]');
        seasonsPane.classList.remove('hidden'); metaPane.classList.add('hidden');
    }
};

function renderEditBuffer() {
    if (!seriesSeasonsList) return;
    seriesSeasonsList.innerHTML = '';
    const sortedSeasons = Object.entries(seriesEditBuffer.seasons).sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));
    sortedSeasons.forEach(([num, season]) => {
        const btn = document.createElement('button');
        btn.className = `w-full p-3 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between group ${activeSeasonNum === num ? 'bg-[#FFC107] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`;
        btn.innerHTML = `<span>موسم ${num}</span> <span class="opacity-0 group-hover:opacity-100 text-red-500" onclick="event.stopPropagation(); window.deleteSeason('${num}')">✕</span>`;
        btn.onclick = () => { activeSeasonNum = num; renderEditBuffer(); };
        seriesSeasonsList.appendChild(btn);
    });
    renderEpisodesForActiveSeason();
}

function renderEpisodesForActiveSeason() {
    if (!seriesEpisodesList) return;
    seriesEpisodesList.innerHTML = '';
    if (btnAddEpisode) btnAddEpisode.classList.add('hidden');
    if (!activeSeasonNum || !seriesEditBuffer.seasons[activeSeasonNum]) {
        if (activeSeasonTitle) activeSeasonTitle.innerText = "اختر موسماً للعرض";
        return;
    }
    if (activeSeasonTitle) { activeSeasonTitle.innerText = `حلقات الموسم ${activeSeasonNum}`; activeSeasonTitle.classList.remove('text-gray-400'); activeSeasonTitle.classList.add('text-white'); }
    if (btnAddEpisode) btnAddEpisode.classList.remove('hidden');
    const episodes = seriesEditBuffer.seasons[activeSeasonNum].episodes || {};
    const sortedEps = Object.entries(episodes).sort((a,b) => (a[1].orderIndex || 0) - (b[1].orderIndex || 0));
    sortedEps.forEach(([id, ep]) => {
        const div = document.createElement('div');
        div.className = "bg-white/5 p-3 rounded-xl flex items-center justify-between group border border-transparent hover:border-white/10 transition-all";
        div.innerHTML = `<div class="flex items-center space-x-3 space-x-reverse"><span class="w-6 h-6 rounded bg-[#FFC107]/20 text-[#FFC107] flex items-center justify-center text-[10px] font-bold">${ep.orderIndex || 0}</span><span class="text-xs font-bold text-white">${ep.title}</span></div><div class="flex items-center space-x-2 space-x-reverse"><button onclick="window.editEpisode('${id}')" class="text-blue-400 text-[10px] hover:underline">تعديل</button><button onclick="window.deleteEpisode('${id}')" class="text-red-500 text-[10px] hover:underline">حذف</button></div>`;
        seriesEpisodesList.appendChild(div);
    });
}

if (btnAddSeason) {
    btnAddSeason.onclick = () => {
        const num = prompt("أدخل رقم الموسم:");
        if (num && !seriesEditBuffer.seasons[num]) {
            seriesEditBuffer.seasons[num] = { id: `s_${num}`, name: `Season ${num}`, orderIndex: parseInt(num), episodes: {} };
            activeSeasonNum = num; renderEditBuffer();
        }
    };
}

window.deleteSeason = (num) => {
    if (confirm(`حذف الموسم ${num} وكل حلقاته؟`)) {
        delete seriesEditBuffer.seasons[num]; if (activeSeasonNum === num) activeSeasonNum = null; renderEditBuffer();
    }
};

if (btnAddEpisode) {
    btnAddEpisode.onclick = () => {
        activeEpisodeId = null; if (epTitleIn) epTitleIn.value = '';
        if (epOrderIn) epOrderIn.value = Object.keys(seriesEditBuffer.seasons[activeSeasonNum].episodes || {}).length + 1;
        if (epSourcesCont) epSourcesCont.innerHTML = ''; addEpSourceRow('', ''); openModal('modal-episode-editor');
    };
}

window.editEpisode = (id) => {
    activeEpisodeId = id; const ep = seriesEditBuffer.seasons[activeSeasonNum].episodes[id];
    if (epTitleIn) epTitleIn.value = ep.title || '';
    if (epOrderIn) epOrderIn.value = ep.orderIndex || 0;
    if (epSourcesCont) {
        epSourcesCont.innerHTML = '';
        if (ep.servers) ep.servers.forEach(s => addEpSourceRow(s.name, s.url)); else addEpSourceRow('', '');
    }
    openModal('modal-episode-editor');
};

window.deleteEpisode = (id) => {
    delete seriesEditBuffer.seasons[activeSeasonNum].episodes[id]; renderEpisodesForActiveSeason();
};

function addEpSourceRow(label, url, existingData = null) {
    if (!epSourcesCont) return;
    const div = document.createElement('div');
    div.className = "flex space-x-2 space-x-reverse items-center ep-source-row mb-2";
    div.dataset.failCount = existingData?.failCount || 0;
    div.dataset.firstFailedAt = existingData?.firstFailedAt || 0;
    div.dataset.isExcluded = existingData?.isExcluded || false;
    div.dataset.wasRecovered = existingData?.wasRecovered || false;
    div.dataset.type = existingData?.type || "mp4";
    div.innerHTML = `<input type="text" placeholder="سيرفر" class="w-1/4 bg-black/40 border border-white/5 rounded-lg p-2 text-[10px] es-label" value="${label}"><input type="text" placeholder="الرابط" class="flex-1 bg-black/40 border border-white/5 rounded-lg p-2 text-[10px] es-url" value="${url}"><button onclick="this.parentElement.remove()" class="text-red-500 px-2 text-xs">✕</button>`;
    epSourcesCont.appendChild(div);
}
if (btnAddEpSource) btnAddEpSource.onclick = () => addEpSourceRow('', '');

if (btnEpSave) {
    btnEpSave.onclick = () => {
        const title = epTitleIn?.value.trim(); const order = parseInt(epOrderIn?.value) || 0; if (!title) return;
        const servers = [];
        if (epSourcesCont) {
            epSourcesCont.querySelectorAll('.ep-source-row').forEach((row, i) => {
                const l = row.querySelector('.es-label').value.trim(); const u = row.querySelector('.es-url').value.trim();
                if (u) {
                    servers.push({
                        name: l || `Server ${i + 1}`, url: u, orderIndex: i,
                        failCount: parseInt(row.dataset.failCount) || 0,
                        firstFailedAt: parseInt(row.dataset.firstFailedAt) || 0,
                        isExcluded: row.dataset.isExcluded === 'true',
                        wasRecovered: row.dataset.wasRecovered === 'true',
                        type: row.dataset.type || "mp4"
                    });
                }
            });
        }
        const epId = activeEpisodeId || `ep_${Date.now()}`;
        seriesEditBuffer.seasons[activeSeasonNum].episodes[epId] = { id: epId, title, orderIndex: order, servers };
        closeModal('modal-episode-editor'); renderEpisodesForActiveSeason();
    };
}

if (btnSeriesSave) {
    btnSeriesSave.onclick = async () => {
        const title = seriesTitleIn?.value.trim(); const catId = seriesCatIdIn?.value;
        if (!title || !catId) return showCustomAlert("ادخل الاسم والتصنيف!", "تنبيه");
        seriesEditBuffer.title = title; seriesEditBuffer.categoryId = catId;
        seriesEditBuffer.logoUrl = seriesLogoIn?.value.trim(); seriesEditBuffer.backdropUrl = seriesBackdropIn?.value.trim();
        seriesEditBuffer.year = seriesYearIn?.value.trim(); seriesEditBuffer.rating = seriesRatingIn?.value.trim();
        seriesEditBuffer.genre = seriesGenreIn?.value.trim(); seriesEditBuffer.description = seriesDescIn?.value.trim();
        seriesEditBuffer.orderIndex = activeSeriesId ? currentSeries[activeSeriesId].orderIndex : Object.keys(currentSeries).length;
        try {
            if (activeSeriesId) await update(ref(db, `series/${activeSeriesId}`), seriesEditBuffer);
            else { const newRef = push(ref(db, 'series')); seriesEditBuffer.id = newRef.key; await set(newRef, seriesEditBuffer); }
            closeModal('modal-series-manager'); addLog(`تم حفظ المسلسل: ${title}`);
        } catch (e) { addLog("خطأ في حفظ المسلسل", true); }
    };
}

// --- XTREAM SERIES IMPORT ---
// --- XTREAM SERIES IMPORT (Smart Incremental) ---
window.startXxtreamSeriesImport = async (serverId) => {
    const s = currentSeriesSources[serverId] || currentMovieSources[serverId]; if (!s) return;
    activeXtServerId = serverId;
    xtSaveMode = "series";
    openModal('modal-series-xtream-import');
    if (seriesXtCatsList) seriesXtCatsList.innerHTML = '<p class="col-span-full text-center py-10 opacity-30 text-xs animate-pulse text-[#FFC107]">جاري جلب تصنيفات المسلسلات... 🍿</p>';
    try {
        const baseUrl = cleanBaseUrl(s.url || s.baseUrl);
        const url = `${baseUrl}/player_api.php?username=${s.username}&password=${s.password}&action=get_series_categories`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        const cats = await res.json();
        if (seriesXtCatsList) {
            seriesXtCatsList.innerHTML = '';
            cats.forEach(cat => {
                const label = document.createElement('label');
                label.className = "flex items-center space-x-3 space-x-reverse p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all";
                label.innerHTML = `<input type="checkbox" class="xt-series-cat-check w-4 h-4 accent-[#FFC107]" value="${cat.category_id}" data-name="${cat.category_name}"><span class="text-[10px] truncate text-white">${cat.category_name}</span>`;
                seriesXtCatsList.appendChild(label);
            });
        }
        if (btnStartSeriesImport) btnStartSeriesImport.onclick = () => executeXtreamSeriesImport(s);
    } catch (e) { if (seriesXtCatsList) seriesXtCatsList.innerHTML = '<p class="col-span-full text-center py-10 text-red-500 text-xs font-bold">فشل الاتصال بالسيرفر! ❌</p>'; }
};

async function executeXtreamSeriesImport(server) {
    if (!seriesXtCatsList) return;
    const selectedCats = Array.from(seriesXtCatsList.querySelectorAll('.xt-series-cat-check:checked')).map(el => ({ id: el.value, name: el.dataset.name }));
    if (selectedCats.length === 0) return showCustomAlert("يرجى اختيار تصنيف واحد على الأقل", "تنبيه");

    if (btnStartSeriesImport) btnStartSeriesImport.classList.add('hidden');
    if (seriesImportProgressCont) seriesImportProgressCont.classList.remove('hidden');

    try {
        updateSeriesImportStatus("جاري جلب قائمة المسلسلات...", 5);
        const url = `${server.baseUrl}/player_api.php?username=${server.username}&password=${server.password}&action=get_series`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        let allSeries = await res.json();
        if (!Array.isArray(allSeries)) allSeries = allSeries ? Object.values(allSeries) : [];

        const filtered = allSeries.filter(s => selectedCats.some(sc => sc.id === s.category_id));
        const total = filtered.length;
        updateSeriesImportStatus(`تم العثور على ${total} مسلسل. جاري المعالجة الذكية...`, 10);

        for (let i = 0; i < filtered.length; i++) {
            const s = filtered[i];
            const cleanTitle = VODSanitizer.sanitizeTitle(s.name);
            const targetCat = selectedCats.find(sc => sc.id === s.category_id);

            // 🧠 Smart Detection: Does this series already exist?
            const existingId = Object.keys(currentSeries).find(id => currentSeries[id].title === cleanTitle);
            const seriesId = existingId || `xt_ser_${s.series_id}`;

            updateSeriesImportStatus(`جاري جلب حلقات (${i+1}/${total}): ${cleanTitle}`, 10 + Math.floor((i / total) * 85));
            if (i > 0) await new Promise(r => setTimeout(r, 100)); // Non-blocking delay

            let seasons = existingId ? (currentSeries[existingId].seasons || {}) : {};
            try {
                const infoUrl = `${server.baseUrl}/player_api.php?username=${server.username}&password=${server.password}&action=get_series_info&series_id=${s.series_id}`;
                const infoRes = await fetch(`https://corsproxy.io/?${encodeURIComponent(infoUrl)}`);
                const info = await infoRes.json();

                if (info.episodes) {
                    Object.entries(info.episodes).forEach(([sNum, eps]) => {
                        if (!seasons[sNum]) seasons[sNum] = { id: `s_${sNum}`, name: `Season ${sNum}`, orderIndex: parseInt(sNum), episodes: {} };

                        eps.forEach((epData, idx) => {
                            const epId = epData.id || `ep_${sNum}_${idx}`;
                            if (!seasons[sNum].episodes[epId]) {
                                const container = epData.container_extension || 'mp4';
                                const streamUrl = `${server.baseUrl}/series/${server.username}/${server.password}/${epData.id}.${container}`;
                                seasons[sNum].episodes[epId] = {
                                    id: epId,
                                    title: epData.title || `الحلقة ${idx+1}`,
                                    orderIndex: idx,
                                    servers: [{ name: "سيرفر 1", url: streamUrl, orderIndex: 0 }]
                                };
                            }
                        });
                    });
                }
            } catch (epErr) { console.error(epErr); }

            const seriesData = {
                id: seriesId,
                title: cleanTitle,
                logoUrl: s.cover || s.stream_icon || "",
                year: s.releaseDate || "",
                rating: s.rating || "",
                categoryId: targetCat.name,
                seasons,
                orderIndex: existingId ? currentSeries[existingId].orderIndex : i,
                originSourceId: server.id
            };

            await set(ref(db, `series/${seriesId}`), seriesData);

            const catKey = `scat_${targetCat.id}`;
            if (!currentSeriesCategories[catKey]) {
                await set(ref(db, `series_categories/${catKey}`), { id: catKey, name: targetCat.name, orderIndex: 99 });
            }
        }

        updateSeriesImportStatus("تم تحديث المكتبة بنجاح! ✅", 100);
        setTimeout(() => {
            closeModal('modal-series-xtream-import');
            if (btnStartSeriesImport) btnStartSeriesImport.classList.remove('hidden');
            if (seriesImportProgressCont) seriesImportProgressCont.classList.add('hidden');
        }, 2000);
    } catch (e) {
        updateSeriesImportStatus("فشل التحديث! ❌", 0);
        if (btnStartSeriesImport) btnStartSeriesImport.classList.remove('hidden');
    }
}

function updateSeriesImportStatus(text, pct) {
    if (seriesImportStatus) seriesImportStatus.innerText = text;
    if (seriesImportBar) seriesImportBar.style.width = `${pct}%`;
    if (seriesImportPercent) seriesImportPercent.innerText = `${pct}%`;
}

if (btnAddSeriesXtServer) {
    btnAddSeriesXtServer.onclick = () => {
        activeXtServerId = null; if (xtNameIn) xtNameIn.value = ''; if (xtUrlIn) xtUrlIn.value = ''; if (xtUserIn) xtUserIn.value = ''; if (xtPassIn) xtPassIn.value = '';
        xtSaveMode = "series"; openModal('modal-xtream-server');
    };
}

window.editSeriesXtServer = (id) => { activeXtServerId = id; const s = currentSeriesSources[id]; if (xtNameIn) xtNameIn.value = s.name; if (xtUrlIn) xtUrlIn.value = s.baseUrl; if (xtUserIn) xtUserIn.value = s.username; if (xtPassIn) xtPassIn.value = s.password; xtSaveMode = "series"; openModal('modal-xtream-server'); };
window.deleteSeriesXtServer = async (id) => { if (await showCustomConfirm("حذف سيرفر المسلسلات؟", "حذف")) { await remove(ref(db, `series_sources/${id}`)); addLog("تم حذف سيرفر المسلسلات"); } };

// --- SERIES TOOLS BINDING ---
if (btnSeriesTools) btnSeriesTools.onclick = () => openModal('modal-series-actions');

const xtSerBtn = document.querySelector('#modal-series-actions [data-action="xtream-series"]');
if (xtSerBtn) {
    xtSerBtn.onclick = () => {
        closeModal('modal-series-actions');
        if (btnAddSeriesXtServer) btnAddSeriesXtServer.click();
    };
}

const m3uSerBtn = document.querySelector('#modal-series-actions [data-action="m3u-series"]');
if (m3uSerBtn) {
    m3uSerBtn.onclick = () => {
        closeModal('modal-series-actions');
        openModal('modal-series-m3u-import');
    };
}

const clnSerBtn = document.querySelector('#modal-series-actions [data-action="cleanup-series"]');
if (clnSerBtn) {
    clnSerBtn.onclick = async () => {
        closeModal('modal-series-actions');
        const confirmed = await showCustomConfirm("هل تريد تشغيل محرك التنظيف والدمج الذكي على جميع المسلسلات؟", "محرك تنظيف المسلسلات", "⚡");
        if (confirmed) await executeSmartSeriesCleanup();
    };
}

if (btnExecuteSeriesM3uImport) {
    btnExecuteSeriesM3uImport.onclick = async () => {
        const url = seriesM3uUrlInput?.value.trim();
        const file = seriesM3uFileInput?.files ? seriesM3uFileInput.files[0] : null;
        const targetCat = seriesM3uTargetCategoryIn?.value.trim() || "Imported Series";
        if (!url && !file) return showCustomAlert("يرجى إدخال رابط أو اختيار ملف", "تنبيه");
        btnExecuteSeriesM3uImport.innerText = "جاري المعالجة...";
        btnExecuteSeriesM3uImport.disabled = true;
        try {
            let content = "";
            if (file) content = await file.text();
            else { const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`); content = await res.text(); }
            let items = [];
            if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
                const data = JSON.parse(content);
                items = Array.isArray(data) ? data : Object.values(data);
            } else {
                const lines = content.split(/\r?\n/); let current = null;
                const logoRegex = /tvg-logo="([^"]*)"/; const groupRegex = /group-title="([^"]*)"/i;
                lines.forEach(line => {
                    const trimmed = line.trim(); if (!trimmed) return;
                    if (trimmed.startsWith("#EXTINF:")) {
                        const logo = trimmed.match(logoRegex)?.[1] || "";
                        const grp = trimmed.match(groupRegex)?.[1] || "";
                        const lastName = trimmed.split(",").pop().trim();
                        current = { title: lastName, logoUrl: logo, group: grp };
                    } else if (!trimmed.startsWith("#")) {
                        if (current) { current.url = trimmed; items.push(current); current = null; }
                    }
                });
            }
            if (items.length === 0) throw new Error("لم يتم العثور على بيانات");
            const updates = {}; const now = Date.now();
            items.forEach((m, i) => {
                const cleanTitle = VODSanitizer.sanitizeTitle(m.title || "Unnamed Series");
                const seriesId = `m3u_ser_${now}_${i}`;
                const epId = `ep_1`;
                const seasons = {
                    "1": {
                        id: "s_1", name: "Season 1", orderIndex: 1,
                        episodes: { [epId]: { id: epId, title: cleanTitle, orderIndex: 1, servers: [{ name: "سيرفر 1", url: m.url, orderIndex: 0 }] } }
                    }
                };
                updates[`series/${seriesId}`] = { id: seriesId, title: cleanTitle, logoUrl: m.logoUrl || "", categoryId: targetCat, seasons, orderIndex: i };
            });
            await update(ref(db), updates);
            addLog(`تم استيراد ${items.length} مسلسل (كحلقات منفردة) بنجاح!`);
            await showCustomAlert(`تم استيراد ${items.length} عنصر للمسلسلات.`, "نجاح", "✅");
            closeModal('modal-series-m3u-import');
        } catch (err) { addLog("فشل الاستيراد", true); await showCustomAlert("خطأ: " + err.message, "فشل", "❌"); }
        finally { btnExecuteSeriesM3uImport.innerText = "بدء الاستيراد 🚀"; btnExecuteSeriesM3uImport.disabled = false; }
    };
}

// --- 🏠 DASHBOARD ENGINE ---
function updateDashboardStats() {
    // 📡 Live Content Stats & Warnings
    let channelCount = 0;
    let brokenCount = 0;
    Object.values(currentNetworks).forEach(net => {
        const chs = Object.values(net.channels || {});
        channelCount += chs.length;
        chs.forEach(ch => {
            if (Object.values(ch.sources || {}).some(s => (s.failCount || 0) >= 3 && !s.isExcluded)) {
                brokenCount++;
            }
        });
    });

    if (dashTotalChannels) dashTotalChannels.innerText = channelCount;
    if (dashWarningCard) {
        if (brokenCount > 0) {
            dashWarningCard.classList.remove('hidden');
            dashWarningCard.classList.add('flex');
            if (dashBrokenMsg) dashBrokenMsg.innerText = `يوجد ${brokenCount} روابط لا تعمل، يرجى الصيانة فوراً.`;
        } else {
            dashWarningCard.classList.add('hidden');
            dashWarningCard.classList.remove('flex');
        }
    }

    // 🍿 VOD Stats
    if (dashTotalMovies) dashTotalMovies.innerText = Object.keys(currentMovies).length;
    if (dashTotalSeries) dashTotalSeries.innerText = Object.keys(currentSeries).length;
}

// 💓 Real-time User Pulse Sync
onValue(ref(db, 'users'), (snapshot) => {
    let total = 0, online = 0, offline = 0;
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    snapshot.forEach(userSnap => {
        const u = userSnap.val();
        if (!u.lastSeen) return;

        if (now - u.lastSeen < thirtyDays) {
            total++;
            if (u.isOnline) online++; else offline++;
        }
    });

    if (dashTotalUsers) dashTotalUsers.innerText = total;
    if (dashOnlineUsers) dashOnlineUsers.innerText = online;
    if (dashOfflineUsers) dashOfflineUsers.innerText = offline;
});

// --- MAINTENANCE LOGIC ---
let isScanning = false;

window.executeFusionMerge = async () => {
    const selectedIds = Array.from(document.querySelectorAll('.net-select-check:checked')).map(el => el.value);
    if (selectedIds.length < 2) return showCustomAlert("يرجى اختيار شبكتين على الأقل للدمج", "تنبيه");

    const targetName = await showCustomPrompt("اسم الشبكة الجديدة:", currentNetworks[selectedIds[0]].name);
    if (!targetName) return;

    const targetLogo = await showCustomPrompt("رابط شعار الشبكة (اختياري):", currentNetworks[selectedIds[0]].logoUrl);

    try {
        const updates = {};
        const combinedChannels = {};
        let maxOrder = 0;

        for (const netId of selectedIds) {
            const net = currentNetworks[netId];
            if (!net) continue;

            // Collect channels with unique keys
            if (net.channels) {
                Object.entries(net.channels).forEach(([chId, ch]) => {
                    combinedChannels[`${netId}_${chId}`] = ch;
                });
            }

            if (net.orderIndex > maxOrder) maxOrder = net.orderIndex;
            updates[`networks/${netId}`] = null;
        }

        const newRef = push(ref(db, 'networks'));
        updates[`networks/${newRef.key}`] = {
            id: newRef.key,
            name: targetName,
            abbr: targetName.substring(0, 2).toUpperCase(),
            logoUrl: targetLogo || "",
            orderIndex: maxOrder,
            channels: combinedChannels
        };

        await update(ref(db), updates);
        addLog(`تم الدمج الملكي لـ ${selectedIds.length} شبكات بنجاح!`);
        await showCustomAlert("اكتملت عملية الدمج الملكي بنجاح ✅", "نجاح");
    } catch (e) {
        console.error(e);
        addLog("فشل في دمج الشبكات", true);
    }
};

const btnStartFullScan = getEl('btn-start-full-scan');
const btnStartScanBroken = getEl('btn-start-scan-broken');
const btnDeleteAllBroken = getEl('btn-delete-all-broken');
const btnClearRecovered = getEl('btn-clear-recovered');
const maintenanceResultsList = getEl('maintenance-results-list');
const scanProgressArea = getEl('scan-progress-area');
const scanProgressBar = getEl('scan-progress-bar');
const scanStatusText = getEl('scan-status-text');
const scanPercentText = getEl('scan-percent-text');
const scanCountText = getEl('scan-count-text');

// Bulk Actions Bar elements
const maintenanceBulkBar = getEl('maintenance-bulk-bar');
const checkSelectAllMaintenance = getEl('check-select-all-maintenance');
const maintenanceSelectedCount = getEl('maintenance-selected-count');
const btnBulkRecoverMaintenance = getEl('btn-bulk-recover-maintenance');
const btnBulkDeleteMaintenance = getEl('btn-bulk-delete-maintenance');

function updateMaintenanceDashboard() {
    let working = 0, brokenCount = 0, recoveredCount = 0, excluded = 0;
    maintenanceDisplayList = [];

    Object.entries(currentNetworks).forEach(([netId, net]) => {
        Object.entries(net.channels || {}).forEach(([chId, ch]) => {
            Object.entries(ch.sources || {}).forEach(([sKey, s]) => {
                const info = { netId, chId, sKey, ch, s };
                if (s.isExcluded) {
                    excluded++;
                } else if (s.wasRecovered) {
                    recoveredCount++;
                    maintenanceDisplayList.push({ type: 'recovered', ...info });
                } else if ((s.failCount || 0) >= 3) {
                    brokenCount++;
                    maintenanceDisplayList.push({ type: 'broken', ...info });
                } else {
                    working++;
                }
            });
        });
    });

    if (getEl('stat-working-links')) getEl('stat-working-links').innerText = working;
    if (getEl('stat-broken-links')) getEl('stat-broken-links').innerText = brokenCount;
    if (getEl('stat-recovered-links')) getEl('stat-recovered-links').innerText = recoveredCount;
    if (getEl('stat-excluded-links')) getEl('stat-excluded-links').innerText = excluded;

    if (btnDeleteAllBroken) btnDeleteAllBroken.classList.toggle('hidden', brokenCount === 0);
    if (btnClearRecovered) btnClearRecovered.classList.toggle('hidden', recoveredCount === 0);

    // Toggle Bulk Bar
    if (maintenanceBulkBar) {
        maintenanceBulkBar.classList.toggle('hidden', maintenanceDisplayList.length === 0);
    }
    updateMaintenanceSelectionUI();
    renderMaintenanceResults();
}

function updateMaintenanceSelectionUI() {
    if (maintenanceSelectedCount) {
        maintenanceSelectedCount.innerText = `${selectedMaintenanceKeys.size} محدد`;
    }
    if (checkSelectAllMaintenance) {
        const allKeys = maintenanceDisplayList.map(it => `${it.netId}_${it.chId}_${it.sKey}`);
        checkSelectAllMaintenance.checked = allKeys.length > 0 && allKeys.every(k => selectedMaintenanceKeys.has(k));
    }
}

if (checkSelectAllMaintenance) {
    checkSelectAllMaintenance.onchange = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            maintenanceDisplayList.forEach(it => selectedMaintenanceKeys.add(`${it.netId}_${it.chId}_${it.sKey}`));
        } else {
            selectedMaintenanceKeys.clear();
        }
        updateMaintenanceSelectionUI();
        renderMaintenanceResults();
    };
}

function renderMaintenanceResults() {
    if (!maintenanceResultsList) return;
    if (maintenanceDisplayList.length === 0) {
        maintenanceResultsList.innerHTML = '<p class="text-center py-20 text-gray-600 italic text-sm">لا توجد تنبيهات حالياً. جميع الروابط تبدو سليمة.</p>';
        return;
    }

    maintenanceResultsList.innerHTML = '';
    maintenanceDisplayList.forEach(item => {
        const div = document.createElement('div');
        const isBroken = item.type === 'broken';
        const key = `${item.netId}_${item.chId}_${item.sKey}`;
        const isSelected = selectedMaintenanceKeys.has(key);

        div.className = `glass p-4 rounded-3xl border ${isBroken ? 'border-red-500/20 bg-red-500/5' : 'border-yellow-500/20 bg-yellow-500/5'} flex items-center justify-between transition-all mb-3 text-right ${isSelected ? 'ring-2 ring-[#FFC107]/50' : ''}`;

        let subText = "";
        if (isBroken) {
            const days = item.s.firstFailedAt ? Math.floor((Date.now() - item.s.firstFailedAt) / (1000 * 60 * 60 * 24)) : 0;
            subText = `<span class="text-red-500 font-bold text-[10px]">⚠️ فشل: ${item.s.failCount} مرات | متوقف منذ: ${days} أيام</span>`;
        } else {
            subText = `<span class="text-yellow-500 font-bold text-[10px]">✨ عاد للعمل مجدداً! (تم إصلاحه تلقائياً)</span>`;
        }

        div.innerHTML = `
            <div class="flex items-center space-x-4 space-x-reverse">
                <input type="checkbox" class="maintenance-check w-4 h-4 accent-[#FFC107]" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); window.toggleMaintenanceSelection('${key}')">
                <div class="w-12 h-12 rounded-2xl bg-black/40 p-1 flex-none overflow-hidden cursor-pointer" onclick="window.toggleMaintenanceSelection('${key}')">
                    <img src="${item.ch.logoUrl}" class="w-full h-full object-contain" onerror="this.src='https://via.placeholder.com/50'">
                </div>
                <div class="cursor-pointer" onclick="window.toggleMaintenanceSelection('${key}')">
                    <h4 class="text-sm font-bold text-white">${item.ch.name}</h4>
                    <p class="text-[10px] text-gray-500 mb-1">سيرفر: ${item.s.name || item.s.label || 'Default'}</p>
                    ${subText}
                </div>
            </div>
            <div class="flex items-center space-x-2 space-x-reverse">
                <button onclick="window.deleteSourceFromMaintenance('${item.netId}', '${item.chId}', '${item.sKey}')" class="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                <button onclick="window.maintenanceAction('${item.type}', '${item.netId}', '${item.chId}', '${item.sKey}')" class="p-3 bg-white/5 text-gray-400 rounded-2xl hover:bg-[#FFC107] hover:text-black transition-all text-[10px]">${isBroken ? '📌 استبعاد' : '✕ إزالة'}</button>
            </div>
        `;
        maintenanceResultsList.appendChild(div);
    });
}

window.toggleMaintenanceSelection = (key) => {
    if (selectedMaintenanceKeys.has(key)) selectedMaintenanceKeys.delete(key);
    else selectedMaintenanceKeys.add(key);
    updateMaintenanceSelectionUI();
    renderMaintenanceResults();
};

window.deleteSourceFromMaintenance = async (netId, chId, sKey) => {
    if (await showCustomConfirm("حذف هذا السيرفر نهائياً؟", "حذف")) {
        try {
            await remove(ref(db, `networks/${netId}/channels/${chId}/sources/${sKey}`));
            selectedMaintenanceKeys.delete(`${netId}_${chId}_${sKey}`);
            updateMaintenanceDashboard();
        } catch (e) { addLog("فشل الحذف", true); }
    }
};

window.maintenanceAction = async (type, netId, chId, sKey) => {
    const path = `networks/${netId}/channels/${chId}/sources/${sKey}`;
    if (type === 'broken') {
        await update(ref(db, path), { isExcluded: true });
    } else {
        await update(ref(db, path), { wasRecovered: false });
    }
    updateMaintenanceDashboard();
};

if (btnStartFullScan) {
    btnStartFullScan.onclick = () => executeMaintenanceScan(false);
}

if (btnStartScanBroken) {
    btnStartScanBroken.onclick = () => executeMaintenanceScan(true);
}

async function executeMaintenanceScan(brokenOnly) {
    if (isScanning) return;
    isScanning = true;
    if (btnStartFullScan) btnStartFullScan.disabled = true;
    if (btnStartScanBroken) btnStartScanBroken.disabled = true;

    if (scanProgressArea) scanProgressArea.classList.remove('hidden');

    const allSources = [];
    Object.entries(currentNetworks).forEach(([netId, net]) => {
        Object.entries(net.channels || {}).forEach(([chId, ch]) => {
            Object.entries(ch.sources || {}).forEach(([sKey, s]) => {
                if (!s.isExcluded) {
                    if (!brokenOnly || (s.failCount || 0) >= 3) {
                        allSources.push({ netId, chId, sKey, s });
                    }
                }
            });
        });
    });

    const total = allSources.length;
    if (total === 0) {
        isScanning = false;
        if (btnStartFullScan) btnStartFullScan.disabled = false;
        if (btnStartScanBroken) btnStartScanBroken.disabled = false;
        if (scanProgressArea) scanProgressArea.classList.add('hidden');
        return showCustomAlert("لا توجد روابط معطلة لفحصها.", "تنبيه");
    }

    for (let i = 0; i < total; i++) {
        const item = allSources[i];
        const pct = Math.round(((i + 1) / total) * 100);
        if (scanProgressBar) scanProgressBar.style.width = `${pct}%`;
        if (scanPercentText) scanPercentText.innerText = `${pct}%`;
        if (scanCountText) scanCountText.innerText = `${i + 1} / ${total} مصدر`;
        if (scanStatusText) scanStatusText.innerText = `فحص: ${item.s.name || 'سيرفر'}...`;

        try {
            const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(item.s.url)}`, { method: 'HEAD' });
            await updateSourceStatus(item, res.ok);
        } catch (e) {
            await updateSourceStatus(item, false);
        }
        await new Promise(r => setTimeout(r, 50));
    }

    isScanning = false;
    if (btnStartFullScan) btnStartFullScan.disabled = false;
    if (btnStartScanBroken) btnStartScanBroken.disabled = false;
    btnStartFullScan.innerText = "بدء فحص شامل للروابط ⚡";
    setTimeout(() => { if (scanProgressArea) scanProgressArea.classList.add('hidden'); }, 3000);
    await showCustomAlert("اكتمل الفحص بنجاح ✅", "نجاح");
}

async function updateSourceStatus(item, success) {
    const path = `networks/${item.netId}/channels/${item.chId}/sources/${item.sKey}`;
    const updates = {};
    if (success) {
        const hadFailed = (item.s.failCount || 0) >= 3;
        updates[`${path}/failCount`] = 0;
        updates[`${path}/firstFailedAt`] = 0;
        if (hadFailed) updates[`${path}/wasRecovered`] = true;
    } else {
        const newCount = (item.s.failCount || 0) + 1;
        updates[`${path}/failCount`] = newCount;
        if (!item.s.firstFailedAt) updates[`${path}/firstFailedAt`] = Date.now();
        updates[`${path}/wasRecovered`] = false;
    }
    await update(ref(db), updates);
}

if (btnDeleteAllBroken) {
    btnDeleteAllBroken.onclick = async () => {
        const confirmed = await showCustomConfirm("حذف كافة السيرفرات التي فشلت 3 مرات أو أكثر؟", "تنظيف شامل", "🗑️");
        if (!confirmed) return;
        const updates = {};
        Object.entries(currentNetworks).forEach(([netId, net]) => {
            Object.entries(net.channels || {}).forEach(([chId, ch]) => {
                Object.entries(ch.sources || {}).forEach(([sKey, s]) => {
                    if ((s.failCount || 0) >= 3 && !s.isExcluded) updates[`networks/${netId}/channels/${chId}/sources/${sKey}`] = null;
                });
            });
        });
        if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
            addLog("تم حذف كافة الروابط المعطلة.");
            updateMaintenanceDashboard();
        }
    };
}

if (btnClearRecovered) {
    btnClearRecovered.onclick = async () => {
        const updates = {};
        Object.entries(currentNetworks).forEach(([netId, net]) => {
            Object.entries(net.channels || {}).forEach(([chId, ch]) => {
                Object.entries(ch.sources || {}).forEach(([sKey, s]) => {
                    if (s.wasRecovered) updates[`networks/${netId}/channels/${chId}/sources/${sKey}/wasRecovered`] = false;
                });
            });
        });
        if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
            addLog("تم تنظيف قائمة المستعادة.");
            updateMaintenanceDashboard();
        }
    };
}

// Bulk Maintenance Actions
if (btnBulkDeleteMaintenance) {
    btnBulkDeleteMaintenance.onclick = async () => {
        if (selectedMaintenanceKeys.size === 0) return;
        const confirmed = await showCustomConfirm(`حذف ${selectedMaintenanceKeys.size} سيرفرات مختارة؟`, "حذف مجمع", "🗑️");
        if (!confirmed) return;
        const updates = {};
        selectedMaintenanceKeys.forEach(key => {
            const [nId, cId, sK] = key.split('_');
            updates[`networks/${nId}/channels/${cId}/sources/${sK}`] = null;
        });
        try {
            await update(ref(db), updates);
            selectedMaintenanceKeys.clear();
            addLog("تم حذف العناصر المختارة بنجاح.");
            updateMaintenanceDashboard();
        } catch (e) {}
    };
}

if (btnBulkRecoverMaintenance) {
    btnBulkRecoverMaintenance.onclick = async () => {
        if (selectedMaintenanceKeys.size === 0) return;
        const updates = {};
        selectedMaintenanceKeys.forEach(key => {
            const [nId, cId, sK] = key.split('_');
            const path = `networks/${nId}/channels/${cId}/sources/${sK}`;
            updates[`${path}/failCount`] = 0;
            updates[`${path}/firstFailedAt`] = 0;
            updates[`${path}/wasRecovered`] = false;
        });
        try {
            await update(ref(db), updates);
            selectedMaintenanceKeys.clear();
            addLog("تمت استعادة العناصر المختارة.");
            updateMaintenanceDashboard();
        } catch (e) {}
    };
}

// --- SETTINGS LOGIC ---
const btnSaveConfig = getEl('btn-save-config');

async function loadAppConfig() {
    try {
        const snap = await get(ref(db, 'app_config'));
        const cfg = snap.val() || {};

        if (getEl('cfg-admin-pin')) getEl('cfg-admin-pin').value = cfg.adminPin || "1234";
        if (getEl('cfg-matches-url')) getEl('cfg-matches-url').value = cfg.matchesUrl || "";

        // Section Configs
        const sections = ['live', 'movies', 'series', 'matches'];
        sections.forEach(s => {
            const data = cfg[`${s}Config`] || {};
            const elStatus = getEl(`cfg-${s}-status`);
            const elMsg = getEl(`cfg-${s}-msg`);

            if (elStatus) {
                // 🛠️ FIX: Ensure value exists in options and handle empty data
                const status = data.status || "ACTIVE";
                elStatus.value = status.toUpperCase();
            }
            if (elMsg) {
                elMsg.value = data.maintenanceMessage || "";
            }
        });

        // Global Notice
        if (getEl('cfg-global-notice')) getEl('cfg-global-notice').value = cfg.globalNotice || "";

        // Updates
        const apps = ['user', 'admin'];
        apps.forEach(a => {
            const data = cfg[`${a}AppUpdate`] || {};
            if (getEl(`cfg-${a}-vcode`)) getEl(`cfg-${a}-vcode`).value = data.versionCode || 0;
            if (getEl(`cfg-${a}-vname`)) getEl(`cfg-${a}-vname`).value = data.versionName || "1.0";
            if (getEl(`cfg-${a}-url`)) getEl(`cfg-${a}-url`).value = data.updateUrl || "";
            if (getEl(`cfg-${a}-force`)) getEl(`cfg-${a}-force`).checked = !!data.forceUpdate;
            if (getEl(`cfg-${a}-changelog`)) getEl(`cfg-${a}-changelog`).value = data.changelog || "";
        });

        addLog("تم تحميل إعدادات التطبيق بنجاح.");
    } catch (e) {
        addLog("فشل في تحميل الإعدادات", true);
    }
}

if (btnSaveConfig) {
    btnSaveConfig.onclick = async () => {
        const updates = {
            adminPin: getEl('cfg-admin-pin')?.value.trim() || "1234",
            matchesUrl: getEl('cfg-matches-url')?.value.trim() || "",
            liveConfig: {
                status: getEl('cfg-live-status')?.value,
                maintenanceMessage: getEl('cfg-live-msg')?.value.trim()
            },
            moviesConfig: {
                status: getEl('cfg-movies-status')?.value,
                maintenanceMessage: getEl('cfg-movies-msg')?.value.trim()
            },
            seriesConfig: {
                status: getEl('cfg-series-status')?.value,
                maintenanceMessage: getEl('cfg-series-msg')?.value.trim()
            },
            matchesConfig: {
                status: getEl('cfg-matches-status')?.value,
                maintenanceMessage: getEl('cfg-matches-msg')?.value.trim()
            },
            userAppUpdate: {
                versionCode: parseInt(getEl('cfg-user-vcode')?.value) || 0,
                versionName: getEl('cfg-user-vname')?.value.trim(),
                updateUrl: getEl('cfg-user-url')?.value.trim(),
                forceUpdate: getEl('cfg-user-force')?.checked,
                changelog: getEl('cfg-user-changelog')?.value.trim()
            },
            adminAppUpdate: {
                versionCode: parseInt(getEl('cfg-admin-vcode')?.value) || 0,
                versionName: getEl('cfg-admin-vname')?.value.trim(),
                updateUrl: getEl('cfg-admin-url')?.value.trim(),
                forceUpdate: getEl('cfg-admin-force')?.checked,
                changelog: getEl('cfg-admin-changelog')?.value.trim()
            },
            globalNotice: getEl('cfg-global-notice')?.value.trim() || ""
        };

        try {
            await update(ref(db, 'app_config'), updates);
            addLog("تم حفظ كافة الإعدادات بنجاح ✅");
            await showCustomAlert("تم الحفظ بنجاح!", "نجاح", "✅");
        } catch (e) {
            addLog("فشل حفظ الإعدادات", true);
            await showCustomAlert("فشل الحفظ. تحقق من الاتصال.", "خطأ", "❌");
        }
    };
}

// --- UPDATES LOGIC ---
const btnSaveUpdates = getEl('btn-save-updates');
const btnSendPush = getEl('btn-send-push');
const inputPushTitle = getEl('push-title');
const inputPushMessage = getEl('push-message');
const inputPushKey = getEl('push-server-key');

if (btnSendPush) {
    btnSendPush.onclick = async () => {
        const title = inputPushTitle?.value.trim();
        const msg = inputPushMessage?.value.trim();
        const key = inputPushKey?.value.trim();

        if (!title || !msg || !key) {
            return showCustomAlert("يرجى إكمال كافة الحقول (العنوان، الرسالة، ومفتاح FCM).", "تنبيه");
        }

        const confirmSend = await showCustomConfirm(`هل أنت متأكد من إرسال هذا الإشعار لكافة مستخدمي التطبيق؟`, "تأكيد الإرسال 🚀");
        if (!confirmSend) return;

        btnSendPush.disabled = true;
        btnSendPush.innerText = "جاري الإرسال... 📡";

        try {
            const response = await fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `key=${key}`
                },
                body: JSON.stringify({
                    to: "/topics/all",
                    notification: {
                        title: title,
                        body: msg,
                        sound: "default",
                        click_action: "FLUTTER_NOTIFICATION_CLICK"
                    },
                    priority: "high"
                })
            });

            if (response.ok) {
                addLog(`تم إرسال إشعار عام بنجاح: ${title} ✅`);
                await showCustomAlert("تم إرسال الإشعار لجميع المشتركين بنجاح! 🚀", "نجاح");
                if (inputPushTitle) inputPushTitle.value = '';
                if (inputPushMessage) inputPushMessage.value = '';
            } else {
                const errorData = await response.text();
                addLog(`فشل إرسال الإشعار: ${errorData}`, true);
                await showCustomAlert(`فشل الإرسال. تحقق من صحة مفتاح الخادم (FCM Key).`, "خطأ ❌");
            }
        } catch (e) {
            addLog(`خطأ اتصال أثناء إرسال الإشعار`, true);
            await showCustomAlert("حدث خطأ في الاتصال بخوادم Google FCM.", "خطأ اتصال");
        } finally {
            btnSendPush.disabled = false;
            btnSendPush.innerText = "إرسال الآن 🚀";
        }
    };
}

const inputUserApk = getEl('upd-user-apk-file');
const inputAdminApk = getEl('upd-admin-apk-file');

async function handleApkUpload(file, type) {
    if (!file) return;
    const progressCont = getEl(`upd-${type}-progress-container`);
    const progressBar = getEl(`upd-${type}-progress-bar`);
    const progressPercent = getEl(`upd-${type}-progress-percent`);
    const urlInput = getEl(`upd-${type}-url`);

    if (progressCont) progressCont.classList.remove('hidden');

    const fileName = `updates/alnasrawy_${type}_v${Date.now()}.apk`;
    const sRef = storageRef(storage, fileName);
    const uploadTask = uploadBytesResumable(sRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressPercent) progressPercent.innerText = Math.round(progress) + '%';
        },
        (error) => {
            addLog(`فشل رفع APK: ${error.message}`, true);
            showCustomAlert("فشل الرفع: " + error.message, "خطأ", "❌");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if (urlInput) urlInput.value = downloadURL;
                addLog(`تم رفع ملف ${type} APK بنجاح ✅`);
                if (progressCont) setTimeout(() => progressCont.classList.add('hidden'), 2000);
            });
        }
    );
}

if (inputUserApk) inputUserApk.onchange = (e) => handleApkUpload(e.target.files[0], 'user');
if (inputAdminApk) inputAdminApk.onchange = (e) => handleApkUpload(e.target.files[0], 'admin');

async function loadUpdateConfig() {
    try {
        const snap = await get(ref(db, 'app_config'));
        const cfg = snap.val() || {};

        // User App
        const user = cfg.userAppUpdate || {};
        if (getEl('upd-user-code')) getEl('upd-user-code').value = user.versionCode || 0;
        if (getEl('upd-user-name')) getEl('upd-user-name').value = user.versionName || "1.0";
        if (getEl('upd-user-url')) getEl('upd-user-url').value = user.updateUrl || "";
        if (getEl('upd-user-force')) getEl('upd-user-force').checked = !!user.forceUpdate;
        if (getEl('upd-user-logs')) getEl('upd-user-logs').value = user.changelog || "";

        // Admin App
        const admin = cfg.adminAppUpdate || {};
        if (getEl('upd-admin-code')) getEl('upd-admin-code').value = admin.versionCode || 0;
        if (getEl('upd-admin-name')) getEl('upd-admin-name').value = admin.versionName || "1.0";
        if (getEl('upd-admin-url')) getEl('upd-admin-url').value = admin.updateUrl || "";
        if (getEl('upd-admin-force')) getEl('upd-admin-force').checked = !!admin.forceUpdate;
        if (getEl('upd-admin-logs')) getEl('upd-admin-logs').value = admin.changelog || "";

        // Global Notice
        if (getEl('cfg-global-notice')) getEl('cfg-global-notice').value = cfg.globalNotice || "";

        addLog("تم تحميل بيانات التحديثات بنجاح.");
    } catch (e) {
        addLog("فشل تحميل بيانات التحديثات", true);
    }
}

if (btnSaveUpdates) {
    btnSaveUpdates.onclick = async () => {
        const confirmed = await showCustomConfirm("هل أنت متأكد من نشر هذه التحديثات لجميع المستخدمين؟", "نشر تحديث", "🚀");
        if (!confirmed) return;

        try {
            const updates = {
                userAppUpdate: {
                    versionCode: parseInt(getEl('upd-user-code')?.value) || 0,
                    versionName: getEl('upd-user-name')?.value.trim(),
                    updateUrl: getEl('upd-user-url')?.value.trim(),
                    forceUpdate: getEl('upd-user-force')?.checked,
                    changelog: getEl('upd-user-logs')?.value.trim()
                },
                adminAppUpdate: {
                    versionCode: parseInt(getEl('upd-admin-code')?.value) || 0,
                    versionName: getEl('upd-admin-name')?.value.trim(),
                    updateUrl: getEl('upd-admin-url')?.value.trim(),
                    forceUpdate: getEl('upd-admin-force')?.checked,
                    changelog: getEl('upd-admin-logs')?.value.trim()
                },
                globalNotice: getEl('cfg-global-notice')?.value.trim() || ""
            };

            await update(ref(db, 'app_config'), updates);
            addLog("تم نشر التحديثات والإشعارات بنجاح ✅");
            await showCustomAlert("تم النشر بنجاح! سيتم إخطار المستخدمين عند فتح التطبيق.", "نجاح", "✅");
        } catch (e) {
            addLog("فشل نشر التحديثات", true);
        }
    };
}

// --- UNIVERSAL SELECT ALL TOGGLE HANDLER ---
document.addEventListener('click', (e) => {
    const selectAllIds = ['btn-select-all-movie-xt-cats', 'btn-select-all-series-xt-cats', 'btn-global-select-all'];
    if (e.target && selectAllIds.includes(e.target.id)) {
        const modal = e.target.closest('.fixed');
        if (!modal) return;
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length === 0) return;
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        e.target.innerText = !allChecked ? "إلغاء تحديد الكل ✕" : "تحديد الكل ⚡";
        e.target.classList.toggle('bg-red-500/10', !allChecked);
        e.target.classList.toggle('text-red-500', !allChecked);
        e.target.classList.toggle('text-[#FFC107]', allChecked);
        e.target.classList.toggle('bg-[#FFC107]/10', allChecked);
    }
});

async function executeSmartSeriesCleanup() {
    addLog("بدء تنظيف ودمج المسلسلات...");
    const updates = {};
    const grouped = {};
    let mergedCount = 0;

    Object.entries(currentSeries).forEach(([id, s]) => {
        const cleanTitle = VODSanitizer.sanitizeTitle(s.title);
        const key = cleanTitle.toLowerCase().trim();
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({ id, ...s, cleanTitle });
    });

    Object.entries(grouped).forEach(([key, list]) => {
        if (list.length > 1) {
            const master = JSON.parse(JSON.stringify(list[0]));
            master.title = list[0].cleanTitle;
            if (!master.seasons) master.seasons = {};

            list.forEach((s, idx) => {
                if (idx === 0) return;
                if (s.seasons) {
                    Object.entries(s.seasons).forEach(([sNum, season]) => {
                        if (!master.seasons[sNum]) {
                            master.seasons[sNum] = season;
                        } else {
                            if (season.episodes) {
                                if (!master.seasons[sNum].episodes) master.seasons[sNum].episodes = {};
                                Object.entries(season.episodes).forEach(([epId, ep]) => {
                                    if (!master.seasons[sNum].episodes[epId]) {
                                        master.seasons[sNum].episodes[epId] = ep;
                                    } else {
                                        const masterEp = master.seasons[sNum].episodes[epId];
                                        if (!masterEp.servers) masterEp.servers = [];
                                        const currentUrls = new Set(masterEp.servers.map(srv => srv.url));
                                        (ep.servers || []).forEach(srv => {
                                            if (!currentUrls.has(srv.url)) {
                                                masterEp.servers.push({ ...srv, orderIndex: masterEp.servers.length });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
                updates[`series/${s.id}`] = null;
                mergedCount++;
            });
            updates[`series/${master.id}`] = master;
        }
    });

    if (Object.keys(updates).length > 0) {
        try {
            await update(ref(db), updates);
            addLog(`تم دمج ${mergedCount} مسلسلات مكررة بنجاح ✅`);
            await showCustomAlert(`تم دمج ${mergedCount} مسلسلات مكررة.`, "نجاح");
        } catch (e) { addLog("فشل في دمج المسلسلات", true); }
    } else {
        await showCustomAlert("مكتبة المسلسلات نظيفة تماماً.", "تنظيف المسلسلات", "✨");
    }
}

/**
 * 🚀 Advanced Batch Update: Web implementation
 * Replaces old domain with new one across all channels and sources.
 */
window.batchReplaceDomain = async (oldDomain, newDomain) => {
    if (!oldDomain || !newDomain) return;
    addLog(`بدء استبدال النطاق: ${oldDomain} -> ${newDomain}...`);

    try {
        const snapshot = await get(ref(db, 'networks'));
        const data = snapshot.val();
        if (!data) return;

        const updates = {};
        let count = 0;

        Object.entries(data).forEach(([netId, net]) => {
            if (net.channels) {
                Object.entries(net.channels).forEach(([chId, ch]) => {
                    if (ch.sources) {
                        Object.entries(ch.sources).forEach(([sKey, s]) => {
                            if (s.url && s.url.includes(oldDomain)) {
                                const newUrl = s.url.replace(oldDomain, newDomain);
                                updates[`networks/${netId}/channels/${chId}/sources/${sKey}/url`] = newUrl;
                                count++;
                            }
                        });
                    }
                });
            }
        });

        if (count > 0) {
            await update(ref(db), updates);
            addLog(`تم تحديث ${count} رابط بنجاح ✅`);
            await showCustomAlert(`تم تحديث ${count} رابط بنجاح!`, "تحديث مجمع");
        } else {
            addLog("لم يتم العثور على روابط تحتوي على هذا النطاق.");
            await showCustomAlert("لم يتم العثور على روابط مطابقة.", "تنبيه");
        }
    } catch (e) {
        addLog("فشل التحديث المجمع", true);
    }
};

/**
 * 🚀 DIRECT FCM: Sends a notification using the Legacy API.
 * Note: Requires FCM Server Key. Keep this key safe as it's for admin use only.
 */
window.sendGlobalNotification = async (title, message, serverKey) => {
    if (!title || !message || !serverKey) {
        addLog("يرجى إدخال العنوان، الرسالة، ومفتاح السيرفر", true);
        return;
    }

    addLog(`جاري إرسال إشعار مباشر: ${title}...`);

    try {
        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `key=${serverKey}`
            },
            body: JSON.stringify({
                to: "/topics/all",
                notification: {
                    title: title,
                    body: message,
                    sound: "default",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Standard trigger
                },
                priority: "high"
            })
        });

        if (response.ok) {
            addLog("تم إرسال الإشعار بنجاح ✅");
            await showCustomAlert("تم إرسال الإشعار لجميع المستخدمين!", "نجاح");
        } else {
            const err = await response.text();
            addLog(`فشل الإرسال: ${err}`, true);
            await showCustomAlert("فشل الإرسال. تحقق من مفتاح الخادم (Server Key).", "خطأ");
        }
    } catch (e) {
        addLog("خطأ في الاتصال بخوادم FCM", true);
    }
};
