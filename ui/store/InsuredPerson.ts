import { defineStore } from "pinia";
import { useClaimStore } from "./Claim";
import { insuredPersonParams } from "./entityParams";
import { useInsuranceStore } from "./Insurance";

export interface InsuredPerson {
    id?: number,
    fullName?: string,
    email?: string,
    gender?: string,
    dateOfBirth?: Date,
    age?: string
    maritalStatus?: string,
    numberOfChildren?: number,
    incomeLevel?: string,
    education?: string
}

interface InsuredPersonStoreState {
    insuredPersons: InsuredPerson[],
    insuredPerson: InsuredPerson
}

export const useInsuredPersonStore = defineStore("insuredPersonStore", {
    state: (): InsuredPersonStoreState => ({
        insuredPersons: [],
        insuredPerson: {}
    }),
    getters: {
        getById: (state: InsuredPersonStoreState) => (id: any) => 
            state.insuredPersons.filter(insuredPerson => insuredPerson.id == id)[0],
    },
    actions: {
        async fetchAll() {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURED_PERSON_BASE_API}`).then(res => res.json()).then(data => this.insuredPersons = data).catch(err => console.log(err));
        },
        async fetchById(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURED_PERSON_BASE_API}/${id}`).then(res => res.json()).then(data => this.insuredPerson = data).catch(err => console.log(err));
        },
        async fetchByIdIfProvided(id: any, idProvided: Boolean) {
            this.insuredPerson = {}
            if(idProvided) {
                this.fetchById(id);
            }
        },
        async add(insuredPerson: InsuredPerson) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURED_PERSON_BASE_API}`, {method: "POST", body: JSON.stringify(insuredPerson), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.insuredPersons.push(insuredPerson);
        },
        async update(insuredPerson: InsuredPerson) {
            const config = useRuntimeConfig();
            await fetch(`${config.INSURED_PERSON_BASE_API}/${insuredPerson.id}`, {method: "PUT", body: JSON.stringify(insuredPerson), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.fetchAll();
        },
        async delete(id: any) {
            const config = useRuntimeConfig();
            
            const insuranceStore = useInsuranceStore();
            insuranceStore.fetchAll();
            insuranceStore.insurances.forEach(insurance => {
                if(insurance.insuredPerson == this.insuredPerson.id) {
                    insuranceStore.delete(insurance.id);
                }
            });

            const claimStore = useClaimStore();
            claimStore.fetchAll();
            claimStore.claims.forEach(claim => {
                if(claim.insuredPerson == this.insuredPerson.id) {
                    claimStore.delete(claim.id);
                }
            });

            await fetch(`${config.INSURED_PERSON_BASE_API}/${id}`, {method: "DELETE"});
            this.fetchAll();
        },
    }
});