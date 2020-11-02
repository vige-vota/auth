Auth
=============
Authenticator and Role Manager.
This project is aimed to manage Keycloak extensions using a fully Maven lifecycle.

It covers all the following features:

- Import voting users.
- Browsing users.

This draft version has been tested on WildFly 20.0.1.Final.

Requirements
------------

- JDK 15
- Maven 3.6.x


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
    mvn install -Pproduction,runtime-keycloak -Dvotingpapers.url=https://vota-votingpapers.vige.it:8543 -Dvoting.url=https://vota-voting.vige.it:8443 -Dhistory.url=https://vota-history.vige.it:8643
```
Where votingpapers.url, voting.url, history.url are the host names of the clients shown in the below guide.
In a production environment you could move a different ssl certificate and keys. Use this command to generate it:
```
keytool -genkey -alias server -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore ./target/keycloak-run/wildfly-20.0.1.Final/standalone/configuration/application.keystore -validity 3650 -dname "CN=vota-auth.vige.it, OU=Vige, O=Vige, L=Rome, S=Italy, C=IT" -storepass password
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

to test the rest api with junit:
```
    deploy the rest api in a server
    mvn -Prest-keycloak-test test
```
To debug the application using Eclipse you can put this parameter:
```
    mvn -Dmaven.surefire.debug test
```
It will start on the 5005 port.

The tests are done using Chrome 84.0.4147.135 (64-bit) on WildFly 20.0.1.Final

Docker image
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
Both the executions will run using localhost as host connection name. If you need to specify a different host, for example if you are in a remote cloud, you must specify the hosts for keycloak and the vota app so:
```
    docker run -p 8843:8843 -e VOTINGPAPERS_URL=${votingpapers.url} -e VOTING_URL=${voting.url} -e HISTORY_URL=${history.url} -d --name vota-auth vige/vota-auth
```
If you need a different language by the english you can set the i18 variable. A sample to start the docker container with a italian language:
```
    docker run -p 8843:8843 -e LC_ALL=it_IT.UTF-8 -e VOTING_URL=${voting.url} -e VOTINGPAPERS_URL=${votingpapers.url} -e HISTORY_URL=${history.url} -d --name vota-auth vige/vota-auth
```
If you want to configure, add votes, classes and new users or approve users connect to: http://localhost:8180/auth with root/gtn in the keycloak webapp.
If you want connect in the keycloak webapp as superuser connect to it with admin/admin