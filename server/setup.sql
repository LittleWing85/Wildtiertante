CREATE TABLE litters (
    id_litter SERIAL PRIMARY KEY,
    species VARCHAR(255) NOT NULL,
    arrival DATE NOT NULL,
    amount INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);