package it.vige.vota.rooms.rest;

import static it.vige.vota.rooms.rest.RoomsRestResource.checkRealmAdmin;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.created;
import static javax.ws.rs.core.Response.noContent;
import static org.keycloak.services.ErrorResponse.exists;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.keycloak.models.KeycloakSession;
import org.keycloak.services.managers.AuthenticationManager.AuthResult;

import it.vige.vota.rooms.Vota;
import it.vige.vota.rooms.spi.RoomsService;

public class VotaResource {

	private final KeycloakSession session;
	private final AuthResult auth;

	public VotaResource(KeycloakSession session, AuthResult auth) {
		this.session = session;
		this.auth = auth;
	}

	@GET
	@Path("")
	@NoCache
	@Produces(APPLICATION_JSON)
	public List<Vota> findVotas(@QueryParam("search") String search,
            @QueryParam("first") Integer firstResult,
            @QueryParam("max") Integer maxResults,
            @QueryParam("briefRepresentation") Boolean briefRepresentation) {
		return session.getProvider(RoomsService.class).findVotas(search, firstResult, maxResults, briefRepresentation);
	}

	@POST
	@Path("")
	@NoCache
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	public Response createVota(final Vota vota) {
		try {
			checkRealmAdmin(auth);
			if (vota.getId() == null)
				vota.setId(generateId(vota.getDescription()));
			Vota createdVota = session.getProvider(RoomsService.class).createVota(vota);

			if (session.getTransactionManager().isActive()) {
				session.getTransactionManager().commit();
			}
			return created(session.getContext().getUri().getAbsolutePathBuilder().path(createdVota.getId()).build())
					.build();
		} catch (Exception ex) {
			if (session.getTransactionManager().isActive()) {
				session.getTransactionManager().setRollbackOnly();
			}
			return exists("Could not create user");
		}
	}

	/**
	 * Update the vota
	 *
	 * @param vota the vota to update
	 * @return the rest response
	 */
	@PUT
	@Path("{vota.id}")
	@NoCache
	@Consumes(APPLICATION_JSON)
	public Response updateVota(final Vota vota) {

		try {
			checkRealmAdmin(auth);

			session.getProvider(RoomsService.class).updateVota(vota);

			if (session.getTransactionManager().isActive()) {
				session.getTransactionManager().commit();
			}
			return noContent().build();
		} catch (Exception me) { // JPA
			return exists("Could not update vota!");
		}
	}

	@DELETE
	@Path("{vota}")
	@NoCache
	public Response removeVota(@PathParam("vota") final String votaId) {
		checkRealmAdmin(auth);
		Vota vota = new Vota();
		vota.setId(votaId);
		session.getProvider(RoomsService.class).removeVota(vota);
		return created(session.getContext().getUri().getAbsolutePathBuilder().path(vota.getId()).build()).build();
	}

	@GET
	@NoCache
	@Path("{vota}")
	@Produces(APPLICATION_JSON)
	public Vota findVotaById(@PathParam("vota") final String vota) {
		return session.getProvider(RoomsService.class).findVotaById(vota);
	}
	
	private String generateId(String description) {
		return description.replaceAll("[-+.^ :,']","").toLowerCase();
	}

}