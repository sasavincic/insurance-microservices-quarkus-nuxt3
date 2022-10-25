package com.example.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Claim extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    public Long insuredPerson;
    public Integer insurancePolicy;
    public LocalDate accidentDate;
    public LocalDate claimDate;
    public ClaimState claimState;
    public String comment;

    public void mapClaim(Claim claim) {
        this.insuredPerson = claim.insuredPerson;
        this.insurancePolicy = claim.insurancePolicy;
        this.accidentDate = claim.accidentDate;
        this.claimDate = claim.claimDate;
        this.claimState = claim.claimState;
        this.comment = claim.comment;
    }
}
