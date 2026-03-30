/*
  Warnings:

  - You are about to drop the `Death` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PlotType" AS ENUM ('TERRA', 'GAVETA', 'MAUSOLEU');

-- CreateEnum
CREATE TYPE "StatusPlot" AS ENUM ('DISPONIVEL', 'OCUPADO', 'MANUTENCAO');

-- DropTable
DROP TABLE "Death";

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plot" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "PlotType" NOT NULL,
    "status" "StatusPlot" NOT NULL DEFAULT 'DISPONIVEL',
    "capacity" INTEGER NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deceased" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "deathDate" TIMESTAMP(3) NOT NULL,
    "deathCertificate" TEXT NOT NULL,

    CONSTRAINT "Deceased_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Burial" (
    "id" TEXT NOT NULL,
    "burialDate" TIMESTAMP(3) NOT NULL,
    "plotId" TEXT NOT NULL,
    "deceasedId" TEXT NOT NULL,

    CONSTRAINT "Burial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_cpf_key" ON "Owner"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Plot_code_key" ON "Plot"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Deceased_deathCertificate_key" ON "Deceased"("deathCertificate");

-- CreateIndex
CREATE UNIQUE INDEX "Burial_deceasedId_key" ON "Burial"("deceasedId");

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Burial" ADD CONSTRAINT "Burial_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Burial" ADD CONSTRAINT "Burial_deceasedId_fkey" FOREIGN KEY ("deceasedId") REFERENCES "Deceased"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
