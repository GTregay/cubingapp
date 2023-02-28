CREATE TABLE "solves" (
  "id" serial PRIMARY KEY NOT NULL,
  "uid" integer NOT NULL,
  "timestamp" timestamp NOT NULL DEFAULT NOW(),
  "time" numeric,
  "initial_cube_state" json,
  "moves" json
);

-- change training_algs to alg_sets
CREATE TABLE "alg_sets" (
  "id" serial PRIMARY KEY NOT NULL,
  "uid" integer NOT NULL,
  "set" varchar(255) NOT NULL,
  "training_algs" json,
  "cube" varchar(255),
  "inactive_stickers" integer[],
  "moves" varchar(255),
  "disregard" integer[],
  "only_orientation" integer[],
  unique ("uid", "set")
);

CREATE TABLE "users" (
  "uid" serial PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL
);
