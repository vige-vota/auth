package it.vige.vota.rooms.spi;

import java.util.List;

import org.keycloak.provider.Provider;

import it.vige.vota.rooms.Room;

public interface RoomsService extends Provider {

	List<Room> findAllRooms();

	Room createRoom(Room room);

	void removeRoom(Room room);
}
