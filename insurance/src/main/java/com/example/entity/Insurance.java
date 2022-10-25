package com.example.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@JsonInclude
public class Insurance extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    public Long insuredPerson;
    public String policyType;
    public LocalDate validFrom;
    public LocalDate validUntil;
    public String vehicleRegistrationNumber;
    public String vehicleType;
    public Long mileage;
    public String drivingExperience;
    public Boolean vehicleOwnership;
    public String vehicleYear;
    public Integer numberOfSpeedViolations;
    public Integer numberOfDUIViolations;
    public Integer numberOfPastAccidents;

    public void mapInsurance(Insurance insurance) {
        this.id = insurance.id;
        this.policyType = insurance.policyType;
        this.insuredPerson = insurance.insuredPerson;
        this.validFrom = insurance.validFrom;
        this.validUntil = insurance.validUntil;
        this.vehicleRegistrationNumber = insurance.vehicleRegistrationNumber;
        this.vehicleType = insurance.vehicleType;
        this.mileage = insurance.mileage;
        this.drivingExperience = insurance.drivingExperience;
        this.vehicleOwnership = insurance.vehicleOwnership;
        this.vehicleYear = insurance.vehicleYear;
        this.numberOfSpeedViolations = insurance.numberOfSpeedViolations;
        this.numberOfDUIViolations = insurance.numberOfDUIViolations;
        this.numberOfPastAccidents = insurance.numberOfPastAccidents;
    }
}
