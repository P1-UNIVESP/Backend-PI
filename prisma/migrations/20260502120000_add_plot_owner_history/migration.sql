-- CreateTable
CREATE TABLE "PlotOwnerHistory" (
    "id" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlotOwnerHistory_pkey" PRIMARY KEY ("id")
);

-- Backfill current owners as open ownership periods
INSERT INTO "PlotOwnerHistory" ("id", "plotId", "ownerId", "startedAt", "createdAt")
SELECT md5("id" || "ownerId" || clock_timestamp()::text), "id", "ownerId", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Plot"
WHERE "ownerId" IS NOT NULL;

-- CreateIndex
CREATE INDEX "PlotOwnerHistory_plotId_idx" ON "PlotOwnerHistory"("plotId");

-- CreateIndex
CREATE INDEX "PlotOwnerHistory_ownerId_idx" ON "PlotOwnerHistory"("ownerId");

-- CreateIndex
CREATE INDEX "PlotOwnerHistory_plotId_endedAt_idx" ON "PlotOwnerHistory"("plotId", "endedAt");

-- AddForeignKey
ALTER TABLE "PlotOwnerHistory" ADD CONSTRAINT "PlotOwnerHistory_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlotOwnerHistory" ADD CONSTRAINT "PlotOwnerHistory_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
