-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "timezone" VARCHAR(60) NOT NULL DEFAULT 'Asia/Karachi',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
