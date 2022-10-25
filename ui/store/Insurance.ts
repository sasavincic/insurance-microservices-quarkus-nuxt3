import { defineStore } from "pinia";
import { useClaimStore } from "./Claim";
import { InsuredPerson } from "./InsuredPerson";

export interface Insurance {
    id?: number,
    insuredPerson?: InsuredPerson,
    policyType?: string,
    validFrom?: Date,
    validUntil?: Date,
    vehicleRegistrationNumber?: number,
    vehicleType?: string,
    mileage?: number,
    drivingExperience?: string,
    vehicleOwnership?: boolean,
    vehicleYear?: string,
    numberOfSpeedViolations?: number,
    numberOfDUIViolations?: number,
    numberOfPastAccidents?: number,
};

interface InsuranceStoreState {
    insurances: Insurance[],
    insurancesSpecific: Insurance[],
    insurance: Insurance
}

export const useInsuranceStore = defineStore("insuranceStore", {
    state : (): InsuranceStoreState => ({
        insurances: [],
        insurancesSpecific: [],
        insurance: {}
    }),
    getters: {
        countActive: (state: InsuranceStoreState) => () => 
            state.insurances.filter(insurance => insurance.validUntil == null).length,
        countCancelled: (state: InsuranceStoreState) => () => 
            state.insurances.filter(insurance => insurance.validUntil != null).length,
    },
    actions: {
        async fetchAll() {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}`).then(res => res.json()).then(data => this.insurances = data).catch(err => console.log(err));
        },
        async fetchById(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}/${id}`).then(res => res.json()).then(data => this.insurance = data).catch(err => console.log(err));
        },
        async fetchByIdIfProvided(id: any, idProvided: Boolean) {
            this.insurance = {};
            if(idProvided) {
                this.fetchById(id);
            }
        },
        async fetchByInsuredPerson(insuredPersonId: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}/insuredPerson/${insuredPersonId}`).then(res => res.json()).then(data => this.insurances = data).catch(err => console.log(err));
        },
        async fetchActiveForInsuredPerson(insuredPersonId: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}/insuredPerson/active/${insuredPersonId}`).then(res => res.json()).then(data => this.insurancesSpecific = data).catch(err => console.log(err));
        },
        async add(insurance: Insurance) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}`, {method: "POST", body: JSON.stringify(insurance), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.insurances.push(insurance);
        },
        async update(insurance: Insurance) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}/${insurance.id}`, {method: "PUT", body: JSON.stringify(insurance), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.fetchAll();
        },
        async delete(id: any) {
            const config = useRuntimeConfig();

            const claimStore = useClaimStore();
            claimStore.fetchAll();
            claimStore.claims.forEach(claim => {
                if(claim.insurancePolicy == this.insurance.id) {
                    claimStore.delete(claim.id);
                }
            });

            await fetch(`${config.INSURANCE_BASE_API}/${id}`, {method: "DELETE"});
            this.fetchAll();
        },
        async cancel(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURANCE_BASE_API}/cancel/${id}`, {method: "PUT"})
            this.fetchById(id);
        }
    }
});



