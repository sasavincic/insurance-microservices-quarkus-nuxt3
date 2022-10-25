import { InsuredPerson } from "./InsuredPerson";
import { defineStore } from "pinia";
import { Insurance } from "./Insurance";

export enum ClaimState {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface Claim {
    id?: number,
    insuredPerson?: InsuredPerson,
    insurancePolicy?: Insurance,
    accidentDate?: Date,
    claimDate?: Date,
    claimState?: ClaimState,
    comment?: string
}

interface ClaimStoreState {
    claims: Claim[],
    claim: Claim
}

export const useClaimStore = defineStore('claimStore', {
    state: (): ClaimStoreState =>  ({
        claims: [],
        claim: {}
    }),
    getters: {
        countByState: (state: ClaimStoreState) => (claimState: string) => 
            state.claims.filter(claim => claim.claimState == claimState).length,

        mostRecentClaim: (state: ClaimStoreState) => () => 
            state.claims.sort((a,b) => b.id - a.id)[0]
    },
    actions: {
        async fetchAll() {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}`).then(res => res.json()).then(data => this.claims = data).catch(err => console.log(err));
        },
        async fetchById(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/${id}`).then(res => res.json()).then(data => this.claim = data).catch(err => console.log(err));
        },
        async fetchByIdIfProvided(id: any, idProvided: Boolean) {
            this.claim = {};
            if(idProvided) {
                this.fetchById(id);
            }
        },
        async fetchByInsuredPerson(insuredPersonId: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/insuredPerson/${insuredPersonId}`).then(res => res.json()).then(data => this.claims = data).catch(err => console.log(err));
        },
        async add(claim: Claim) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}`, {method: "POST", body: JSON.stringify(claim), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.claims.push(claim);
        },
        async update(claim: Claim) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/${claim.id}`, {method: "PUT", body: JSON.stringify(claim), headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }}).then(res => console.log(res)).catch(err => console.log(err));
            this.fetchAll();
        },
        async delete(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/${id}`, {method: "DELETE"});
            this.fetchAll();
        },
        async approve(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/approve/${id}`, {method: "PUT"}).catch(err => console.log(err));
            this.fetchAll();
        },
        async reject(id: any) {
            const config = useRuntimeConfig();
            await fetch(`${config.CLAIM_BASE_API}/reject/${id}`, {method: "PUT"}).catch(err => console.log(err));
            this.fetchAll();
        }
    }
});


