DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
  );

INSERT INTO pups (name, breed, age, sex) VALUES('Tyler', 'Shih-tzu', 7, 'male');
INSERT INTO pups (name, breed, age, sex) VALUES('Sarah', 'Black Lab', 2, 'female');

-- <psql -f puppies.sql> is what you run to create this database
