/*
  Warnings:

  - You are about to alter the column `preferredGigCompensationAmount` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "picture" TEXT NOT NULL,
    "headline" TEXT,
    "username" TEXT NOT NULL,
    "links" TEXT,
    "bio" TEXT,
    "profileWeight" REAL NOT NULL DEFAULT 0,
    "location" TEXT,
    "timezone" TEXT,
    "isVerified" BOOLEAN NOT NULL,
    "fullyFetched" BOOLEAN DEFAULT true,
    "generatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preferredJobCompensationCurrency" TEXT,
    "preferredJobCompensationAmount" INTEGER,
    "preferredJobCompensationCycle" TEXT,
    "preferredGigCompensationCurrency" TEXT,
    "preferredGigCompensationAmount" INTEGER,
    "preferredGigCompensationCycle" TEXT,
    "isOpenToInterships" BOOLEAN,
    "isOpenToMentoring" BOOLEAN,
    "isOpenToGigs" BOOLEAN,
    "isOpenToJobs" BOOLEAN
);
INSERT INTO "new_Person" ("id", "name", "phone", "picture", "headline", "username", "links", "bio", "profileWeight", "location", "timezone", "isVerified", "fullyFetched", "generatedAt", "updatedAt", "createdAt", "preferredJobCompensationCurrency", "preferredJobCompensationAmount", "preferredJobCompensationCycle", "preferredGigCompensationCurrency", "preferredGigCompensationAmount", "preferredGigCompensationCycle", "isOpenToInterships", "isOpenToMentoring", "isOpenToGigs", "isOpenToJobs") SELECT "id", "name", "phone", "picture", "headline", "username", "links", "bio", "profileWeight", "location", "timezone", "isVerified", "fullyFetched", "generatedAt", "updatedAt", "createdAt", "preferredJobCompensationCurrency", "preferredJobCompensationAmount", "preferredJobCompensationCycle", "preferredGigCompensationCurrency", "preferredGigCompensationAmount", "preferredGigCompensationCycle", "isOpenToInterships", "isOpenToMentoring", "isOpenToGigs", "isOpenToJobs" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person.username_unique" ON "Person"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
