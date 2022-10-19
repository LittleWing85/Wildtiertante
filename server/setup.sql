DROP TABLE IF EXISTS feedings;
DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS litters;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE litters (
    litter_id SERIAL PRIMARY KEY,
    id_associated_user INTEGER NOT NULL,
    species VARCHAR(255) NOT NULL,
    arrival DATE NOT NULL,
    feedings TIME[],
    notes TEXT,
    litterCreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE individuals (
    individual_id SERIAL PRIMARY KEY,
    id_associated_litter INT REFERENCES litters(litter_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    sex VARCHAR(255) NOT NULL
);

CREATE TABLE feedings (
    feeding_id SERIAL PRIMARY KEY,
    id_associated_litter INT REFERENCES litters(litter_id) NOT NULL,
    amountMilk VARCHAR(255) NOT NULL,
    feedingSlot TIME,
    feedingCreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Squirrels', NOW(), ARRAY [TIME '02:00', TIME '04:00', TIME '23:00'], '');


INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Rabbits', NOW(), ARRAY [TIME '01:00', TIME '05:00', TIME '23:30'],'Very shy, handle very carefully!');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Mice', NOW(), ARRAY [TIME '00:30', TIME '07:00',  TIME '22:00'], 'The smallest one seems to have a pain in his right leg. Show it to the vet tomorrow.');
