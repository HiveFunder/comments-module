CREATE TABLE orders (
  _id serial NOT NULL PRIMARY KEY,
  author TEXT,
  comments jsonb NOT NULL
);
