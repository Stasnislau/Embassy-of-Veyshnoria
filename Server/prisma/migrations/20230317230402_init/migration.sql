/*
  Warnings:

  - You are about to drop the column `comments` on the `residencePermitApplications` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `visaApplications` table. All the data in the column will be lost.
  - Added the required column `dateOfDecision` to the `residencePermitApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfSubmission` to the `residencePermitApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `residencePermitApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfDecision` to the `visaApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfSubmission` to the `visaApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "residencePermitApplications" DROP COLUMN "comments",
ADD COLUMN     "dateOfDecision" TEXT NOT NULL,
ADD COLUMN     "dateOfSubmission" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visaApplications" DROP COLUMN "comments",
ADD COLUMN     "dateOfDecision" TEXT NOT NULL,
ADD COLUMN     "dateOfSubmission" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
