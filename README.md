Auth
=============
Authenticator and Role Manager.
This project is aimed to manage Keycloak extensions using a fully Maven lifecycle.

It covers all the following features:

- Import voting users.
- Browsing users.

Requirements
------------

- JDK 20
- Maven 3.9.x
- NPM 9.6.x


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
keytool -genkey -alias server -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore ./auth-assembly/target/dockertmp/prod/cert/application.keystore -validity 3650 -dname "CN=vota-auth.vige.it, OU=Vige, O=Vige, L=Rome, S=Italy, C=IT" -storepass password
```

Docker develop image
------------

To install the docker image run the command:
```
    docker pull vige/vota-auth
```
To run the image run the command:
```
    docker run -p 8480:8480 -p 8400:8400 --name vota-auth vige/vota-auth:1.1.2
```
If you want start it in background mode:
```
    docker run -p 8480:8480 -p 8400:8400 -d --name vota-auth vige/vota-auth:1.1.2
```
If you want to configure, add votes, classes and new users or approve users connect to: [http://vota-auth.vige.it:8480/admin/vota-domain/console](http://vota-auth.vige.it:8480/admin/vota-domain/console) with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with root/gtn

Docker production image
------------

To install the docker image run the command:
```
    docker pull vige/vota-auth
```
To run the image run the command:
```
    docker run -p 8843:8843 --name vota-auth vige/vota-auth:1.1.2
```
If you want start it in background mode:
```
    docker run -p 8843:8843 -d --name vota-auth vige/vota-auth:1.1.2
```
If you want to configure, add votes, classes and new users or approve users connect to: [https://vota-auth.vige.it:8843/admin/vota-domain/console](https://vota-auth.vige.it:8843/admin/vota-domain/console) with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with root/gtn
