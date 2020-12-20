-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "headline" TEXT,
    "username" TEXT NOT NULL,
    "links" TEXT,
    "bio" TEXT,
    "profileWeight" REAL NOT NULL DEFAULT 0,
    "location" TEXT,
    "timezone" TEXT,
    "isVerified" BOOLEAN NOT NULL,
    "generatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recommendations" INTEGER DEFAULT 0,
    "code" TEXT NOT NULL,
    "skillWeight" REAL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "skillId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME,
    "role" TEXT NOT NULL,
    "location" TEXT,
    "isRemote" BOOLEAN NOT NULL,
    "companyId" INTEGER NOT NULL,
    "personId" INTEGER,

    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person.phone_unique" ON "Person"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Person.username_unique" ON "Person"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Skills.code_unique" ON "Skills"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Skill.name_unique" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Experience.code_unique" ON "Experience"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Interest.code_unique" ON "Interest"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Company.name_unique" ON "Company"("name");
