package com.example.resource;

import com.example.entity.InsuredPerson;
import com.example.service.InsuredPersonService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/insuredPerson")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class InsuredPersonResource {
    @Inject
    InsuredPersonService insuredPersonService;

    @GET
    public Response getInsuredPersons() {
        return Response.ok(insuredPersonService.getAllInsuredPersons()).build();
    }

    @GET
    @Path("/{id}")
    public Response getInsuredPerson(@PathParam("id") Long id) {
        return Response.ok(insuredPersonService.getInsuredPerson(id)).build();
    }

    @POST
    public Response createInsuredPerson(InsuredPerson insuredPerson) {
        insuredPersonService.createInsuredPerson(insuredPerson);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateInsuredPerson(@PathParam("id") Long id, InsuredPerson insuredPerson) {
        insuredPersonService.updateInsuredPerson(id, insuredPerson);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteInsuredPerson(@PathParam("id") Long id) {
        insuredPersonService.deleteInsuredPerson(id);
        return Response.ok().build();
    }
}
