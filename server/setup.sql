DROP TABLE IF EXISTS feedings;
DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS litters;

CREATE TABLE litters (
    litter_id SERIAL PRIMARY KEY,
    species VARCHAR(255) NOT NULL,
    arrival DATE NOT NULL,
    feedings TIME[],
    notes TEXT,
    litterCreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE individuals (
    individual_id SERIAL PRIMARY KEY,
    idAssociatedLitter INT REFERENCES litters(litter_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    sex VARCHAR(255) NOT NULL
);

CREATE TABLE feedings (
    feeding_id SERIAL PRIMARY KEY,
    idAssociatedLitter INT REFERENCES litters(litter_id) NOT NULL,
    amountMilk VARCHAR(255) NOT NULL,
    feedingSlot TIME,
    feedingCreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Squirrels', NOW(), ARRAY [TIME '10:00', TIME '20:00'], '');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (1, '2-4ml', '10:00');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Rabbits', NOW(), ARRAY [TIME '11:00', TIME '21:00'],'Very shy!');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Mice', NOW(), ARRAY [TIME '6:00', TIME '12:00',  TIME '22:00'], 'Not too much!');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (3, '0,2-0,8ml', '06:00');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (3, '0,2-0,6ml', '22:00');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Deer', NOW(), ARRAY [TIME '6:00', TIME '12:00',  TIME '22:00'], 'Not too much!');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (4, '0,2-0,6ml', '12:00');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Hedhehogs', NOW(), ARRAY [TIME '6:00', TIME '12:00',  TIME '22:00'], 'Not too much!');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (5, '0,2-0,8ml', '06:00');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (5, '0,2-0,6ml', '22:00');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Bambies', NOW(), ARRAY [TIME '10:00', TIME '20:00'], '');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (6, '2-4ml', '10:00');

INSERT INTO litters (species, arrival, feedings, notes)
VALUES ('Foxes', NOW(), ARRAY [TIME '6:00', TIME '12:00',  TIME '22:00'], 'Not too much!');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (7, '0,2-0,8ml', '06:00');
INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
VALUES (7, '0,2-0,6ml', '22:00');

