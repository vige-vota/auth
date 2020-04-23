package it.vige.vota.rooms.spi.impl;

import static java.lang.Integer.parseInt;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;

import it.vige.vota.rooms.Room;
import it.vige.vota.rooms.Vota;
import it.vige.vota.rooms.jpa.RoomEntity;
import it.vige.vota.rooms.jpa.VotaEntity;
import it.vige.vota.rooms.spi.RoomsService;

public class RoomsServiceImpl implements RoomsService, Converters {

	private final KeycloakSession session;
	private static final String SEARCH_ID_PARAMETER = "id:";

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
	public List<Vota> findVotas(String search, Integer firstResult, Integer maxResults,
			Boolean briefRepresentation) {
		EntityManager em = getEntityManager();
		TypedQuery<VotaEntity> query = null;
		if (search != null) {
			if (search.startsWith(SEARCH_ID_PARAMETER)) {
				Vota vota = findVotaById(search.substring(SEARCH_ID_PARAMETER.length()).trim());
				if (vota != null) {
					return asList(vota);
				}
			} else {
				query = em.createNamedQuery("findVotas", VotaEntity.class);
				query.setFirstResult(firstResult);
				query.setMaxResults(maxResults);
				query.setParameter("id", search);
				query.setParameter("description", search);
			}
		} else {
			query = em.createNamedQuery("findAllVotas", VotaEntity.class);
			if (firstResult != null)
				query.setFirstResult(firstResult);
			if (maxResults != null)
				query.setMaxResults(maxResults);
		}
		List<VotaEntity> votaEntities = query.getResultList();
		return votaEntities.stream().map(t -> VotaEntityToVota.apply(t)).collect(toList());
	}

	@Override
	public Vota findVotaById(String vota) {
		VotaEntity entity = getEntityManager().find(VotaEntity.class, vota);
		return VotaEntityToVota.apply(entity);
	}

	@Override
	public List<Room> findRoomsByVota(String vota) {
		List<RoomEntity> roomEntities = getEntityManager().createNamedQuery("findRoomsByVota", RoomEntity.class)
				.setParameter("vota", vota).getResultList();

		return roomEntities.stream().map(t -> RoomEntityToRoom.apply(t)).collect(toList());
	}

	@Override
	public Room createRoom(Room room) {
		RoomEntity entity = RoomToRoomEntity.apply(room);
		getEntityManager().persist(entity);

		return RoomEntityToRoom.apply(entity);
	}

	@Override
	public Vota createVota(Vota vota) {
		VotaEntity entity = VotaToVotaEntity.apply(vota);
		getEntityManager().persist(entity);

		return VotaEntityToVota.apply(entity);
	}

	@Override
	public Vota updateVota(Vota vota) {
		VotaEntity entity = getEntityManager().find(VotaEntity.class, vota.getId());
		entity.setDescription(vota.getDescription());
		Map<String, List<String>> rooms = vota.getRooms();
		entity.getRooms().forEach(x -> {
			getEntityManager().remove(x);
		});
		entity.getRooms().clear();
		for (String section : rooms.keySet()) {
			List<String> classes = rooms.get(section);
			for (String clazz : classes) {
				Room room = new Room();
				room.setSection(section.charAt(0));
				room.setClazz(parseInt(clazz));
				room.setVota(vota);
				RoomEntity roomEntity = RoomToRoomEntity.apply(room);
				getEntityManager().persist(roomEntity);
				entity.getRooms().add(roomEntity);
			}
		}

		return VotaEntityToVota.apply(entity);
	}

	@Override
	public void removeRoom(Room room) {
		EntityManager em = getEntityManager();
		RoomEntity entity = em.createNamedQuery("findRoomByClazzSectionAndVota", RoomEntity.class)
				.setParameter("vota", room.getVota().getId()).setParameter("clazz", room.getClazz())
				.setParameter("section", room.getSection()).getSingleResult();
		em.remove(entity);
	}

	@Override
	public void removeVota(Vota vota) {
		EntityManager em = getEntityManager();
		VotaEntity entity = em.find(VotaEntity.class, vota.getId());
		em.remove(entity);
	}

	public void close() {
		// Nothing to do.
	}

}
