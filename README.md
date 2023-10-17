# Library API Example

<p> Basic API for a library management application. Intended as a example. </p>
  

### Technologies Used

* NodeJS as development environment,
* Express.Js as freamework,
* PostgreSQL as Relational Database,
* Express-validator as validator library,
* TypeORM as ORM library
  
<br>

> Quick Note: Do not forget to install dependecies.  
Use **`npm install`** command. 

<br>

> Database was used in a container and the example connection settings are provided, change them according to your database configuration in [db.controller.ts](/src/db/db.controller.ts).

<br>

Database creation script can be found in [HERE](/DDL.sql).

### Routes  

* `/` : Base route for check server connectivity.  

* `/users` : User operations base route. Has GET and POST methods.
    * Get provides all users.   
    * Post is for creating ``User``. Does require body for name of the ``User``

<br>

* `/users/userId` : User specific operations. Has GET method, provides User data with the given id.

* `/books` : Book operations base route. Has GET and POST methods. 

    * Get provides all books.
    * Post is for creating a ``Book``. Does require a body for name of the ``Book``.

<br>

* `/books/:bookId` : Book specific operations. Has GET method, provides Book data with the given id.

* `/users/:userid/borrow/:bookId` : Book borrowing route for given userID. Does ***not*** require a body.

* `/users/:userId/return/:bookId` : Book returning route for given userID. Does require a body for rating(score) the book.
