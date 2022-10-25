package com.example.resource;

import com.example.entity.Insurance;
import com.example.service.InsuranceService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/insurance")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class InsuranceResource {

    @Inject
    InsuranceService insuranceService;

    @GET
    public Response getInsurances() {
        return Response.ok(insuranceService.getAllInsurances()).build();
    }

    @GET
    @Path("/{id}")
    public Response getInsurance(@PathParam("id") Long id) {
        return Response.ok(insuranceService.getInsurance(id)).build();
    }

    @POST
    public Response createInsurance(Insurance insurance) {
        insuranceService.createInsurance(insurance);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateInsurance(@PathParam("id") Long id, Insurance insurance) {
        insuranceService.updateInsurance(id, insurance);
        return Response.ok().build();
    }

    @PUT
    @Path("/cancel/{id}")
    public Response cancelInsurance(@PathParam("id") Long id) {
        insuranceService.cancelInsurance(id);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteInsurance(@PathParam("id") Long id) {
        insuranceService.deleteInsurance(id);
        return Response.ok().build();
    }

   @GET
   @Path("/insuredPerson/{id}")
   public Response getAllByInsuredPerson(@PathParam("id") Long id) {
        return Response.ok(insuranceService.getAllByInsuredPerson(id)).build();
   }

   @GET
   @Path("/vehicleRegistrationNumber/{vehicleRegistrationNumber}")
   public Response getAllByVehicleRegistrationNumber(@PathParam("vehicleRegistrationNumber") String vehicleRegistrationNumber) {
        return Response.ok(insuranceService.getAllByVehicleRegistrationNumber(vehicleRegistrationNumber)).build();
   }

    @GET
    @Path("/insuredPerson/active/{id}")
    public Response getActiveByInsuredPerson(@PathParam("id") Long id) {
        return Response.ok(insuranceService.getActiveByInsuredPerson(id)).build();
    }

    @GET
    @Path("/vehicleRegistrationNumber/active/{regNumber}")
    public Response getActiveByVehicleRegistrationNumber(@PathParam("regNumber") String regNumber) {
        return Response.ok(insuranceService.getActiveByVehicleRegistrationNumber(regNumber)).build();
    }

}
