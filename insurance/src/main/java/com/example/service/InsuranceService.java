package com.example.service;

import com.example.entity.Insurance;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class InsuranceService {

    public List<Insurance> getAllInsurances() {
        return Insurance.listAll();
    }

    public Insurance getInsurance(Long id) {
        return Insurance.findById(id);
    }

    public void createInsurance(Insurance insurance) {
        insurance.validFrom = LocalDate.now();
        insurance.vehicleOwnership = insurance.vehicleOwnership != null && insurance.vehicleOwnership;
        insurance.persist();
    }

    public void updateInsurance(Long id, Insurance insurance) {
        Insurance entity = Insurance.findById(id);
        insurance.vehicleOwnership = insurance.vehicleOwnership != null && insurance.vehicleOwnership;
        entity.mapInsurance(insurance);
    }

    public void cancelInsurance(Long id) {
        Insurance entity = Insurance.findById(id);
        entity.validUntil = LocalDate.now();
    }

    public void deleteInsurance(Long id) {
        Insurance.deleteById(id);
    }

    public List<Insurance> getAllByInsuredPerson(Long insuredPersonId) {
        return Insurance.list("insuredPerson", insuredPersonId);
    }

    public List<Insurance> getAllByVehicleRegistrationNumber(String vehicleRegistrationNumber) {
        return Insurance.list("vehicleRegistrationNumber", vehicleRegistrationNumber);
    }

    public List<Insurance> getActiveByInsuredPerson(Long insuredPersonId) {
        List<Insurance> insurances = Insurance.list("insuredPerson", insuredPersonId);
        return insurances.stream().filter(insurance -> insurance.validUntil == null).collect(Collectors.toList());
    }

    public Optional<Insurance> getActiveByVehicleRegistrationNumber(String vehicleRegistrationNumber) {
        List<Insurance> insurances = Insurance.list("vehicleRegistrationNumber", vehicleRegistrationNumber);
        return insurances.stream().filter(insurance -> insurance.validUntil == null).findFirst();
    }

}
