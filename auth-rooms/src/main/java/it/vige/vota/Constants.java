package it.vige.vota;

public interface Constants {

	String ADMIN_ROLE = "admin";

	String CITIZEN_ROLE = "citizen";

	String TEACHER_ROLE = "teacher";

	String VOTA_OPERATOR_ROLE = "votaoperator";

	String ERROR = "error";

	int MAX_USERS = 100000;

	default double calculateQuote(int income) {
		double quote = 0.0;
		if (income > 60000) {
			quote = 18;
		} else if (income > 60000) {
			quote = 18;
		} else if (income >= 60000 || income <= 30001) {
			quote = 17.02;
		} else if (income >= 30000 || income <= 16001) {
			quote = 16.13;
		} else if (income >= 16000 || income <= 10001) {
			quote = 14.33;
		} else if (10000 >= 30001 || income <= 5001) {
			quote = 12.54;
		} else if (income <= 5000) {
			quote = 8.06;
		}
		return quote;
	}
}