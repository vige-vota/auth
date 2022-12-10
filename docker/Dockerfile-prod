# Vige, Home of Professional Open Source Copyright 2010, Vige, and           
# individual contributors by the @authors tag. See the copyright.txt in the  
# distribution for a full listing of individual contributors.                
# Licensed under the Apache License, Version 2.0 (the "License"); you may    
# not use this file except in compliance with the License. You may obtain    
# a copy of the License at http://www.apache.org/licenses/LICENSE-2.0        
# Unless required by applicable law or agreed to in writing, software        
# distributed under the License is distributed on an "AS IS" BASIS,          
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   
# See the License for the specific language governing permissions and        
# limitations under the License.

FROM arm64v8/eclipse-temurin:19-jdk
EXPOSE 8843
RUN adduser --uid 1000 --ingroup adm --home /home/wildfly --shell /bin/bash wildfly && \
    echo "wildfly:secret" | chpasswd

USER root

ENV MAVEN_VERSION=3.8.6
ENV NODE_VERSION=16.11.1

RUN mkdir /home/wildfly/apache-maven-$MAVEN_VERSION && \
  	curl https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$MAVEN_VERSION/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xvz -C /home/wildfly && \
  	curl https://nodejs.org/download/release/v$NODE_VERSION/node-v$NODE_VERSION-linux-arm64.tar.gz | tar xvz -C /home/wildfly
ENV TERM xterm
ENV CITIESGENERATOR_URL=https://cities-generator-service.vige.it:8743
ENV VOTINGPAPERS_URL=https://vota-votingpapers.vige.it:8543
ENV VOTING_URL=https://vota-voting.vige.it:8443
ENV HISTORY_URL=https://vota-history.vige.it:8643
ENV FRONTEND_URL=https://vota-frontend.vige.it
ENV REPORT_URL=https://vota-report.vige.it

WORKDIR /workspace
COPY / /workspace/auth
RUN chown -R wildfly:adm /workspace
RUN export NPM_HOME=/home/wildfly/node-v$NODE_VERSION-linux-arm64 && export PATH=$NPM_HOME/bin:$PATH && cd auth && /home/wildfly/apache-maven-$MAVEN_VERSION/bin/mvn clean install -Pproduction,prepare-keycloak
RUN rm -Rf /home/wildfly/.m2 && \
	rm -Rf /home/wildfly/apache-maven-$MAVEN_VERSION && \
	rm -Rf /home/wildfly/node-v$NODE_VERSION-linux-arm64 && \
	mv /workspace/auth/target/keycloak-run/wildfly* /opt/keycloak && \
	chown -R wildfly:adm /opt/keycloak && \
	rm -Rf /workspace/auth
	
USER wildfly

CMD mv /opt/keycloak/standalone/configuration/standalone_xml_history/current /opt/keycloak/standalone/configuration/standalone_xml_history/current.bak && \
	mv /opt/keycloak/standalone/configuration/standalone_xml_history/current.bak /opt/keycloak/standalone/configuration/standalone_xml_history/current && \
	mkdir -p /opt/keycloak/realm-config/execution && \
	cp /opt/keycloak/realm-config/vota-domain-realm.json /opt/keycloak/realm-config/execution && \
	sed -i -e 's@MAVEN_REPLACER_CITIESGENERATOR_SERVER_URL@'"$CITIESGENERATOR_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	sed -i -e 's@MAVEN_REPLACER_VOTINGPAPERS_SERVER_URL@'"$VOTINGPAPERS_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	sed -i -e 's@MAVEN_REPLACER_VOTING_SERVER_URL@'"$VOTING_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	sed -i -e 's@MAVEN_REPLACER_HISTORY_SERVER_URL@'"$HISTORY_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	sed -i -e 's@MAVEN_REPLACER_FRONTEND_SERVER_URL@'"$FRONTEND_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	sed -i -e 's@MAVEN_REPLACER_REPORT_SERVER_URL@'"$REPORT_URL"'@g' /opt/keycloak/realm-config/execution/vota-domain-realm.json && \
	java -D[Standalone] -Xms64m -Xmx512m -Djava.net.preferIPv4Stack=true -Djava.awt.headless=true -Djboss.modules.system.pkgs=org.jboss.byteman --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-exports=jdk.unsupported/sun.reflect=ALL-UNNAMED --add-exports=jdk.unsupported/sun.misc=ALL-UNNAMED --add-modules=java.se --add-exports=java.desktop/sun.awt=ALL-UNNAMED --add-exports=java.naming/com.sun.jndi.ldap=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.lang.invoke=ALL-UNNAMED --add-opens=java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.security=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.management/javax.management=ALL-UNNAMED --add-opens=java.naming/javax.naming=ALL-UNNAMED --add-modules=java.se -Djboss.home.dir=/opt/keycloak -Djboss.server.base.dir=/opt/keycloak/standalone -Djboss.server.log.dir=/opt/keycloak/standalone/log -Djboss.server.config.dir=/opt/keycloak/standalone/configuration -Dorg.jboss.boot.log.file=/opt/keycloak/standalone/log/server.log -Dlogging.configuration=file:/opt/keycloak/standalone/configuration/logging.properties -jar /opt/keycloak/jboss-modules.jar -mp /opt/keycloak/modules org.jboss.as.standalone -b=0.0.0.0 -Djboss.socket.binding.port-offset=400 -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/opt/keycloak/realm-config/execution -Dkeycloak.migration.strategy=OVERWRITE_EXISTING -Dkeycloak.profile.feature.upload_scripts=enabled