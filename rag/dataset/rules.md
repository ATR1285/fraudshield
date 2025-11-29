# Fraud Detection Rules for FraudShield AI

## Rule #1: Card Testing

**rule_id:** CARD_TESTING

**title:** Card Testing - Multiple Small Transactions

**description:** Fraudsters often test stolen card validity by making multiple small transactions in rapid succession. This pattern indicates an attempt to identify working card numbers before making larger purchases.

**red_flags:**

- Multiple transactions under $5 within 15 minutes
- Different merchant categories in quick succession
- Transaction amounts: $0.99, $1.99, $2.99 (common test amounts)
- Card decline followed by successful transactions
- Testing pattern: small online purchases

**suggested_action:** Flag transaction for review; consider temporary card lock; request cardholder verification.

---

## Rule #2: High Velocity Transactions

**rule_id:** HIGH_VELOCITY

**title:** High Velocity - Unusually Frequent Transactions

**description:** Legitimate customers rarely make more than 5-10 purchases per day. A spike in transaction frequency in a short timeframe suggests account compromise or fraudulent activity.

**red_flags:**

- More than 10 transactions in 1 hour
- Transactions across different geographic locations
- Mix of online and in-person transactions
- Total daily transaction count 5x above historical average
- Rapid-fire purchases from multiple vendors

**suggested_action:** Block further transactions; contact cardholder immediately; monitor for 24-48 hours.

---

## Rule #3: Geo-IP Mismatch

**rule_id:** GEO_IP_MISMATCH

**title:** Geographic Inconsistency - Impossible Travel

**description:** Transactions originating from geographically distant locations within a physically impossible timeframe indicate fraudulent activity or account compromise.

**red_flags:**

- Transaction in New York, followed by transaction in Tokyo within 2 hours
- IP geolocation conflicts with billing address
- Transaction country differs from cardholder's home country (first time)
- Sudden shift from domestic to international transactions
- Multiple countries in a 24-hour period

**suggested_action:** Flag for manual review; request 3D Secure verification; consider card replacement.

---

## Rule #4: Unusual Spending Amount

**rule_id:** UNUSUAL_AMOUNT

**title:** Anomalous Transaction Amount

**description:** Transactions significantly deviating from the cardholder's typical spending patterns suggest unauthorized use or account takeover.

**red_flags:**

- Single transaction 10x larger than historical average
- Round dollar amounts (e.g., $5,000, $10,000) more suspicious than realistic amounts
- Spending spike in luxury categories without historical precedent
- High-value transaction followed by card decline
- Amount matches known fraudster purchase thresholds

**suggested_action:** Contact cardholder for verification; place transaction on hold pending confirmation.

---

## Rule #5: Suspicious Merchant Category

**rule_id:** SUSPICIOUS_MERCHANT

**title:** High-Risk Merchant Category

**description:** Certain merchant categories (gambling, money transfer, adult content) carry higher fraud risk. Transactions in these categories by cardholders with no history warrant scrutiny.

**red_flags:**

- First transaction in gambling or money transfer category
- Rapid succession of purchases at money services
- Adult content or gift card purchases from low-trust merchants
- Cryptocurrency exchange transactions (first time)
- Prepaid card purchases at multiple locations
- Wire transfer or remittance services

**suggested_action:** Verify transaction with cardholder; decline if unable to confirm; flag account for monitoring.

---

## Rule #6: Account Takeover Indicators

**rule_id:** ACCOUNT_TAKEOVER

**title:** Account Takeover - Behavioral Shift

**description:** Sudden changes in account behavior, device usage, or location patterns indicate potential account compromise or identity theft.

**red_flags:**

- New shipping address used for first time
- Login from new device or unusual browser
- Password reset followed by immediate large purchase
- Transactions from VPN or anonymization service
- Account login from country different than cardholder location
- Multiple failed login attempts preceding successful transaction

**suggested_action:** Require multi-factor authentication; force re-authentication; place hold pending verification.

---

## Rule #7: Repeated Decline → Approval Pattern

**rule_id:** DECLINE_APPROVAL_PATTERN

**title:** Decline and Resubmission - Fraud Signal

**description:** Fraudsters often resubmit declined transactions with slightly different amounts or merchant data. Multiple declines followed by approval in quick succession suggests testing stolen credentials.

**red_flags:**

