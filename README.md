Auth
=============
Authenticator and Role Manager.
This project is aimed to manage Keycloak extensions using a fully Maven lifecycle.

It covers all the following features:

- Import voting users.
- Browsing users.

This draft version has been tested on WildFly 24.0.1.Final.

Requirements
------------

- JDK 15
- Maven 3.8.x
- NPM 8.0.0


Build
-----

In development mode:
```
    mvn install -Pdevelopment
    mvn package -Pdevelopment,prepare-keycloak
```
In production mode:
```
    mvn install -Pproduction
    mvn package -Pproduction,prepare-keycloak
```
If you want to start the WildFly prepared instance and execute the application in the development mode:
```
    mvn install -Pdevelopment,runtime-keycloak
```
If you want to start the WildFly prepared instance and execute the application in the production mode, here a sample:
```
    mvn install -Pproduction,runtime-keycloak -Dcitiesgenerator.url=https://cities-generator-service.vige.it:8743  -Dvotingpapers.url=https://vota-votingpapers.vige.it:8543 -Dvoting.url=https://vota-voting.vige.it:8443 -Dhistory.url=https://vota-history.vige.it:8643 -Dfrontend.url=https://localhost
```
Where citiesgenerator.url, votingpapers.url, voting.url, history.url, frontend.url are the host names of the clients shown in the below guide.
In a production environment you could move a different ssl certificate and keys. Use this command to generate it:
```
keytool -genkey -alias server -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore ./target/keycloak-run/wildfly-24.0.1.Final/standalone/configuration/application.keystore -validity 3650 -dname "CN=vota-auth.vige.it, OU=Vige, O=Vige, L=Rome, S=Italy, C=IT" -storepass password
```
If you start with the developer profile you must not specify the host names because the default host name localhost is used. If you don't declare the url variables in the mode production, the default will be localhost.
To create new users in WildFly:

$JBOSS_HOME/bin/add_user.sh

    What type of user do you wish to add? 
     a) Management User (mgmt-users.properties) 
     b) Application User (application-users.properties)
    (a): b

Enter the details of the new user to add.
Realm (ApplicationRealm) : 
Username : user2
Password : password2
Re-enter Password : password2
What roles do you want this user to belong to? (Please enter a comma separated list, or leave blank for none) : users
The username 'admin' is easy to guess
Are you sure you want to add user 'admin' yes/no? yes

Docker image
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
Both the executions will run using localhost as host connection name. If you need to specify a different host, for example if you are in a remote cloud, you must specify the hosts for keycloak and the vota app so:
```
    docker run -p 8843:8843 -e CITIESGENERATOR_URL=${citiesgenerator.url} -e VOTINGPAPERS_URL=${votingpapers.url} -e VOTING_URL=${voting.url} -e HISTORY_URL=${history.url} -e FRONTEND_URL=${frontend.url} -e REPORT_URL=${report.url} -d --name vota-auth vige/vota-auth
```
Here a sample how fill the variables:
```
    docker run -p 8480:8480 -e CITIESGENERATOR_URL=http://cities-generator-service.vige.it:8380 -e VOTINGPAPERS_URL=http://vota-votingpapers.vige.it:8180 -e VOTING_URL=http://vota-voting.vige.it:8080 -e HISTORY_URL=http://vota-history.vige.it:8280 -e FRONTEND_URL=http://vota-frontend.vige.it -e REPORT_URL=http://vota-report.vige.it -d --name vota-auth vige/vota-auth
```
If you need a different language by the english you can set the i18 variable. A sample to start the docker container with a italian language:
```
    docker run -p 8480:8480 -e LC_ALL=it_IT.UTF-8 -e CITIESGENERATOR_URL=${citiesgenerator.url} -e VOTINGPAPERS_URL=${votingpapers.url} -e VOTING_URL=${voting.url} -e HISTORY_URL=${history.url} -e FRONTEND_URL=${frontend.url} -e REPORT_URL=${report.url} -d --name vota-auth vige/vota-auth
```
If you want to configure, add votes, classes and new users or approve users connect to: http://localhost:8480/auth/admin/vota-domain/console with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with root/gtn