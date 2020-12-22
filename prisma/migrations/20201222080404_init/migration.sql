-- CreateTable
CREATE TABLE "Person" (
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
    "name" TEXT NOT NULL,
    "opportunityId" INTEGER,

    FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "category" TEXT,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME,
    "role" TEXT NOT NULL,
    "location" TEXT,
    "responsibilities" TEXT,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "companyId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "logo" TEXT
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isReviewed" BOOLEAN NOT NULL,
    "benefits" TEXT,
    "responsibilities" TEXT,
    "structure" TEXT,
    "location" TEXT,
    "deadline" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "minSalaryRange" INTEGER,
    "maxSalaryRange" INTEGER,
    "compensationPeriod" TEXT,
    "compensationCurrency" TEXT,
    "status" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "culture" TEXT,
    "summary" TEXT,
    "companyId" INTEGER NOT NULL,

    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CompanyToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity.uid_unique" ON "Opportunity"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile.companyId_unique" ON "CompanyProfile"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToPerson_AB_unique" ON "_CompanyToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToPerson_B_index" ON "_CompanyToPerson"("B");
