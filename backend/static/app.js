async function fetchLatest() {
    let res = await fetch("/get-latest");
    let data = await res.json();

    if (data.status === "empty") {
        document.getElementById("status").innerHTML = "Waiting for transactions…";
        return;
    }

    let txn = data.transaction;

    document.getElementById("transaction-box").innerHTML = `
        <h3>Transaction ID: ${txn.transaction_id}</h3>
        <p>Amount: ${txn.amount}</p>
        <p>Risk Score: ${txn.risk_score}</p>
        <p>Explanation: ${txn.explanation}</p>
    `;
}

setInterval(fetchLatest, 1500);
fetchLatest();
