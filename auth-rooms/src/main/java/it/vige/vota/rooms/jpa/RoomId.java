package it.vige.vota.rooms.jpa;

import static javax.persistence.FetchType.LAZY;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class RoomId implements Serializable {

	private static final long serialVersionUID = -3002711450547460105L;

	private int clazz;

	private char section;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "VOTA_ID")
	private VotaEntity vota;

	public int getClazz() {
		return clazz;
	}

	public void setClazz(int clazz) {
		this.clazz = clazz;
	}

	public char getSection() {
		return section;
	}

	public void setSection(char section) {
		this.section = section;
	}

	public VotaEntity getVota() {
		return vota;
	}

	public void setVota(VotaEntity vota) {
		this.vota = vota;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + clazz;
		result = prime * result + ((vota.getId() == null) ? 0 : vota.getId().hashCode());
		result = prime * result + section;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RoomId other = (RoomId) obj;
		if (clazz != other.clazz)
			return false;
		if (vota.getId() == null) {
			if (other.vota.getId() != null)
				return false;
		} else if (!vota.getId().equals(other.vota.getId()))
			return false;
		if (section != other.section)
			return false;
		return true;
	}
}
