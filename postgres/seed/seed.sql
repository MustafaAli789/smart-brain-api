BEGIN TRANSACTION;

INSERT into users (name, email, age, pet, entries, joined ) values (
    'Mustafa Ali', 'alimustafa0987@gmail.com', '20', 'cat', 0, '2020-03-03'
);
INSERT into login (hash, email) values (
    '$2a$10$WQVbIBFyWFI1YgDSLZqjwOEmSbKnJPTB5jJq15d5jNqOSf.Kjffve',
    'alimustafa0987@gmail.com'
);

COMMIT;