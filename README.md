# GreenLedger 🌿 | AI-Powered Carbon Accounting for UK SMEs

![Status](https://img.shields.io/badge/Status-MVP_Complete-success)
![Stack](https://img.shields.io/badge/Stack-Python_|_FastAPI_|_Next.js-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Executive Summary
**GreenLedger** is a B2B SaaS solution designed to help UK Small and Medium Enterprises (SMEs) automate their carbon reporting.

With the UK Government's ambitious **Net Zero 2050** targets and tightening **SECR (Streamlined Energy and Carbon Reporting)** regulations, manual spreadsheet tracking is no longer viable. GreenLedger utilizes **Optical Character Recognition (OCR)** to ingest utility bills automatically, converting raw kWh usage into carbon footprint metrics using official UK Government (DEFRA) conversion factors.

---

## 🚀 Key Features

* **📄 Automated Bill Ingestion:** Users drag-and-drop PDF utility bills (British Gas, E.ON, EDF, etc.).
* **🤖 AI-Driven Extraction:** A Python-based OCR pipeline (Tesseract/PyMuPDF) extracts specific usage data (kWh) and billing periods, filtering out noise.
* **🇬🇧 UK Compliance Engine:** Automatically maps energy usage to CO2e (Carbon Dioxide Equivalent) using the latest **UK Government GHG Conversion Factors (2025/26)**.
* **📊 Executive Dashboard:** A React (Next.js) frontend visualizing monthly emission trends, helping companies identify reduction opportunities.
* **🔐 Secure & Scalable:** Built on FastAPI with PostgreSQL for robust data integrity.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS (Corporate/Clean UI)
* **Visualization:** Recharts (Data visualization)
* **State Management:** React Hooks / Context API

### Backend
* **API:** Python FastAPI (High performance, async support)
* **AI/OCR:** Tesseract OCR & OpenCV (Image preprocessing)
* **Data Processing:** Pandas (For time-series emission data)
* **Database:** PostgreSQL (Relational data storage)

---

## 🏗️ System Architecture

```mermaid
graph LR
    A[User / SME] -- Uploads PDF Bill --> B(Next.js Client)
    B -- POST /upload --> C(FastAPI Server)
    C -- Image Processing --> D{OCR Engine}
    D -- Extracted kWh Data --> E[Emission Calculator]
    E -- Fetches UK Conversion Factors --> F[(PostgreSQL DB)]
    F -- Returns JSON Data --> C
    C -- Sends Compiles JSON Data --> B
    B -- Renders Charts --> A
