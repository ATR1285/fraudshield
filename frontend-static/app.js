const API_BASE = 'http://127.0.0.1:8000';

let transactions = [];
let riskScores = [];
let chart;

// COUNTRY HELPERS
const COUNTRY_NAMES = {
    "US": "United States",
    "IN": "India",
    "GB": "United Kingdom",
    "DE": "Germany",
    "BR": "Brazil",
    "NG": "Nigeria",
    "CA": "Canada",
    "FR": "France",
    "AU": "Australia",
    "JP": "Japan",
    "CN": "China",
    "SG": "Singapore",
    "AE": "UAE"
};

const COUNTRY_FLAGS = {
    "US": "🇺🇸", "IN": "🇮🇳", "GB": "🇬🇧",
    "DE": "🇩🇪", "BR": "🇧🇷", "NG": "🇳🇬",
    "CA": "🇨🇦", "FR": "🇫🇷", "AU": "🇦🇺",
    "JP": "🇯🇵", "CN": "🇨🇳", "SG": "🇸🇬", "AE": "🇦🇪"
};

const countryName = c => COUNTRY_NAMES[c] || "Unknown";
const countryFlag = c => COUNTRY_FLAGS[c] || "🌍";

document.addEventListener("DOMContentLoaded", () => {
    initChart();
    initThemeToggle();
    startPolling();
});

/* THEME ---------------------------------------------------- */

function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        btn.textContent = "☀️";
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const dark = document.body.classList.contains("dark");
        btn.textContent = dark ? "☀️" : "🌙";
        localStorage.setItem("theme", dark ? "dark" : "light");
    });
}

/* CHART ---------------------------------------------------- */

function initChart() {
    const ctx = document.getElementById("risk-chart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: { labels: [], datasets: [{
            label: "Risk Score",
            data: [],
            borderColor: "#0ea5e9",
            backgroundColor: "rgba(14,165,233,0.2)",
            fill: true,
            tension: 0.3
        }]},
        options: { responsive: true, scales: { y: { max: 100, beginAtZero: true }}}
    });
}

/* FETCH LATEST -------------------------------------------- */

async function fetchLatest() {
    try {
        const res = await fetch(`${API_BASE}/get-latest`);
        const data = await res.json();

        if (!data?.transaction) return;
        const txn = data.transaction;

        if (!transactions.find(t => t.transaction_id === txn.transaction_id)) {
            transactions.unshift(txn);
            if (transactions.length > 100) transactions.pop();

            riskScores.unshift(txn.risk_score);
            if (riskScores.length > 50) riskScores.pop();

            updateUI(txn);
            updateRealtimeAnalysis(txn);
            updateRiskAlerts(txn);

            if (txn.risk_score >= 70) playBeep();
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

/* REAL-TIME ANALYSIS -------------------------------------- */

function updateRealtimeAnalysis(txn) {
    const box = document.getElementById("realtime-analysis");

    let riskLevel =
        txn.risk_score >= 85 ? "🚨 Critical Fraud Risk" :
        txn.risk_score >= 70 ? "⚠️ High Risk" :
        txn.risk_score >= 50 ? "🟡 Moderate" :
        "🟢 Low Risk";

    let summary = `
        <p class="dark:text-gray-300"><b>Risk Level:</b> ${riskLevel}</p>
        <p class="dark:text-gray-300"><b>Amount:</b> $${txn.amount}</p>
        <p class="dark:text-gray-300"><b>Country:</b> ${countryFlag(txn.country)} ${countryName(txn.country)}</p>
        <p class="dark:text-gray-300"><b>Explanation:</b> ${txn.explanation}</p>
    `;

    box.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">🔍 Real-Time Analysis</h3>
        ${summary}
    `;
}

/* RISK ALERTS (NEW) --------------------------------------- */

function updateRiskAlerts(txn) {
    const box = document.getElementById("risk-alerts");
    let alerts = [];

    if (txn.risk_score >= 85) alerts.push("🚨 CRITICAL FRAUD RISK");
    if (txn.risk_score >= 70) alerts.push("⚠️ High Fraud Probability");
    if (txn.amount > 1000) alerts.push("💰 High-Value Transaction");
    if (["NG", "BR", "CN"].includes(txn.country)) alerts.push("🌍 High-Risk Country");
    if (txn.explanation.toLowerCase().includes("velocity")) alerts.push("🔁 Velocity Spike Detected");

    if (alerts.length === 0) {
        box.innerHTML = `<p class="text-gray-600 dark:text-gray-300">No alerts...</p>`;
        return;
    }

    box.innerHTML = alerts.map(msg => `
        <p class="p-2 my-1 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
            ${msg}
        </p>
    `).join("");
}

/* UI UPDATE ----------------------------------------------- */

function updateUI(txn) {
    const card = document.getElementById("transaction-card");

    const riskColor =
        txn.risk_score >= 70 ? "text-red-500" :
        txn.risk_score >= 50 ? "text-yellow-500" :
        "text-green-500";

    card.innerHTML = `
        <div class="flex justify-between mb-4">
            <div class="flex items-center space-x-3">
                <span class="text-lg font-bold">${txn.merchant}</span>
                <span>${countryFlag(txn.country)} ${countryName(txn.country)}</span>
            </div>
            <span class="text-2xl font-bold ${riskColor}">
                ${txn.risk_score}
            </span>
        </div>

        <p class="dark:text-gray-300">Amount: $${txn.amount}</p>
        <p class="dark:text-gray-300 mb-4">Explanation: ${txn.explanation}</p>

        <button onclick="toggleEvidence()" class="text-blue-500 hover:underline">
            Show Evidence
        </button>

        <div id="evidence" class="hidden mt-3 space-y-2">
            ${txn.evidence
                .map(e => `
                    <div class="glass p-3 rounded">
                        <b>${e.doc_type}</b><br>
                        <p>${e.full_text}</p>
                    </div>
            `).join("")}
        </div>
    `;

    // Update chart
    chart.data.labels = riskScores.map((_, i) => i + 1);
    chart.data.datasets[0].data = riskScores;
    chart.update();

    // Update history table
    const tbody = document.getElementById("history-body");
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = transactions.filter(t =>
        t.merchant.toLowerCase().includes(search) ||
        countryName(t.country).toLowerCase().includes(search)
    );

    tbody.innerHTML = filtered.map(t => `
        <tr class="border-b dark:border-gray-700">
            <td class="p-3">${t.transaction_id}</td>
            <td class="p-3">${t.merchant}</td>
            <td class="p-3">$${t.amount}</td>
            <td class="p-3">${t.risk_score}</td>
            <td class="p-3">${countryFlag(t.country)} ${countryName(t.country)}</td>
            <td class="p-3">${new Date().toLocaleTimeString()}</td>
        </tr>
    `).join("");
}

/* UTILITIES ----------------------------------------------- */

function toggleEvidence() {
    document.getElementById("evidence").classList.toggle("hidden");
}

function playBeep() {
    new Audio("beep.mp3").play();
}

function startPolling() {
    fetchLatest();
    setInterval(fetchLatest, 2000);
}
