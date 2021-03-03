package it.vige.vota.rooms.jpa;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({ @NamedQuery(name = "findAllRooms", query = "from RoomEntity"),
		@NamedQuery(name = "findRoomByIncome", query = "select r from RoomEntity as r where "
				+ "r.id.income = :income order by r.id.income asc") })
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
