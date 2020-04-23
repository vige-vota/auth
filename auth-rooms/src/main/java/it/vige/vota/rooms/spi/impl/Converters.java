package it.vige.vota.rooms.spi.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import it.vige.vota.rooms.Room;
import it.vige.vota.rooms.Vota;
import it.vige.vota.rooms.jpa.RoomEntity;
import it.vige.vota.rooms.jpa.RoomId;
import it.vige.vota.rooms.jpa.VotaEntity;

public interface Converters {

	Function<RoomEntity, Room> RoomEntityToRoom = new Function<RoomEntity, Room>() {

		public Room apply(RoomEntity t) {
			Room room = new Room();
			room.setClazz(t.getId().getClazz());
			room.setSection(t.getId().getSection());
			Vota vota = new Vota();
			vota.setId(t.getId().getVota().getId());
			vota.setDescription(t.getId().getVota().getDescription());
			room.setVota(vota);

			return room;
		}
	};

	Function<Room, RoomEntity> RoomToRoomEntity = new Function<Room, RoomEntity>() {

		public RoomEntity apply(Room t) {
			RoomEntity roomEntity = new RoomEntity();
			RoomId roomId = new RoomId();
			roomId.setClazz(t.getClazz());
			roomId.setSection(t.getSection());
			roomId.setVota(VotaToVotaEntity.apply(t.getVota()));
			roomEntity.setId(roomId);

			return roomEntity;
		}
	};

	Function<VotaEntity, Vota> VotaEntityToVota = new Function<VotaEntity, Vota>() {

		public Vota apply(VotaEntity t) {
			Vota vota = new Vota();
			vota.setId(t.getId());
			vota.setDescription(t.getDescription());
			Map<String, List<String>> rooms = vota.getRooms();
			for (RoomEntity room : t.getRooms()) {
				List<String> classes = vota.getRooms().get(room.getId().getSection() + "");
				if (classes == null)
					classes = new ArrayList<String>();
				classes.add(room.getId().getClazz() + "");
				rooms.put(room.getId().getSection() + "", classes);
			}

			return vota;
		}
	};

	Function<Vota, VotaEntity> VotaToVotaEntity = new Function<Vota, VotaEntity>() {

		public VotaEntity apply(Vota t) {
			VotaEntity votaEntity = new VotaEntity();
			votaEntity.setId(t.getId());
			votaEntity.setDescription(t.getDescription());

			return votaEntity;
		}
	};
}