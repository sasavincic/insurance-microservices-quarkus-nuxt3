package com.example.resource;

import com.example.entity.Claim;
import com.example.entity.ClaimState;
import com.example.service.ClaimService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/claim")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ClaimResource {

    @Inject
    ClaimService claimService;

    @GET
    public Response getClaims() {
        return Response.ok(claimService.getAllClaims()).build();
    }

    @GET
    @Path("/{id}")
    public Response getClaim(@PathParam("id") Long id) {
        return Response.ok(claimService.getClaim(id)).build();
    }

    @GET
    @Path("insuredPerson/{id}")
    public Response getAllByInsuredPerson(@PathParam("id") Long id) {
        return Response.ok(claimService.getByInsuredPerson(id)).build();
    }

    @POST
    public Response createClaim(Claim claim) {
        claimService.createClaim(claim);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateClaim(@PathParam("id") Long id, Claim claim) {
        claimService.updateClaim(id, claim);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteClaim(@PathParam("id") Long id) {
        claimService.deleteClaim(id);
        return Response.ok().build();
    }

    @PUT
    @Path("/approve/{id}")
    public Response approveClaim(@PathParam("id") Long id) {
        claimService.changeClaimState(id, ClaimState.APPROVED);
        return Response.ok().build();
    }

    @PUT
    @Path("/reject/{id}")
    public Response rejectClaim(@PathParam("id") Long id) {
        claimService.changeClaimState(id, ClaimState.REJECTED);
        return Response.ok().build();
    }

    @GET
    @Path("/claimState/{id}")
    public Response getClaimState(@PathParam("id") Long id) {
        claimService.getClaimState(id);
        return Response.ok().build();
    }

}
