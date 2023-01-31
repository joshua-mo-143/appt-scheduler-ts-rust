CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    meeting_date VARCHAR,
    start_time VARCHAR NOT NULL,
    finish_time VARCHAR NOT NULL,
    contact_email VARCHAR NOT NULL
);