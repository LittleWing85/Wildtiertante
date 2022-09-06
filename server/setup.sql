DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS litters;

CREATE TABLE litters (
    id_litter SERIAL PRIMARY KEY,
    species VARCHAR(255) NOT NULL,
    arrival DATE NOT NULL,
    amount INTEGER NOT NULL,
    feedings INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE individuals (
    id_individual SERIAL PRIMARY KEY,
    id_ofLitter INT REFERENCES litters(id_litter) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    sex VARCHAR(255) NOT NULL
);