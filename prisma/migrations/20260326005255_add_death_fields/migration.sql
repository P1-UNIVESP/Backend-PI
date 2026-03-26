/*
  Warnings:

  - Added the required column `cause` to the `Death` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Death` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occurredAt` to the `Death` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Death" ADD COLUMN     "cause" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "occurredAt" TIMESTAMP(3) NOT NULL;
