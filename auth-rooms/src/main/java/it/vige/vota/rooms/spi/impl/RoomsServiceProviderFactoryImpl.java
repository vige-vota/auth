package it.vige.vota.rooms.spi.impl;

import org.keycloak.Config.Scope;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

import it.vige.vota.rooms.spi.RoomsService;
import it.vige.vota.rooms.spi.RoomsServiceProviderFactory;

public class RoomsServiceProviderFactoryImpl implements RoomsServiceProviderFactory {

	@Override
	public RoomsService create(KeycloakSession session) {
		return new RoomsServiceImpl(session);
	}

	@Override
	public void init(Scope config) {

	}

	@Override
	public void postInit(KeycloakSessionFactory factory) {
	}

	@Override
	public void close() {

	}

	@Override
	public String getId() {
		return "roomsServiceImpl";
	}

}
