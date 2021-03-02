package it.vige.vota.rooms.rest;

import static it.vige.vota.Constants.ADMIN_ROLE;

import javax.ws.rs.ForbiddenException;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Path;

import org.keycloak.models.KeycloakSession;
import org.keycloak.services.managers.AppAuthManager;
import org.keycloak.services.managers.AuthenticationManager.AuthResult;

public class RoomsRestResource {

	private final KeycloakSession session;
	private final AuthResult auth;

	public RoomsRestResource(KeycloakSession session) {
		this.session = session;
		this.auth = new AppAuthManager().authenticateIdentityCookie(session, session.getContext().getRealm());
	}

	@Path("rooms")
	public RoomResource getRoomResource() {
		return new RoomResource(session, auth);
	}

	public static void checkRealmAdmin(AuthResult auth) {
		if (auth == null) {
			throw new NotAuthorizedException("Bearer");
		} else if (auth.getUser().getGroupsStream() == null
				|| auth.getUser().getGroupsStream().filter(x -> x.getName().equals(ADMIN_ROLE)).count() == 0) {
			throw new ForbiddenException("Does not have realm admin role");
		}
	}

}
