# 🚨 **FraudShield AI – Real-Time Fraud Detection Dashboard**

FraudShield AI is a real-time fraud monitoring system powered by **FastAPI**, **Python ML streaming**, and a responsive **TailwindCSS dashboard**.
It continuously generates transactions, analyzes fraud risks using heuristic rules, and displays insights on a live dashboard.

---

# 📌 **Features**

### 🔥 **Real-Time Fraud Detection**

* Live transaction ingestion (simulated financial transactions)
* Real-time risk scoring based on:

  * Transaction amount
  * Merchant behavior
  * Velocity anomalies
  * Country-risk indicators
  * Pattern-based heuristics

### 📊 **Interactive Dashboard**

* Dynamic fraud risk chart (last 50 transactions)
* Latest transaction card with explanations & evidence
* Real-time analysis summary
* Country flags + full country names
* Searchable transaction history table

### 🚨 **Risk Alerts**

* High-risk events automatically logged
* Shows critical, high, moderate, low alerts
* Highlights country risk, amount anomalies, and velocity patterns



---

# 🧱 **Project Structure**

```
fraudshield-ai/
│
├── backend/
│   ├── main.py                  # FastAPI backend
│   ├── models.py                # Transaction models
│   ├── ... 
│
├── ml/
│   ├── stream_pipeline.py       # Live transaction generator
│   ├── engine.py                # Risk scoring logic
│
├── frontend-static/
│   ├── index.html               # Dashboard UI
│   ├── app.js                   # Frontend logic
│   ├── styles.css               # Custom styling
│
├── .venv/                       # Virtual environment
├── README.md
```

---

# 🚀 **How to Run the Entire Project**

## 1️⃣ **Activate Virtual Environment**

```sh
.venv\Scripts\activate
```

---

## 2️⃣ **Start Backend (FastAPI API)**

```sh
cd backend
uvicorn main:app --reload
```

Backend will run on:

➡ [http://127.0.0.1:8000](http://127.0.0.1:8000)
➡ API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 3️⃣ **Start ML Streaming Pipeline**

Open a **new terminal**, run:

```sh
.venv\Scripts\activate
cd ml
python stream_pipeline.py
```

This continuously sends real-time transactions to the backend.

---

## 4️⃣ **Start Frontend Dashboard**

Open a **third terminal**:

```sh
cd frontend-static
python -m http.server 3000
```

Dashboard opens at:

👉 [http://localhost:3000/index.html](http://localhost:3000/index.html)

---

# 🖼 **Screenshots**

### 💻 Dashboard Overview

(You can upload screenshots to GitHub later)

---

# 🧪 **Tech Stack**

| Layer         | Technology              |
| ------------- | ----------------------- |
| Backend API   | FastAPI + Pydantic      |
| ML Stream     | Python + Risk Engine    |
| Frontend      | HTML + TailwindCSS + JS |
| Visualization | Chart.js                |
| Reporting     | jsPDF                   |
| Hosting       | Runs locally            |

---

# 🧠 **Risk Scoring Logic**

Fraud risk score is derived from:

* High-value transactions
* Cross-border & high-risk countries
* Merchant category anomalies
* Velocity-based patterns
* Explanation labels + evidence

Scores range: **0 (safe) → 100+ (fraud likely)**

---



# 🙌 **Contributions**

Pull requests are welcome!
Please open an issue first for major feature discussions.

---

# 📜 **License**

MIT License (add LICENSE file if required)


Would you like those?
