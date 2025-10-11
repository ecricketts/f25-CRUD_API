# f25-CRUD_API
### Version
1.0.0
## Link to Demo
- https://uncg-my.sharepoint.com/:v:/g/personal/ecricketts_uncg_edu/EYbE_Jwi5DZBv6SRGrUQdXEBqgp--89lEj8PzXfWlft5fA
## Installation
- Get the project
    - clone
        ```
      git clone https://github.com/csc340-uncg/f25-jpa-crud-api.git
        ```
    - OR download zip.
- Open the project in VS Code.
- This project is built to run with jdk 21.
- [Dependencies](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/7142cb123bc1444fb579ece9735062f1c3a15a86/pom.xml#L33) to JPA and Postgres in addition to the usual Spring Web. JPA handles the persistence, Postgresql is the database to be used.
- [`/src/main/resources/application.properties`](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/resources/application.properties) This file has the configuration for the PostgreSQL database to use for the API.
  - You MUST have the database up and running before running the project!
    - Login to your neon.tech account.
    - Locate your database project.
    - On the project dashboard, click on "Connect" and select Java.
    - Copy the connection string provided.
    - Paste it as a value for the property `spring.datasource.url`. No quotation marks.
- Build and run the main class. You should see a new table created in the Neon database.
## Notes
### Java - [Spring ORM with JPA and Hibernate](https://medium.com/@burakkocakeu/jpa-hibernate-and-spring-data-jpa-efa71feb82ac)
- We are using ORM (Object-Relational Mapping) to deal with databases. This is a technique that allows us to interact with a relational database using object-oriented programming principles.
- JPA (Jakarta Persistence, formerly Java Persistence API) is a specification that defines ORM standards in Java. It provides an abstraction layer for ORM frameworks to make concrete implementations.
- Hibernate: Hibernate is a popular ORM framework that implements JPA. It simplifies database operations by mapping Java objects to database tables and handling queries efficiently.
Spring ORM allows seamless integration of Hibernate and JPA, making database interactions more manageable and reducing boilerplate code.
### StudentX Java classes have different purposes: Separation of concerns!
- [Entity](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/Student.java#L9)
  - The Student class is annotated as an `@Entity `. This is used to map class attributes to database tables and SQL types.
  - We also annotated with `@Table` to give Hibernate directions to use this specific table name. This is optional but it helps with naming conventions.
  - Any Entity must have at least one attribute that is annotated as an `@Id`. In our case it's conveniently the `studentId` attribute.
    - We are also using an autogeneration strategy for the ID. This way we are not manually assigning IDs to our students. This is optional.
       - For this reason, we also added a constructor to make a Student without an ID.
  - An Entity must have a no-argument constructor.
- [Repository](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentRepository.java)
  - We are using an extension of the JPA Repository that comes with prebuilt database operations such as select all, select by id, select by any other reference, insert, delete, etc.
  - Annotate it as a `@Repository`.
  - We parametrize this using our object and its ID type.
    - `public interface StudentRepository extends JpaRepository<Student, Long>` => We want to apply the JPA repository operations on the `Student` type. The `Student` has an ID of type `long`.
  - If we need special database queries that are not the standard ones mentioned above, we can create [a method with a special purpose query](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentRepository.java#L17) as shown. This is an interface so no implementation body.
- [Service](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentService.java)
  - Annotated as a `@Service`.
  - It is the go-between from controller to database. In here we define what functions we need from the repository. A lot of the functions are default functions that our repository inherits from JPA (save, delete, findAll, findByX), some of them are custom made (getHonorsStudents, getStudentsByName).
  - It asks the repository to perform SQL queries.
  - The Repository class is [`@Autowired`](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentService.java#L15). This is for managing the dependency to the repository. Do not use a constructor to make a Repository object, you will get errors.
- [Rest Controller](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentController.java#L15)
  - Annotated as a `@RestController`.
  - It asks the Service class to perform data access functions.
  - The Service class is [`@Autowired`](https://github.com/csc340-uncg/f25-jpa-crud-api/blob/6b2860c4ad01ca46b6b62852ca966bfadc8dfc6a/src/main/java/com/csc340/crud_jpa_demo/student/StudentController.java#L18) here as well :)

## API Endpoints
Base URL: [`http://localhost:8080/animals`](http://localhost:8080/animals)


1. ### [`/`](http://localhost:8080/animals) (GET)
Gets a list of all Animals in the database.

#### Response - A JSON array of Animal objects.

 ```
[
  {
    "id": 1,
    "name": "Ein",
    "title": "Corgie",
    "description": "...",
  },
  {
    "id": 2,
    "name": "Luna",
    "title": "Cat",
    "description": "...,
  }
]
```

2. ### [`/{studentId}`](http://localhost:8080/animals/2) (GET)
Gets an individual Student in the system. Each animal is identified by a numeric `id`

#### Parameters
- Path Variable: `id` &lt;Long &gt; - REQUIRED

#### Response - A single Animal

```
  {
    "id": 2,
    "name": "Luna",
    "title": "Cat",
    "description": "...,
  }
```

3. ### [`/name`](http://localhost:8080/animals/search?name=jo) (GET)
Gets a list of animals with a name that contains the given string.

#### Parameters
- query parameter: `search` &lt; String &gt; - REQUIRED

#### Response - A JSON array of Animal objects.

```
[
    {
    "id": 2,
    "name": "Luna",
    "title": "Cat",
    "description": "...,
  }
]
```

4. ### [`/major/{major}`](http://localhost:8080/animals/category/Cat) (GET)
Gets a list of animals for a named major.

#### Parameters
- path variable: `category` &lt; String &gt; - REQUIRED

#### Response - A JSON array of Animal objects.

```
[
    {
    "id": 2,
    "name": "Luna",
    "title": "Cat",
    "description: "..."
  }
]
```

5. ### [`/`](http://localhost:8080/animals) (POST)
Create  a new Animal entry

#### Request Body
A Animal object. Note the object does not include an ID as this is autogenerated.
```
  {
    "name": "Kiba",
    "title": "Dog",
    "description: "..."
  }
```
#### Response - The newly created animal.

```
  {
    "id": "6",
    "name": "Kiba",
    "title": "Dog",
    "description: "..."
  }
```

6. ### [`/{studentId}`](http://localhost:8080/animals/6) (PUT)
Update an existing animal.

#### Parameters
- Path Variable: `id` &lt;integer&gt; - REQUIRED

#### Request Body
A Animal object with the updates.
```
  {
    "id": "6",
    "name": "Kiba",
    "title": " Ninja Dog",
    "description: "..."
  }
```
#### Response - the updated Animal object.
```
  {
    "id": "6",
    "name": "Kiba",
    "title": " Ninja Dog",
    "description: "..."
  }
```

7. ### [`/{id}`](http://localhost:8080/animals/6) (DELETE)
Delete an existing Animals.

#### Parameters
- Path Variable: `id` &lt;integer&gt; - REQUIRED

#### Response - the updated list of Animals.
```
[
  {
    "id": 1,
    "name": "Ein",
    "title": "Corgie",
    "description": "...",
  },
  {
    "id": 2,
    "name": "Luna",
    "title": "Cat",
    "description": "...,
  }
]
...
  }
]
```
