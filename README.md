# ERTL_tegb_certification_project_25cypress

## TEG#B Cypress Certification Project

Tento projekt obsahuje automatizované testy pro bankovní aplikaci TEG#B jako součást certifikačního zadání. Testy jsou psány v Cypressu a pokrývají E2E scénáře, API testy, data-driven testy a atomické testy dashboardu.  
Používá se Page Object Pattern, Fluent API styl, intercepty pro čekání na backend a dynamická data generovaná pomocí knihovny Faker.

## Struktura projektu

Projekt je rozdělen do složek podle typu testů:

- `e2e_tests` – komplexní scénáře (registrace, přihlášení, úprava profilu, vytvoření účtu, odhlášení)
- `api_tests` – přímé volání API (např. login, vytvoření účtu přes token)
- `data_driven` – testy s různými částkami na účtu (validace zůstatku)
- `atomic_dashboard` – atomické testy dashboardu (např. nadpis, přepínání sekcí)
- `support/pages` – Page Objecty pro jednotlivé stránky (login, registrace)
- `support/page_objects/tegb_page_objects` – komponenty dashboardu (profil, účty)
- `support/api` – API helpery pro login a účty
- `support/helpers` – vlastní helpery (`customElement`, `faker_generator`)

## Pokryté scénáře

- Registrace uživatele přes UI
- Přihlášení přes login stránku s validací dashboardu
- Úprava profilu a ověření změn
- Vytvoření účtu přes API a kontrola statusu
- Zobrazení účtu na frontend (aktuálně nefunkční – test to loguje)
- Odhlášení a návrat na login

## Použité technologie

- Cypress
- Page Object Pattern
- Fluent API styl
- `cy.intercept()` pro čekání na API
- `data-testid` selektory
- Dynamická data přes Faker
- Kombinace UI a API testování

## Spuštění testů

- Instalace závislostí: npm install
- Spuštění Cypress GUI: npx cypress open
- Spuštění konkrétního testu přes CLI: npx cypress run --spec "cypress/e2e/e2e_tests/tegb_e2e.cy.js"

Testy jsou navrženy tak, aby byly spustitelné lokálně bez dalších úprav. URL aplikace je načítána z proměnné Cypress.env("frontendUrl"), která je definována v konfiguraci nebo v souboru cypress.env.json

## Autor

Projekt vytvořila **Lenka Ertl** jako součást certifikačního zadání v rámci QA kurzu.  
Repozitář: [ERTL_tegb_certification_project_25cypress](https://github.com/LenkaErtl/ERTL_tegb_certification_project_25cypress)
