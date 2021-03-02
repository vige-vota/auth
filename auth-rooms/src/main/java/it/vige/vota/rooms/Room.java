package it.vige.vota.rooms;

import java.io.Serializable;
import java.util.List;

public class Room implements Serializable {

	private static final long serialVersionUID = 5714119820308270263L;

	private List<Integer> income;

	public List<Integer> getIncome() {
		return income;
	}

	public void setIncome(List<Integer> income) {
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
		Room other = (Room) obj;
		if (income == null) {
			if (other.income != null)
				return false;
		} else if (!income.equals(other.income))
			return false;
		return true;
	}

}
