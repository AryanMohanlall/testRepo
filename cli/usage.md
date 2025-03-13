# MP10 Command Line Interface

## Login

In order to access your databases and perform CRUD operations using the MP10-CLI, you will first need to login using the `login` command.

After executing the command you will be prompted to enter your username and password.

If your login is successful, a `login successful` message will be displayed and other commands will be available to use.

```
mpdb > login
Username: exampleUser
Password: *****
Logged in successfully!
mpdb >
```

## Viewing Databases

To view all your databases, you can use the `list` command.

## Changing Current Database

To change the currently selected database, you can use

```
target <db>
```

where `<db>` is the name of the database you would like to select.

## Deleting Databases

To delete a database, you can use

```
remove <db>
```

where `<db>` is the currently selected database.

## CRUD Operations

Most CRUD operations are executed running SQL-like syntax, though of course as this is a collection based documents, differ slightly

### Inserting

MP10-CLI supports inserting one

```
INSERT INTO <collection_name>
<document>
```

It also imports inserting many

```
INSERT INTO <collection_name>
{
  <document1>,
  <document2>,
  <document3>,
  ...
}
```

### Selecting

The following syntax is used to read data from your database:

```
SELECT [<field1>, <field2>, ...] FROM <collection> WHERE <condition>
```

Note that the WHERE clause is optional.

### Updating

The following syntax is used to update data from your database:

```
UPDATE <collection>
SET <field1> = <value1>, <field2> = <value2>, ...
WHERE <condition>
```

Note that the WHERE clause is optional.

### Deleting

The following syntax is used to update data from your database:

```
DELETE FROM <collection> WHERE condition
```

Note that the WHERE clause is optional.
