# User
* company name SAMUEL TATU
* language  English, Romanian, Español
* id (PK)
* email, password\_hash
* business\_name, tax\_id, currency

#### Expense

* id (PK)
* user\_id (FK)
* date, description, vendor
* amount, tax\_rate
* category, receipt\_url

#### Revenue

* id (PK)
* user\_id (FK)
* date, client, description
* amount, tax\_rate
* invoice\_url, status

#### TaxSummary (Generated per user/report)

* period (e.g., Q1 2025)
* total\_revenue, total\_expenses

net\_profit, tax\_liability

