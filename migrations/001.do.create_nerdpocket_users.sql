DROP TABLE IF EXISTS user_notecards;
DROP TABLE IF EXISTS pocket_users;


CREATE TABLE pocket_users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_name TEXT NOT NULL,
  password TEXT NOT NULL,
  UNIQUE(user_name)
);

CREATE TABLE user_notecards (
  id SERIAL,
  user_id INTEGER REFERENCES pocket_users(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE user_notes (
  id SERIAL,
  user_id INTEGER REFERENCES pocket_users(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);