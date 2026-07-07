FROM eclipse-temurin:8-jdk

COPY target/universal/stage ./stage

EXPOSE 9000

CMD rm -f ./stage/RUNNING_PID && ./stage/bin/play-demo