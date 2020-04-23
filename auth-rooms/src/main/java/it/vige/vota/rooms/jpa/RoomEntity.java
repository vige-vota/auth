package it.vige.vota.rooms.jpa;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({ @NamedQuery(name = "findAllRooms", query = "from RoomEntity"),
		@NamedQuery(name = "findRoomsByVota", query = "select r from RoomEntity as r where "
				+ "r.id.vota.id = :vota " + "order by r.id.vota.id asc"),
		@NamedQuery(name = "findRoomByClazzSectionAndVota", query = "select r from RoomEntity as r where "
				+ "r.id.clazz = :clazz and r.id.section = :section and r.id.vota.id = :vota "
				+ "order by r.id.vota.id asc") })
@Entity
@Table
public class RoomEntity {

	@EmbeddedId
	private RoomId id;

	public RoomId getId() {
		return id;
	}

	public void setId(RoomId id) {
		this.id = id;
	}

}
