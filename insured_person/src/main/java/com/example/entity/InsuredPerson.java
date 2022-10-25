package com.example.entity;

import com.example.dataholder.Gender;
import com.example.dataholder.MaritalStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@JsonInclude
public class InsuredPerson extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    public String fullName;
    public String email;
    public Gender gender;
    public LocalDate dateOfBirth;
    public String age;
    public MaritalStatus maritalStatus;
    public Integer numberOfChildren;
    public String incomeLevel;
    public String education;

    public void mapInsuredPerson(InsuredPerson insuredPerson) {
        this.id = insuredPerson.id;
        this.fullName = insuredPerson.fullName;
        this.email = insuredPerson.email;
        this.gender = insuredPerson.gender;
        this.dateOfBirth = insuredPerson.dateOfBirth;
        this.age = insuredPerson.age;
        this.maritalStatus = insuredPerson.maritalStatus;
        this.numberOfChildren = insuredPerson.numberOfChildren;
        this.incomeLevel = insuredPerson.incomeLevel;
        this.education = insuredPerson.education;
    }
}
