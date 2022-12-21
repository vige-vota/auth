Auth
=============
Authenticator and Role Manager.
This project is aimed to manage Keycloak extensions using a fully Maven lifecycle.

It covers all the following features:

- Import voting users.
- Browsing users.

This draft version has been tested on Quarkus 24.0.1.Final.

Requirements
------------

- JDK 19
- Maven 3.8.x
- NPM 8.0.0


Build
-----

In development mode:
```
    mvn install -Pdevelopment -Dcitiesgenerator.url=http://cities-generator-service.vige.it:8380  -Dvotingpapers.url=http://vota-votingpapers.vige.it:8180 -Dvoting.url=http://vota-voting.vige.it:8080 -Dhistory.url=http://vota-history.vige.it:8280 -Dfrontend.url=http://vota-frontend.vige.it:3000
```
In production mode, here a sample:
```
    mvn install -Pproduction -Dcitiesgenerator.url=https://cities-generator-service.vige.it:8743  -Dvotingpapers.url=https://vota-votingpapers.vige.it:8543 -Dvoting.url=https://vota-voting.vige.it:8443 -Dhistory.url=https://vota-history.vige.it:8643 -Dfrontend.url=https://vota-frontend.vige.it
```
Where citiesgenerator.url, votingpapers.url, voting.url, history.url, frontend.url are the host names of the clients shown in the below guide.
In a production environment you could move a different ssl certificate and keys. Use this command to generate it:
```
keytool -genkey -alias server -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore ./target/keycloak-run/wildfly-24.0.1.Final/standalone/configuration/application.keystore -validity 3650 -dname "CN=vota-auth.vige.it, OU=Vige, O=Vige, L=Rome, S=Italy, C=IT" -storepass password
```
If you start with the developer profile you must not specify the host names because the default host name localhost is used. If you don't declare the url variables in the mode production, the default will be localhost.

Docker develop image
------------

To install the docker image run the command:
```
    docker pull vige/vota-auth
```
To run the image run the command:
```
    docker run -p 8480:8480 --name vota-auth vige/vota-auth
```
If you want start it in background mode:
```
    docker run -p 8480:8480 -d --name vota-auth vige/vota-auth
```
If you want to configure, add votes, classes and new users or approve users connect to: [http://localhost:8480/auth/admin/vota-domain/console](http://localhost:8480/auth/admin/vota-domain/console) with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with root/gtn

Docker production image
------------

To install the docker image run the command:
```
    docker pull vige/vota-auth
```
To run the image run the command:
```
    docker run -p 8843:8843 --name vota-auth vige/vota-auth
```
If you want start it in background mode:
```
    docker run -p 8843:8843 -d --name vota-auth vige/vota-auth
```
If you want to configure, add votes, classes and new users or approve users connect to: [https://localhost:8843/auth/admin/vota-domain/console](https://localhost:8843/auth/admin/vota-domain/console) with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with root/gtn
