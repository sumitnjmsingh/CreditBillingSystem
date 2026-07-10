FROM sumitnjmsingh/play25-builder:1.0 AS builder

WORKDIR /app

COPY build.sbt .
COPY project ./project

RUN sbt update

COPY . .

RUN sbt clean stage

FROM eclipse-temurin:8-jdk

WORKDIR /app

COPY --from=builder /app/target/universal/stage ./stage

COPY ./opentelemetry-javaagent.jar ./opentelemetry-javaagent.jar

EXPOSE 9000

#CMD ["sh","-c","rm -f ./stage/RUNNING_PID && ./stage/bin/play-demo"]

CMD ["sh","-c","rm -f ./stage/RUNNING_PID && JAVA_OPTS=\"-javaagent:/app/opentelemetry-javaagent.jar\" ./stage/bin/play-demo"]