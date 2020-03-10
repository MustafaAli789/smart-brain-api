
BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY key,
    name VARCHAR(100),
    age VARCHAR(100) DEFAULT '',
    pet VARCHAR(100) DEFAULT '',
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

COMMIT;