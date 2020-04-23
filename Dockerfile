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

FROM openjdk:13-jdk
EXPOSE 8000 8080 8180 9990 10090 8443 8543
RUN yum -y update && \
	yum -y install sudo wget openssh-server && \
    echo "wildfly ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    useradd -u 1000 -G users,wheel -d /home/wildfly --shell /bin/bash -m wildfly && \
    echo "wildfly:secret" | chpasswd && \
    yum -y update && \
    yum clean all

USER wildfly

ENV MAVEN_VERSION=3.6.3

RUN mkdir /home/wildfly/apache-maven-$MAVEN_VERSION && \
  	wget -qO- "http://apache.ip-connect.vn.ua/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz" | tar -zx --strip-components=1 -C /home/wildfly/apache-maven-$MAVEN_VERSION/
ENV TERM xterm
ENV KEYCLOAK_URL=localhost

WORKDIR /workspace
COPY / /workspace/auth
RUN sudo chown -R wildfly:wildfly /workspace
RUN cd auth && /home/wildfly/apache-maven-$MAVEN_VERSION/bin/mvn install -Pproduction
RUN cd auth && /home/wildfly/apache-maven-$MAVEN_VERSION/bin/mvn package -Pproduction,prepare-keycloak
RUN rm -Rf /home/wildfly/.m2 && \
	rm -Rf /home/wildfly/apache-maven-$MAVEN_VERSION && \
	sudo mv /workspace/auth/auth-keycloak/target/keycloak-run/wildfly* /opt/keycloak && \
	sudo chown -R wildfly:wildfly /opt/keycloak && \
	sudo echo "export JBOSS_OPTS=\"-b 0.0.0.0 -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/opt/keycloak/realm-config/execution -Dkeycloak.migration.strategy=IGNORE_EXISTING -Dkeycloak.profile.feature.upload_scripts=enabled\"" > /workspace/auth/keycloak && \
	sudo mv /workspace/auth/keycloak /etc/default/keycloak && \
	sudo cp /opt/keycloak/docs/contrib/scripts/init.d/wildfly-init-debian.sh /etc/init.d/keycloak && \
	rm -Rf /workspace/auth

CMD mkdir -p /opt/keycloak/realm-config/execution && \
	cp /opt/keycloak/realm-config/auth-domain-realm.json /opt/keycloak/realm-config/execution && \
	sed -i -e 's/MAVEN_REPLACER_VOTA_SERVER_URL/'"$VOTA_URL"'/g' /opt/keycloak/realm-config/execution/auth-domain-realm.json && \
	sudo service keycloak start && \
    tail -f /dev/null