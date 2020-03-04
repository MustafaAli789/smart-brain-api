BEGIN TRANSACTION;

CREATE TABLE login (
    id serial primary key,
    hash varchar(100) not null,
    email text UNIQUE not NULL
);

COMMIT;