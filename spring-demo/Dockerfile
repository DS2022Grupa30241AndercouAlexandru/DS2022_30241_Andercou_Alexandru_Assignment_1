FROM maven:3.6.3-jdk-11 AS builder

COPY ./src/ /root/src
COPY ./pom.xml /root/
COPY ./checkstyle.xml /root/
WORKDIR /root



RUN mvn package
RUN java -Djarmode=layertools -jar /root/target/ds-2022-0.0.1-SNAPSHOT.jar list
RUN java -Djarmode=layertools -jar /root/target/ds-2022-0.0.1-SNAPSHOT.jar extract
RUN ls -l /root

FROM openjdk:11-jre

ENV TZ=UTC
ENV DB_IP=localhost
ENV DB_PORT=5431
ENV DB_USER=postgres
ENV DB_PASSWORD=1234
ENV DB_DBNAME=energy-db


COPY --from=builder /root/dependencies/ ./
COPY --from=builder /root/snapshot-dependencies/ ./


COPY --from=builder /root/spring-boot-loader/ ./
COPY --from=builder /root/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]










