# 🚨 **FraudShield AI — Real-Time Fraud Detection System**

### Built with FastAPI • Machine Learning • RAG • Tailwind • Vanilla JavaScript • Chart.js

FraudShield AI is a **real-time fraud detection platform** designed to simulate financial transaction monitoring.
It continuously generates synthetic transactions, analyzes them using **ML rules + RAG-based reasoning**, and updates a **live dashboard** with alerts, risk scores, charts, and downloadable reports.

---

# 🌟 **Features**

### 🔹 **Real-Time Transaction Streaming**

* Auto-generating transactions every 2 seconds
* Instant risk scoring
* Live updates without page refresh

### 🔹 **Fraud Detection Engine**

* Rule-based risk scoring
* RAG (Retrieval-Augmented Generation) explanation pipeline
* Velocity analysis, anomaly detection, country risk filtering

### 🔹 **Interactive Front-End Dashboard**

Built using **HTML + Tailwind CSS + Vanilla JavaScript + Chart.js**
Includes:

* Latest transaction card
* Risk score trend graph
* Real-time analysis summary
* High-risk activity alerts
* Complete transaction history table
* Theme switcher (Light/Dark Mode)
* PDF Report Download for each high-risk detection

### 🔹 **PDF Fraud Report Export**

Download a detailed fraud activity report as a PDF including:

* Merchant
* Amount
* Risk Score
* Country
* Explanation
* Risk Summary

---

# 📁 **Project Structure**

```
fraudshield/
│── backend/
│   ├── main.py                # FastAPI backend
│   ├── transaction_generator.py
│   ├── ml/
│   │   ├── model.py
│   │   ├── stream_pipeline.py  # Live stream sender
│   ├── rag/
│       ├── engine.py           # RAG reasoning module
│
│── frontend-static/
│   ├── index.html              # Main dashboard UI
│   ├── app.js                  # Core UI logic (fetch, chart, alerts, pdf)
│   ├── styles.css              # Custom UI styles
│   ├── beep.mp3                # Alert sound
│
│── README.md
│── requirements.txt
```

---

# 🚀 **How to Run the Project**

## **1️⃣ Clone the Repository**

```
git clone https://github.com/ATR1285/fraudshield.git
cd fraudshield
```

---

## **2️⃣ Create & Activate Virtual Environment**

### Windows:

```
python -m venv .venv
.venv\Scripts\activate
```

### Mac/Linux:

```
python3 -m venv .venv
source .venv/bin/activate
```

---

## **3️⃣ Install Dependencies**

```
pip install -r requirements.txt
```

---

## **4️⃣ Start FastAPI Backend**

```
cd backend
uvicorn main:app --reload
```

Backend runs at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## **5️⃣ Start Transaction Stream Engine**

Open a **second terminal**:

```
cd backend/ml
python stream_pipeline.py
```

This begins sending synthetic transactions to the backend API.

---

## **6️⃣ Start the Frontend Dashboard**

Open a **third terminal**:

```
cd frontend-static
python -m http.server 3000
```

Then open:

👉 [http://localhost:3000/index.html](http://localhost:3000/index.html)

---

# 📊 **Dashboard Preview**

### 🔹 Live Risk Score Trend

Displays last 50 transactions

### 🔹 Real-time Fraud Indicators

* Cross-border flag
* Velocity spike
* High amount threshold
* Country risk

### 🔹 High-Risk Activity Log

Automatic detection

### 🔹 PDF Report Download

Generates per-transaction fraud summary

---

# 🔧 **Tech Stack**

| Component          | Technology                     |
| ------------------ | ------------------------------ |
| **Backend**        | FastAPI, Python                |
| **ML**             | Rule-based Scoring + RAG       |
| **Frontend**       | HTML, Tailwind CSS, Vanilla JS |
| **Charts**         | Chart.js                       |
| **PDF Export**     | jsPDF                          |
| **Alerting**       | Audio cue + UI badge           |
| **Data Streaming** | Python generators              |

---

# 👥 **Team Members**

| Name          | Role                         |
| ------------- | ---------------------------- |
| ATR (Richard) | Frontend, UI/UX, Integration |
| Akil          | RAG + Reasoning Engineer     |
| Nirajan s P   | Backend API                  |
| Raman p       | ML Streaming Pipeline        |

---

# 🛡️ **Future Enhancements**

* AI-based anomaly detection (ML model)
* User authentication system
* Multi-merchant filtering
* Email/SMS fraud alerts
* Historical charts & monthly insights

---

