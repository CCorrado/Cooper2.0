Mr. Cooper Database Package
------------------------------
## Getting Started
The Cooper backend database is built in Spring/Boot/Hibernate. In order to build this locally, you must have the Java runtime environment.

### Building Locally
- Note: A local MySQL database instance is required for running this database instance locally. 
    - Configure the `.env` file appropriate to your configuration.
- Build the database package:
    - In this directory, run:
        - `./gradlew build`
        - `java -jar build/libs/database-0.0.1.jar`
        
The database will be available according to your configuration. 
* By default, navigate to `http://localhost:80` in the browser, or use a tool such as postman to test the routes available 
in the `controllers` package
