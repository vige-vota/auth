/******************************************************************************
 * Vige, Home of Professional Open Source Copyright 2010, Vige, and           *
 * individual contributors by the @authors tag. See the copyright.txt in the  *
 * distribution for a full listing of individual contributors.                *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may    *
 * not use this file except in compliance with the License. You may obtain    *
 * a copy of the License at http://www.apache.org/licenses/LICENSE-2.0        *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 ******************************************************************************/
package it.vige.vota.resttest.rooms.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.keycloak.common.VerificationException;

import com.mashape.unirest.http.Headers;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import it.vige.vota.RestCaller;
import it.vige.vota.rooms.Room;

public class RoomsTest extends RestCaller {

	private final static String url_rooms = "http://localhost:8180/auth/realms/vota-domain/rooms/rooms";
	private final static String url_auth = "http://localhost:8180/auth/realms/vota-domain/protocol/openid-connect/auth?response_type=code&client_id=vota&callback_uri=http://localhost:8080/vota";
	private final static String url_authenticate = "http://localhost:8180/auth/realms/vota-domain/login-actions/authenticate?session_code=";
	private final static String url_token = "http://localhost:8180/auth/realms/vota-domain/protocol/openid-connect/token";

	private static String authorization = null;

	@Test
	public void setRoom() throws IOException, VerificationException, UnirestException {
		Response response = get(null, url_rooms, null);
		List<Room> rooms = response.readEntity(new GenericType<List<Room>>() {
		});
		assertEquals(111, rooms.size(), "The query finds all 111 rooms ");

		Room room = new Room();
		room.setIncome(new ArrayList<Integer>());

		authenticate();

		response = post(authorization, url_rooms, room);
		InputStream addedRoom = (InputStream) response.getEntity();
		assertNotNull(addedRoom, "The room was inserted");
		response.close();

		response = get(null, url_rooms + "/myvota", null);
		rooms = response.readEntity(new GenericType<List<Room>>() {
		});
		assertEquals(1, rooms.size(), "The room is found");
		response.close();

		response = delete(authorization, url_rooms + "/" + "6", null);
		InputStream deletedRoom = (InputStream) response.getEntity();
		assertNotNull(deletedRoom, "The room was deleted");
		response.close();
	}

	public void authenticate() throws IOException, VerificationException, UnirestException {

		if (authorization == null) {
			String page = Unirest.get(url_auth).asString().getBody();
			String sessionCode = page.split("&amp;")[6].substring(page.split("&amp;")[6].indexOf("session_code=") + 13);
			String execution = page.split("&amp;")[2].substring(10);
			String tabId = page.split("&amp;")[1].substring(7);

			Headers headers = Unirest.post(
					url_authenticate + sessionCode + "&execution=" + execution + "&client_id=vota&tab_id=" + tabId)
					.field("username", "root").field("password", "gtn").asString().getHeaders();
			String location = headers.get("Location").get(0);
			String code = location.split("&")[1].substring(5);

			JsonNode jsonResponse = Unirest.post(url_token).field("client_id", "vota")
					.field("grant_type", "authorization_code").field("username", "root").field("password", "gtn")
					.field("client_secret", "bce5816d-98c4-404f-a18d-bcc5cb005c79")
					.field("callback_url", "http://localhost:8080/vota")
					.field("auth_url", "http://localhost:8180/auth/realms/vota-domain/protocol/openid-connect/auth")
					.field("code", code).asJson().getBody();
			JSONObject mapToken = (JSONObject) jsonResponse.getArray().get(0);
			String accessToken = mapToken.getString("access_token");

			authorization = accessToken;
		}

	}
}