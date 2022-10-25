package com.example.service;

import com.example.entity.InsuredPerson;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@ApplicationScoped
@Transactional
public class InsuredPersonService {
    public List<InsuredPerson> getAllInsuredPersons() {
        return InsuredPerson.listAll();
    }

    public InsuredPerson getInsuredPerson(Long id) {
        return InsuredPerson.findById(id);
    }

    public void createInsuredPerson(InsuredPerson insuredPerson) {
        insuredPerson.age = calculateAgeInterval(insuredPerson.dateOfBirth);
        insuredPerson.persist();
    }

    public String calculateAgeInterval(LocalDate dateOfBirth) {
        String ageInterval = "";
        LocalDate today = LocalDate.now();
        Period period = Period.between(dateOfBirth, today.plusDays(1));

        if (period.getYears() >= 16 && period.getYears() <= 25) {
            ageInterval = "16-25";
        } else if (period.getYears() >= 26 && period.getYears() <= 39) {
            ageInterval = "26-39";
        } else if (period.getYears() >= 40 && period.getYears() <= 64) {
            ageInterval = "40-64";
        } else if (period.getYears() >= 65) {
            ageInterval = "65";
        }

        return ageInterval;
    }

    public void updateInsuredPerson(Long id, InsuredPerson insuredPerson) {
        InsuredPerson entity = InsuredPerson.findById(id);
        entity.mapInsuredPerson(insuredPerson);
    }

    public void deleteInsuredPerson(Long id) {
        InsuredPerson.deleteById(id);
    }

    public void notifyInsuredPerson(Long id, String message) {
        
    }

}
