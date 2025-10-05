# ERTL_tegb_certification_project_25cypress

## TEG#B Cypress Certification Project

Tento projekt obsahuje automatizované testy pro bankovní aplikaci TEG#B jako součást certifikačního zadání. Testy jsou psány v Cypressu a pokrývají E2E scénáře, API testy, data‑driven testy a atomické testy dashboardu.

Používá se Page Object Pattern, Fluent API styl, intercepty pro čekání na backend a dynamická data generovaná pomocí knihovny Faker.

## Struktura projektu

Projekt je rozdělen do složek podle typu testů:

- `e2e_tests` – komplexní scénáře (registrace, přihlášení, úprava profilu, vytvoření účtu, odhlášení)
- `api_tests` – přímé volání API (např. login, vytvoření účtu přes token)
- `data_driven` – testy s různými částkami na účtu (validace zůstatku)
- `atomic_dashboard` – atomické testy dashboardu (nadpisy, labely, tlačítka, funkčnost odhlášení)
- `support/page_objects` – Page Objecty pro jednotlivé stránky a komponenty (LoginPage, RegisterPage, DashboardPage, ProfileSection, AccountsSection)
- `support/api` – API helpery (UserApi, AccountsApi)
- `support/helpers` – vlastní helpery (customElement, faker_generator)
- `fixtures` - testovací data JSON (např. account_data.json)

## Pokryté scénáře

E2E

- Registrace uživatele přes UI
- Přihlášení a validace dashboardu
- Úprava profilu a ověření změn
- Odhlášení a návrat na login stránku

API

- Registrace a login přes API
- Ověření status kódů a získání tokenu
- Vytvoření účtu přes API

Data Driven Tests

- Vytvoření účtů s různými zůstatky (0 Kč, kladné, záporné, extrémní hodnoty)
- Validace účtů přes UI
- Skipnutí testů u známých bugů s vysvětlením

Atomické testy

- Hlavička aplikace (logo, titulek, odhlášení)
- Profilová sekce (nadpis, labely, tlačítko Upravit profil, formulář)
- Sekce Účty (nadpis, tlačítko Přidat účet)
- Funkčnost odhlášení

## Safety testy (kontrola data-testid)

Pro zvýšení stability testů jsem přidala tzv. _safety checky_, které ověřují,
že v DOMu existují všechny očekávané `data-testid` atributy používané v Page Objectech
(např. `chage-name-input`, `save-changes-button`).

- Testy se nachází ve složce `cypress/e2e/safety/`

## Použité technologie

- Cypress
- Page Object Pattern
- Fluent API
- `cy.intercept()` pro čekání na API
- `data-testid` selektory pro stabilní identifikaci prvků
- Faker pro generování dynamických dat
- Kombinace UI a API testování

## Spuštění testů

- Instalace závislostí: `npm install`
- Spuštění Cypress GUI: `npx cypress open`
- Spuštění konkrétního testu přes CLI:  
  `npx cypress run --spec "cypress/e2e/e2e_tests/tegb_e2e.cy.js"`

Testy jsou navrženy tak, aby byly spustitelné lokálně bez dalších úprav. URL aplikace je načítána z proměnné `Cypress.env("frontendUrl")`, která je definována v konfiguraci nebo v souboru `cypress.env.json`.

## Poznámka k architektuře

- `LoginPage` – přihlášení uživatele
- `RegisterPage` – registrace nového uživatele
- `DashboardPage` – navigace a základní prvky dashboardu
- `ProfileSection` – editace a validace profilu
- `AccountsSection` – vytvoření a validace účtu

Lokátory jsou definovány jako `customElement` přímo v konstruktoru, v souladu s Page Object Patternem. Testy využívají Fluent API styl, který zajišťuje čitelný a plynulý tok kroků bez zbytečného přerušování.

Duplicitní třídy jako `ProfilePage`, `CheckDataPage` nebo `ProfileDetailsPage` byly odstraněny. Projekt je díky tomu udržitelný, čitelný a připravený na rozšíření.

## Autor

Projekt vytvořila **Lenka Ertl** jako součást certifikačního zadání v rámci QA kurzu.  
Repozitář: [ERTL_tegb_certification_project_25cypress](https://github.com/LenkaErtl/ERTL_tegb_certification_project_25cypress)
