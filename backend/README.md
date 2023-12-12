```
 
,-----. ,--.,--.           ,--.            ,--.                   ,--.                  ,---.  ,------. ,--.
|  |) /_|  |`--',--,--,  ,-|  |,-----.     |  | ,---. ,---. ,---. `--',--,--,  ,---.   /  O  \ |  .--. '|  |
|  .-.  \  |,--.|      \' .-. |'-----',--. |  || .-. | .-. | .-. |,--.|      \| .-. | |  .-.  ||  '--' ||  |
|  '--' /  ||  ||  ||  |\ `-' |       |  '-'  /' '-' ' '-' ' '-' '|  ||  ||  |' '-' ' |  | |  ||  | --' |  |
`------'`--'`--'`--''--' `---'         `-----'  `---'.`-  /.`-  / `--'`--''--'.`-  /  `--' `--'`--'     `--'
                                                     `---' `---'              `---'
```

### Quick start
**Stelle sicher, dass du Maven und Java 1.7 oder höher installiert hast**

```bash
# Installiere das Repo mit Maven
mvn install

# Starte den Server
mvn spring-boot:run

# Die App läuft auf Port 8080
# Es gibt zwei integrierte Benutzerkonten, um die unterschiedlichen Zugriffsebenen auf die Endpunkte zu demonstrieren:
# - User - bruno.baumann@blind-jogging.ch:123
# - Admin - justin.bauer@blind-jogging.ch:123
```

### Run with docker

```
docker-compose up --build -d
```


### File Structure
```
backend/
 ├──src/                                                        * our source files
 │   ├──main
 │   │   ├──java.com.justinbauer
 │   │   │   ├──config
 │   │   │   │   └──WebSecurityConfig.java                      * config file for filter, custom userSerivce etc.
 │   │   │   ├──model
 │   │   │   │   ├──Authority.java
 │   │   │   │   ├──UserTokenState.java                         * JWT model
 │   │   │   │   └──User.java                                   * our main User model.
 │   │   │   ├──repository                                      * repositories folder for accessing database
 │   │   │   │   └──UserRepository.java
 │   │   │   ├──rest                                            * rest endpoint folder
 │   │   │   │   ├──AuthenticationController.java               * auth related REST controller, refresh token endpoint etc.
 │   │   │   │   └──UserController.java                         * REST controller to handle User related requests
 │   │   │   ├──security                                        * Security related folder(JWT, filters)
 │   │   │   │   ├──auth
 │   │   │   │   │   ├──JwtAuthenticationRequest.java           * login request object, contains username and password
 │   │   │   │   │   ├──RestAuthenticationEntryPoint.java       * handle auth exceptions, like invalid token etc.
 │   │   │   │   │   ├──TokenAuthenticationFilter.java          * the JWT token filter, configured in WebSecurityConfig
 │   │   │   │   │   └──TokenBasedAuthentication.java           * this is our custom Authentication class and it extends AbstractAuthenticationToken.
 │   │   │   │   └──TokenHelper.java                             * token helper class
 │   │   │   ├──service
 │   │   │   │   ├──impl
 │   │   │   │   │   ├──CustomUserDetailsService.java           * custom UserDatilsService implementataion, tells formLogin() where to check username/password
 │   │   │   │   │   └──UserServiceImpl.java
 │   │   │   │   └──UserService.java
 │   │   │   └──Application.java                                * Application main enterance
 │   │   └──recources
 │   │       ├──application.yml                                 * application variables are configured here
 │   │       └──import.sql                                      * h2 database query(table creation)
 │   └──test                                                    * Junit test folder
 └──pom.xml                                                     * what maven uses to manage it's dependencies
```
### Konfiguration
- **WebSecurityConfig.java**: Die serverseitigen Authentifizierungskonfigurationen.
- **application.yml**: Eigenschaften auf Anwendungsebene, z. B. die Gültigkeitsdauer des Tokens, das Token-Geheimnis usw. Eine Referenz aller Anwendungseigenschaften finden Sie [hier](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).
- **JWT Token TTL**: JWT-Tokens sind so konfiguriert, dass sie nach 10 Minuten ablaufen. Sie können ein neues Token erhalten, indem Sie sich erneut anmelden.
- **Verwendung einer anderen Datenbank**: Dieses Starterkit verwendet eine eingebettete H2-Datenbank, die automatisch von Spring Boot konfiguriert wird. Wenn Sie sich mit einer anderen Datenbank verbinden wollen, müssen Sie die Verbindung in der *application.yml* im Ressourcenverzeichnis angeben. Hier ist ein Beispiel für eine MySQL DB:
```
spring:
  jpa:
    hibernate:
      # possible values: validate | update | create | create-drop
      ddl-auto: create-drop
  datasource:
    url: jdbc:mysql://localhost/myDatabase
    username: myUser
    password: myPassword
    driver-class-name: com.mysql.jdbc.Driver
```

*Hinweis: Bei anderen Datenbanken wie MySQL funktionieren Sequenzen nicht für die ID-Generierung. Sie müssen also den GenerationType in den Entity Beans auf 'AUTO' oder 'IDENTITY' ändern.*


