package it.vige.vota.rooms.spi.impl;

import java.util.function.Function;

import it.vige.vota.rooms.Room;
import it.vige.vota.rooms.jpa.RoomEntity;
import it.vige.vota.rooms.jpa.RoomId;

public interface Converters {

	Function<RoomEntity, Room> RoomEntityToRoom = new Function<RoomEntity, Room>() {

		public Room apply(RoomEntity t) {
			Room room = new Room();
			room.setIncome(t.getId().getIncome());

			return room;
		}
	};

	Function<Room, RoomEntity> RoomToRoomEntity = new Function<Room, RoomEntity>() {

		public RoomEntity apply(Room t) {
			RoomEntity roomEntity = new RoomEntity();
			RoomId roomId = new RoomId();
			roomId.setIncome(t.getIncome());
			roomEntity.setId(roomId);

			return roomEntity;
		}
	};
}