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

FROM ${docker.keycloak.groupId}/${docker.keycloak.image.name}:${keycloak.version}

ENV KEYCLOAK_ADMIN ${docker.keycloak.user}
ENV KEYCLOAK_ADMIN_PASSWORD ${docker.keycloak.password}
ENV JAVA_OPTS -server -Xms64m -Xmx512m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m -Djava.net.preferIPv4Stack=true -Djava.awt.headless=true ${docker.keycloak.debug}

COPY /realm-config ${docker.keycloak.volume.external.realm-config}
COPY ${docker.keycloak.volume.internal.theme} ${docker.keycloak.volume.external.theme}
COPY ${docker.keycloak.volume.internal.admin-ui} ${docker.keycloak.volume.external.admin-ui}

EXPOSE ${docker.keycloak.port.internal}
EXPOSE ${docker.keycloak.port.debug.internal}

CMD ["${docker.keycloak.run.cmd.arg.1}", "${docker.keycloak.run.cmd.arg.2}"]
