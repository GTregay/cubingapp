CREATE TABLE "alg_sets" (
    "id" serial PRIMARY KEY NOT NULL,
    "uid" integer NOT NULL,
    "set" varchar NOT NULL,
    "training_algs" json NOT NULL,
    "deleted" timestamp,
    "updated" timestamp NOT NULL,
    "name" varchar NOT NULL DEFAULT "set",
);

CREATE TABLE "sessions" (
    "id" serial PRIMARY KEY NOT NULL,
    "uid" integer NOT NULL,
    "name" varchar NOT NULL,
    "updated" timestamp NOT NULL,
    "deleted" timestamp
);

CREATE TABLE "solves" (
    "id" serial PRIMARY KEY NOT NULL,
    "uid" integer NOT NULL,
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    "time" numeric NOT NULL,
    "scramble" varchar NOT NULL,
    "moves" varchar NOT NULL,
    "puzzle" varchar NOT NULL,
    "session_id" integer NOT NULL,
    "penalty" varchar NOT NULL DEFAULT ''
);

CREATE TABLE "users" (
    "uid" serial PRIMARY KEY NOT NULL,
    "email" varchar NOT NULL,
    "created" timestamp NOT NULL DEFAULT NOW()
);