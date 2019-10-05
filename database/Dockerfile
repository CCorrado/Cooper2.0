FROM openjdk:8-jdk

COPY . /database
WORKDIR /database

RUN ["./gradlew", "build"]
RUN mv ./build/libs/database-0.0.1.jar app.jar

EXPOSE 8080

RUN sh -c "ls -al"
CMD java -jar app.jar
