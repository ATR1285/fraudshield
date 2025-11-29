# Common Fraud Patterns & Behavioral Cues

## Overview

This document outlines common fraud patterns, behavioral indicators, and operational methodologies used by fraud rings. This context is essential for the LLM to generate accurate, nuanced explanations of fraud signals detected in transactions.

---

## Pattern #1: Card Testing Rings

**Description:** Organized groups systematically test stolen card validity using micro-transactions.

**Behavioral Cues:**

- Initial transactions $0.99–$4.99 (low-value test amounts)
- Rapid fire: 5–20 transactions in under 30 minutes
- Different merchant categories (variety reduces detection)
- Sequential card number testing (4xxxx, 4xxxy, 4xxxz patterns)
- High success rate after initial card approval

**Detection Signal:** Multiple small transactions cluster within short timeframe; success rate improves after initial failures.

---

## Pattern #2: Refund Fraud Schemes

**Description:** Criminals purchase items, receive goods, then dispute the charge—keeping both product and money.

**Behavioral Cues:**

- Purchase of high-value, easily resellable items (electronics, gift cards)
- Refund request within 24–72 hours ("item not received," "item different")
- Chargeback filed shortly after refund denial
- Pattern repeats across multiple merchants
- Address changes between refund dispute and next purchase

**Detection Signal:** High ratio of refund requests to transactions; chargebacks on refunded orders; repeat customers with multiple disputes.

---

## Pattern #3: Account Takeover (ATO) Operations

**Description:** Criminals compromise legitimate accounts, often harvesting credentials via phishing, data breaches, or malware.

**Behavioral Cues:**

- Location shift (Texas → Nigeria)
- Device change (iPhone → Android from unfamiliar location)
- Behavioral anomalies (new merchant categories, spending amounts)
- Password reset preceding suspicious activity
- Login from VPN/proxy services
- Multi-factor authentication bypass attempts

**Detection Signal:** Device fingerprint mismatch + location change + velocity spike + new merchant categories simultaneously.

---

## Pattern #4: Synthetic Identity Fraud

**Description:** Criminals create fake personas using real and fabricated personal data, build credit history, then commit fraud or disappear.

**Behavioral Cues:**

- New account with minimal transaction history suddenly active
- Perfect credit behavior initially (on-time payments) followed by fraud spike
- Mix of real and inconsistent personal data
- Address/phone changes after initial "good standing" period
- Large purchase request shortly before account abandonment

**Detection Signal:** Sudden behavior shift from exemplary to high-risk; account opened recently (< 90 days) with immediate large purchase.

---

## Pattern #5: Organized Retail Crime (ORC) Rings

**Description:** Coordinated groups target specific high-value products using stolen payment methods.

**Behavioral Cues:**

- Purchases of identical high-value items (electronics, cosmetics, pharmaceuticals)
- Transactions at multiple store locations (different geos, same chain)
- Returns within hours of purchase for cash refund
- Same items purchased repeatedly across accounts
- All transactions within business hours (resale logistics)

**Detection Signal:** Identical product purchases across multiple cards; rapid-fire geo-dispersed transactions; high return rate.

---

## Pattern #6: Social Engineering Fraud

**Description:** Criminals manipulate customers or employees into revealing sensitive information or making unauthorized payments.

**Behavioral Cues:**

- Customer initiates transaction after support call
- Transaction immediately follows account modification (address, phone change)
- Unusual payment method (wire transfer, cryptocurrency) for typical purchase
- Cardholder disputes transaction but then withdraws dispute (coercion)
- Emotional urgency in transaction context (fake IRS, law enforcement threat)

**Detection Signal:** Transaction immediately after account changes; unusual payment method; customer withdraws fraud claim after initial dispute.

---

## Pattern #7: Money Mule Networks

**Description:** Networks of individuals ("mules") facilitate money flow for criminal organizations, often unknowingly (recruited through fake job offers).

**Behavioral Cues:**

- Account receives fund transfers, immediately remits to third party
- Transfers to high-fraud-risk countries
- Multiple accounts transfer to same destination
- Small remittance amounts (below reporting thresholds)
- Worker account: receives paycheck, immediately sends wire

**Detection Signal:** In/out transaction pattern; circular funds flow; consistent destination accounts; below-threshold structuring.

---

## Pattern #8: Friendly Fraud (Chargeback Abuse)

**Description:** Legitimate customers dispute authorized transactions, falsely claiming non-delivery or lack of authorization.

**Behavioral Cues:**

- Account history shows normal, consistent behavior
- Chargeback filed well after delivery period
- Buyer's remorse followed by dispute claim
- Multiple chargebacks from same account
- Disputes resolved in customer's favor historically

**Detection Signal:** Unusual chargeback-to-transaction ratio; chargebacks on accounts with long positive history; time lag between purchase and chargeback.

---

## Pattern #9: Darknet & Ransomware Payment Flow

**Description:** Criminals receive payment for illegal goods/services or ransom demands, often using cryptocurrency.

**Behavioral Cues:**

- Large cryptocurrency exchange purchases
- Purchase from known high-risk exchanges (Binance mixing services)
- Transaction follows breach notification or ransomware incident
- Rapid conversion of fiat to crypto (low time between transaction and exchange)
- Multiple small transactions totaling large amount (structuring below threshold)

**Detection Signal:** First-time crypto purchase; purchase amount matches publicized ransom; urgency indicator in transaction context.

---

## Pattern #10: Regional Fraud Rings

**Description:** Geographically concentrated fraud operations exploiting weak KYC processes or high cardholder concentration.

**Behavioral Cues:**

- Transactions originate from known high-fraud regions
- IP geolocation clusters in specific countries
- Merchant category clustering (money services, gift cards)
- Velocity spikes during specific hours (night in source region)
- Repeat offenders with same merchant category preferences

**Detection Signal:** Geographic concentration; time zone alignment with high-fraud region; known fraud ring MO.

---

## Layering Indicators

Understanding fraud typology helps contextualize risk:

1. **Placement Phase:** Converting dirty money to transactions (structuring, trade-based laundering)
2. **Layering Phase:** Obscuring money trail (multiple transfers, complex transactions)
3. **Integration Phase:** Reintroducing funds as legitimate income (business payments, salary)

Watch for combinations of these phases across single account.

---

## High-Risk Merchant Categories

These merchant codes carry elevated fraud risk:

- **6211:** Securities & Commodities Brokers
- **6051:** Crypto Currency
- **5411:** Grocery Stores (high return/refund abuse)
- **5816:** Digital Goods (gift cards, game credits)
- **7995:** Gambling & Gaming Services
- **7273:** Dating & Escort Services
- **6362:** Security Brokers & Dealers
- **5912:** Drug Stores & Pharmacies (medication resale)
- **5193:** Florists

---

## Behavioral Red Flags Summary

| Behavior                             | Risk Level | Context                            |
| ------------------------------------ | ---------- | ---------------------------------- |
| First international purchase         | Medium     | Check velocity, amount, merchant   |
| 3+ transactions/hour                 | High       | Usually ATO or testing ring        |
| Refund request within 24 hrs         | Medium     | Monitor for chargeback pattern     |
| Device change + location shift       | High       | Classic ATO indicator              |
| Crypto purchase + high velocity      | Critical   | Ransomware payment or theft        |
| Address change + large purchase      | Medium     | Verify ownership before processing |
| Multiple card declines then approval | High       | Card testing pattern               |
| Late-night large purchase            | Medium     | Confirm with cardholder            |
