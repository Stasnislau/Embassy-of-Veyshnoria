/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `residencePermitApplications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visaApplications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "residencePermitApplications" DROP CONSTRAINT "residencePermitApplications_userId_fkey";

-- DropForeignKey
ALTER TABLE "visaApplications" DROP CONSTRAINT "visaApplications_userId_fkey";

-- DropTable
DROP TABLE "Token";

-- DropTable
DROP TABLE "residencePermitApplications";

-- DropTable
DROP TABLE "visaApplications";

-- CreateTable
CREATE TABLE "residence_permit_applications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "residencePermitType" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportIssuingCountry" TEXT NOT NULL,
    "passportExpirationDate" TEXT NOT NULL,
    "passportIssuingDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dateOfSubmission" TEXT NOT NULL,
    "dateOfDecision" TEXT NOT NULL,

    CONSTRAINT "residence_permit_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_applications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpirationDate" TEXT NOT NULL,
    "passportIssuingDate" TEXT NOT NULL,
    "passportIssuingCountry" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "visaDuration" TEXT NOT NULL,
    "visaDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dateOfSubmission" TEXT NOT NULL,
    "dateOfDecision" TEXT NOT NULL,

    CONSTRAINT "visa_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");

-- AddForeignKey
ALTER TABLE "residence_permit_applications" ADD CONSTRAINT "residence_permit_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_applications" ADD CONSTRAINT "visa_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
