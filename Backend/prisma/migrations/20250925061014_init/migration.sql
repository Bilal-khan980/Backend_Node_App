-- CreateTable
CREATE TABLE "public"."events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "location" VARCHAR(60) NOT NULL,
    "date" DATE,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
