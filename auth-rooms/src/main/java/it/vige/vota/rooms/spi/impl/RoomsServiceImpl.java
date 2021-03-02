package it.vige.vota.rooms.spi.impl;

import static java.util.stream.Collectors.toList;

import java.util.List;

import javax.persistence.EntityManager;

import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;

import it.vige.vota.rooms.Room;
import it.vige.vota.rooms.jpa.RoomEntity;
import it.vige.vota.rooms.spi.RoomsService;

public class RoomsServiceImpl implements RoomsService, Converters {

	private final KeycloakSession session;

	public RoomsServiceImpl(KeycloakSession session) {
		this.session = session;
		if (getRealm() == null) {
			throw new IllegalStateException("The service cannot accept a session without a realm in its context.");
		}
	}

	private EntityManager getEntityManager() {
		return session.getProvider(JpaConnectionProvider.class).getEntityManager();
	}

	protected RealmModel getRealm() {
		return session.getContext().getRealm();
	}

	@Override
	public List<Room> findAllRooms() {
		List<RoomEntity> roomEntities = getEntityManager().createNamedQuery("findAllRooms", RoomEntity.class)
				.getResultList();
		return roomEntities.stream().map(t -> RoomEntityToRoom.apply(t)).collect(toList());
	}

	@Override
	public Room createRoom(Room room) {
		RoomEntity entity = RoomToRoomEntity.apply(room);
		getEntityManager().persist(entity);

		return RoomEntityToRoom.apply(entity);
	}

	@Override
	public void removeRoom(Room room) {
		EntityManager em = getEntityManager();
		RoomEntity entity = em.createNamedQuery("findRoomByClazzSectionAndVota", RoomEntity.class)
				.setParameter("income", room.getIncome()).getSingleResult();
		em.remove(entity);
	}

	public void close() {
		// Nothing to do.
	}

}
