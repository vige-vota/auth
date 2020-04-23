package it.vige.vota.rooms;

import java.io.Serializable;

public class Room implements Serializable {

	private static final long serialVersionUID = 5714119820308270263L;

	private int clazz;

	private char section;
	
	private Vota vota;

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

	public Vota getVota() {
		return vota;
	}

	public void setVota(Vota vota) {
		this.vota = vota;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + clazz;
		result = prime * result + ((vota == null) ? 0 : vota.hashCode());
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
		Room other = (Room) obj;
		if (clazz != other.clazz)
			return false;
		if (vota == null) {
			if (other.vota != null)
				return false;
		} else if (!vota.equals(other.vota))
			return false;
		if (section != other.section)
			return false;
		return true;
	}

}
