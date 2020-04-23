package it.vige.vota.rooms.spi;

import java.util.List;

import org.keycloak.provider.Provider;

import it.vige.vota.rooms.Room;
import it.vige.vota.rooms.Vota;

public interface RoomsService extends Provider {

	List<Room> findAllRooms();

	List<Vota> findVotas(String search, Integer firstResult, Integer maxResults, Boolean briefRepresentation);

	Vota findVotaById(String vota);

	List<Room> findRoomsByVota(String vota);

	Room createRoom(Room room);

	Vota createVota(Vota vota);

	Vota updateVota(Vota vota);

	void removeRoom(Room room);

	void removeVota(Vota vota);
}
