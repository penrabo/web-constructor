CREATE DATABASE constructor;

\c constructor;

CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    structure JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);