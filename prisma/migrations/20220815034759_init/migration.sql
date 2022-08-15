-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "profileImg" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
