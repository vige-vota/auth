package it.vige.vota.rooms.jpa;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class RoomId implements Serializable {

	private static final long serialVersionUID = -3002711450547460105L;

	private Integer income;

	public Integer getIncome() {
		return income;
	}

	public void setIncome(Integer income) {
		this.income = income;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((income == null) ? 0 : income.hashCode());
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
		if (income == null) {
			if (other.income != null)
				return false;
		} else if (!income.equals(other.income))
			return false;
		return true;
	}
}
