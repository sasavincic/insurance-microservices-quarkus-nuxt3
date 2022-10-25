# Microservice project for Car Insurance


## Techonologies used
Nuxt3 (Vue.js), Firebase, Quarkus, Panache, Postgres.

## How to run:
1. Create a postgres database instance
    - Create 3 databases (claim, insurance, insuredperson)
    - By default the port should be 5432, username and password should both be 'postgres' 

2. To run **ui**:
    - create `.env` file in root which contains:
        ```
        INSURANCE_BASE_API="http://localhost:50001/insurance"
        CLAIM_BASE_API="http://localhost:50002/claim"
        INSURED_PERSON_BASE_API="http://localhost:50003/insuredPerson"
        RISK_ASSESSMENT_BASE_API="http://localhost:5000"
        FIREBASE_API_KEY="{YOUR_API_KEY}"

    - run `npm i`
    - run `npm run dev`


3. To run: **claim**, **insurance** and **insured_person**:
    - run `./mvnw pachage compile quarkus:dev` for each microservice

The project should be running on localhost:3000
