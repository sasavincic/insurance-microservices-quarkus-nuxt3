package com.example.service;

import com.example.entity.Claim;
import com.example.entity.ClaimState;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
@Transactional
public class ClaimService {
    public List<Claim> getAllClaims() {
        return Claim.listAll();
    }

    public Claim getClaim(Long id) {
        return Claim.findById(id);
    }

    public List<Claim> getByInsuredPerson(Long insuredPersonId) { return Claim.list("insuredPerson", insuredPersonId); }

    public void createClaim(Claim claim) {
        claim.claimState = ClaimState.CREATED;
        claim.claimDate = LocalDate.now();
        claim.persist();
    }

    public void updateClaim(Long id, Claim claim) {
        Claim entity = Claim.findById(id);
        entity.mapClaim(claim);
    }

    public void deleteClaim(Long id) {
        Claim.deleteById(id);
    }

    public void changeClaimState(Long id, ClaimState newState) {
        Claim claim = Claim.findById(id);
        if (claim.claimState == ClaimState.CREATED) {
            claim.claimState = newState;
        } else {
            throw new BadRequestException("Cannot approve/reject already approved/rejected claim!");
        }
    }

    public ClaimState getClaimState(Long id) {
        Claim claim = Claim.findById(id);
        return claim.claimState;
    }
}