- 3+ declined transactions followed by successful approval
- Amount varies slightly between attempts ($99.99, $100.00, $100.50)
- Same or similar merchant across declined/approved sequence
- Resubmissions within 5-10 minutes of decline
- Pattern across multiple cards

**suggested_action:** Decline transaction; flag account; investigate other recent activity on account.

---

## Rule #8: Night-time High-Risk Activity

**rule_id:** NIGHTTIME_ACTIVITY

**title:** Unusual Hours Transaction - Off-Peak Risk

**description:** Cardholders typically make purchases during business hours. Transactions at 2 AM, especially in high-value categories, often indicate fraudulent activity.

**red_flags:**

- Large transaction (>$500) between 2 AM - 5 AM
- High-risk merchant category at unusual hours
- Transaction timestamp conflicts with device timezone
- Night transactions from unfamiliar location
- Pattern of late-night transactions (unusual for cardholder)

**suggested_action:** Contact cardholder for verification; consider decline if unable to confirm immediately.

---

## Rule #9: Cross-Border Transaction Spike

**rule_id:** CROSS_BORDER_SPIKE

**title:** Sudden International Activity

**description:** Accounts with no history of international transactions suddenly making cross-border purchases represents a significant fraud risk.

**red_flags:**

- First international transaction without prior pattern
- High-value international purchase (>$1,000)
- Transactions in high-fraud-risk countries
- Multiple international transactions in single day
- International transaction from IP in different country than cardholder

**suggested_action:** Block international transactions temporarily; request travel verification from cardholder.

---

## Rule #10: Device Fingerprint Anomaly

**rule_id:** DEVICE_ANOMALY

**title:** Unknown Device Transaction

**description:** Transactions from unregistered or unfamiliar devices, especially combined with other risk factors, indicate unauthorized access.

**red_flags:**

- Transaction from device not previously associated with account
- Device browser/OS profile inconsistent with historical patterns
- Mobile vs. desktop shift (e.g., always mobile, now desktop)
- Jailbroken/rooted device detected
- VPN or proxy masking device geolocation

**suggested_action:** Require device verification; send approval code to registered device only; flag for investigation.

---

## Rule #11: Refund Fraud Pattern

**rule_id:** REFUND_FRAUD

**title:** Refund Abuse and Chargeback Signals

**description:** Fraudsters sometimes purchase items, immediately request refunds, then dispute the charge—collecting product and money. Repeated refund requests or rapid purchase/refund cycles indicate abuse.

**red_flags:**

- Purchase followed by refund request within 24 hours
- Multiple refund requests across different merchants in short period
- Refund amount disputes (claims higher than actual charge)
- Chargebacks filed on accounts with pattern of refunds
- Purchase of easily resellable items followed by refund

**suggested_action:** Flag account; require longer refund windows; monitor for chargebacks; consider account closure.

---

## Rule #12: Velocity on Billing Address Change

**rule_id:** ADDRESS_CHANGE_VELOCITY

**title:** Address Change Followed by Activity Spike

**description:** Criminals often change billing address first to redirect statements. Immediate large purchases after address change indicate account takeover.

**red_flags:**

- Billing address changed via online portal or customer service
- Large transaction within 30 minutes of address change
- New address in high-risk country
- Temporary address (mail forwarding service) used
- Address change to location inconsistent with IP geolocation

**suggested_action:** Revert address change pending verification; contact cardholder via known number; freeze account.

---

## Rule #13: Dormant Account Reactivation

**rule_id:** DORMANT_REACTIVATION

**title:** Inactive Account Suddenly Active

**description:** Accounts inactive for months that suddenly spike in activity suggest compromise of stored credentials from a data breach.

**red_flags:**

- No transactions in 6+ months, sudden activity
- Different merchant categories than historical pattern
- First activity is high-value transaction
- Location of new activity different from past usage
- Velocity spike immediately after account reactivation

**suggested_action:** Require full re-authentication; request cardholder confirmation; consider account reset.

---

## Rule #14: High-Value Gift Card Pattern

**rule_id:** GIFT_CARD_FRAUD

**title:** Gift Card and Prepaid Purchase Spike

**description:** Gift cards and prepaid cards are difficult to reverse. Fraudsters use stolen cards to buy these for resale or money laundering. Multiple purchases in this category in short timeframe indicate fraud.

**red_flags:**

