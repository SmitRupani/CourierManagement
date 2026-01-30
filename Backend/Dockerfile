# Build stage
FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /application

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw clean package -DskipTests

RUN java -Djarmode=layertools -jar target/*.jar extract

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /application

COPY --from=builder /application/dependencies/ ./
COPY --from=builder /application/spring-boot-loader/ ./
COPY --from=builder /application/snapshot-dependencies/ ./
COPY --from=builder /application/application/ ./

RUN addgroup -S courier && adduser -S courier -G courier

EXPOSE 8080

ENTRYPOINT [ "java", "org.springframework.boot.loader.launch.JarLauncher" ]
