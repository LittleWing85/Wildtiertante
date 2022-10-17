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
VALUES (1, 'Squirrels', NOW(), ARRAY [TIME '06:00', TIME '14:00', TIME '22:00'], '');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (1, '2-4ml', '14:00');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Rabbits', NOW(), ARRAY [TIME '06:00', TIME '14:00', TIME '22:00'],'Very shy, handle very carefully!');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Mice', NOW(), ARRAY [TIME '7:00', TIME '15:00',  TIME '23:00'], 'The smallest one seems to have a pain in his right leg. Show it to the vet tomorrow.');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (3, '0,2-0,8ml', '07:00');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (3, '0,2-0,6ml', '15:00');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Deer', NOW(), ARRAY [TIME '06:00', TIME '14:00', TIME '22:00'], '');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (4, '0,2-0,6ml', '14:00');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Hedhehogs', NOW(), ARRAY  [TIME '7:00', TIME '15:00',  TIME '23:00'], 'Were dehydrated, received an infusion');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (5, '0,2-0,8ml', '07:00');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (5, '0,2-0,6ml', '15:00');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Bambies', NOW(), ARRAY  [TIME '5:00', TIME '11:00', TIME '17:00', TIME '23:00'], '');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (6, '2-4ml', '11:00');

INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
VALUES (1, 'Foxes', NOW(), ARRAY [TIME '06:00', TIME '14:00', TIME '22:00'], 'The biggest one is very scared and will bite, take care when feeding!');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (7, '0,2-0,8ml', '06:00');
INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
VALUES (7, '0,2-0,6ml', '14:00');

