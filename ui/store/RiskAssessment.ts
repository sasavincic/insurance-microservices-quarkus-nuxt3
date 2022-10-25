import { defineStore } from 'pinia'; 
import { useClaimStore } from './Claim';
import { useInsuranceStore } from './Insurance';
import { useInsuredPersonStore } from './InsuredPerson';

interface RiskAssessmentPayload {
    AGE: string,
    GENDER: string,
    DRIVING_EXPERIENCE: string,
    EDUCATION: string,
    VEHICLE_OWNERSHIP: string,
    VEHICLE_YEAR: string,
    MARRIED: string,
    CHILDREN: string,
    ANNUAL_KM: number,
    VEHICLE_TYPE: string,
    SPEEDING_VIOLATIONS: number,
    DUIS: number,
    PAST_ACCIDENTS: number,
    INCOME: string
}

interface RiskAssessmentStoreState {
    risk: any,
    payload: RiskAssessmentPayload
    assessed: boolean
}

export const useRiskAssessmentStore = defineStore('riskAssessmentStore', {
    state: (): RiskAssessmentStoreState =>  ({
        risk: 0,
        payload: {
            AGE: "",
            GENDER: "",
            DRIVING_EXPERIENCE: "",
            EDUCATION: "",
            VEHICLE_OWNERSHIP: "",
            VEHICLE_YEAR: "",
            MARRIED: "",
            CHILDREN: "",
            ANNUAL_KM: 0,
            VEHICLE_TYPE: "",
            SPEEDING_VIOLATIONS: 0,
            DUIS: 0,
            PAST_ACCIDENTS: 0,
            INCOME: ""
        },
        assessed: false
    }),
    actions: {
        async assessRisk() {
            const config = useRuntimeConfig();
            console.log(this.payload);
            await fetch(`${config.RISK_ASSESSMENT_BASE_API}/predict`, {method: "POST", body: JSON.stringify(this.payload), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => res.json()).then(data => this.risk = (data["fraud_probability"]*100).toFixed(2)).catch(err => console.log(err));;
            console.log(this.risk);
        },
        async prepareModelPayload() {
            const claimStore = useClaimStore();
            const insuredPersonStore = useInsuredPersonStore();
            const insuranceStore = useInsuranceStore();
            await insuranceStore.fetchById(claimStore.claim.insurancePolicy);
            await insuredPersonStore.fetchById(insuranceStore.insurance.insuredPerson);

            this.payload = {
                AGE: insuredPersonStore.insuredPerson.age,
                GENDER: insuredPersonStore.insuredPerson.gender.toLowerCase(),
                DRIVING_EXPERIENCE: insuranceStore.insurance.drivingExperience,
                EDUCATION: insuredPersonStore.insuredPerson.education.toLowerCase(),
                VEHICLE_OWNERSHIP: insuranceStore.insurance.vehicleOwnership ? 1 : 0,
                VEHICLE_YEAR: insuranceStore.insurance.vehicleYear,
                MARRIED: insuredPersonStore.insuredPerson.maritalStatus ? 1 : 0,
                CHILDREN: insuredPersonStore.insuredPerson.numberOfChildren,
                ANNUAL_KM: insuranceStore.insurance.mileage,
                VEHICLE_TYPE: insuranceStore.insurance.vehicleType.toLowerCase(),
                SPEEDING_VIOLATIONS: insuranceStore.insurance.numberOfSpeedViolations,
                DUIS: insuranceStore.insurance.numberOfDUIViolations,
                PAST_ACCIDENTS: insuranceStore.insurance.numberOfPastAccidents,
                INCOME: insuredPersonStore.insuredPerson.incomeLevel.toLowerCase()
            }

            console.log(this.payload);

        },
        async reloadModel() {
            const config = useRuntimeConfig();
            await fetch(`${config.RISK_ASSESSMENT_BASE_API}/model/reload`,).then(res => console.log(res)).catch(error => console.log(error));
        }
    }
});