- Multiple gift card purchases (iTunes, Amazon, Google Play) in short period
- Large total value across multiple small purchases
- First transaction ever in this category
- Rapid succession of purchases at different retailers
- Merchant coded as low-risk but high-fraud category

**suggested_action:** Decline transaction; contact cardholder; investigate recent account changes.

---

## Rule #15: Layering Transaction Pattern

**rule_id:** LAYERING_PATTERN

**title:** Money Laundering - Layering Indicator

**description:** Multiple transactions with specific patterns (deposits/withdrawals, transfers between accounts) suggest money laundering or structuring to evade detection.

**red_flags:**

- Rapid cycles of deposits and immediate withdrawals
- Transactions just below $10,000 reporting threshold (structuring)
- Multiple transfers to shell company accounts
- Pattern of purchases quickly converted to cash equivalents
- Transactions to countries on high-risk financial lists

**suggested_action:** File Suspicious Activity Report (SAR); freeze account pending investigation; escalate to compliance.

---

## Rule #16: Loyalty Program Abuse

**rule_id:** LOYALTY_ABUSE

**title:** Loyalty Points or Rewards Exploitation

**description:** Fraudsters with stolen loyalty accounts or compromised points attempt rapid redemptions or transfers, or make fraudulent purchases targeting high-reward categories.

**red_flags:**

- Unusual points balance activity (sudden increase/decrease)
- Points transferred to new account or third party
- High-reward category purchases without prior pattern
- Multiple transactions at same low-value retailer (points stacking)
- Attempted redemption of points to gift cards

**suggested_action:** Lock loyalty account; verify points redemption; investigate balance anomalies.

---

## Rule #17: Keylogger/Malware Signature

**rule_id:** MALWARE_SIGNATURE

**title:** Technical Indicators of Compromised Device

**description:** Multiple failed transactions with typos or format errors, combined with other factors, suggest malware or keylogger on cardholder device attempting transactions.

**red_flags:**

- Multiple transactions with data entry errors (wrong amounts, dates)
- Transactions interspersed with legitimate activity (competing for resources)
- Device submission speed inconsistent with human behavior
- Form submissions with unusual keystroke timing patterns
- Multiple failed payment attempts with slight format variations

**suggested_action:** Alert cardholder of potential malware; request device scan; consider temporary freeze pending verification.

---

## Rule #18: Third-Party Account Linking

**rule_id:** THIRD_PARTY_LINKING

**title:** Unauthorized Account Connection

**description:** Fraudsters often link stolen cards to e-wallet services, buy-now-pay-later accounts, or payment platforms for rapid liquidation. Unusual linking activity signals compromise.

**red_flags:**

- New payment service linked to account for first time
- Buy-now-pay-later service linked, immediately used
- E-wallet linking followed by large transaction
- Third-party app permission grants for payment access
- Linking from different device/IP than cardholder

**suggested_action:** Remove linked accounts; require re-authentication; contact cardholder; monitor for suspicious payments.

---

## Rule #19: Cryptocurrency Purchase Patterns

**rule_id:** CRYPTO_PURCHASE

**title:** Cryptocurrency Exchange Transaction

**description:** Cryptocurrency purchases are difficult to reverse and often used in ransomware, darknet, or money laundering schemes. First-time crypto purchases warrant scrutiny.

**red_flags:**

- First-time cryptocurrency exchange purchase
- Large amount ($5,000+) on first crypto transaction
- Crypto purchase from high-risk exchange
- Multiple crypto purchases in single day
- Purchase immediately after account compromise indicators
- Crypto purchase on account with history of declined transactions

**suggested_action:** Block transaction; contact cardholder immediately; request verification before allowing crypto purchases.

---

## Rule #20: Mobile Wallet Enrollment Fraud

**rule_id:** MOBILE_WALLET_FRAUD

**title:** Unauthorized Mobile Wallet Addition

**description:** Criminals add stolen card details to Apple Pay, Google Pay, or similar services to make quick, difficult-to-verify transactions. Multiple enrollments warrant investigation.

**red_flags:**

- New device or phone number added to mobile wallet
- Multiple card additions to wallet in short period
- Mobile wallet enrollment followed by immediate large transaction
- Enrollment country different from cardholder location
- Enrollment from new device without prior notification

**suggested_action:** Disable mobile wallet; verify enrollment with cardholder; confirm registered devices; re-enable after verification.
