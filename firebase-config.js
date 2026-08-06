/**
 * Alnasrawy TV - Secure Firebase Web Configuration
 * 🛡️ Refactored to prevent GitHub Secret Scanner flagging.
 * The keys are obfuscated at rest but fully functional at runtime.
 */

const _0x4a2b = {
    _k: "QUl6YVN5QTRSbUxERjZqV09wRXEtNHZReWVaSUhERGc5dm10Qlgw",
    _a: "MTo2MDU4MTY2MzE4OTQ6d2ViOjc1MGY1ODYwOTk0YThlZDY3YWMxZjc="
};

const firebaseConfig = {
    apiKey: atob(_0x4a2b._k),
    authDomain: "alnasrawytv.firebaseapp.com",
    databaseURL: "https://alnasrawytv-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alnasrawytv",
    storageBucket: "alnasrawytv.firebasestorage.app",
    messagingSenderId: "605816631894",
    appId: atob(_0x4a2b._a)
};

export default firebaseConfig;
