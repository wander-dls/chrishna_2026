-- CreateEnum
CREATE TYPE "PhotoPurchaseStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "ClientGallery" ADD COLUMN     "addPhotoPrice" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "includedPhotoCount" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "packageId" TEXT;

-- CreateTable
CREATE TABLE "PhotoPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inclPhoto" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoPurchase" (
    "id" TEXT NOT NULL,
    "clientGalleryId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PhotoPurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "stripCheckouId" TEXT,
    "stripePmntInt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoDownload" (
    "id" TEXT NOT NULL,
    "clientGalleryId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "downloadCount" INTEGER NOT NULL DEFAULT 1,
    "firstDownloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastDownloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoDownload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhotoPurchase_stripCheckouId_key" ON "PhotoPurchase"("stripCheckouId");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoPurchase_stripePmntInt_key" ON "PhotoPurchase"("stripePmntInt");

-- CreateIndex
CREATE INDEX "PhotoPurchase_clientGalleryId_status_idx" ON "PhotoPurchase"("clientGalleryId", "status");

-- CreateIndex
CREATE INDEX "PhotoDownload_clientGalleryId_idx" ON "PhotoDownload"("clientGalleryId");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoDownload_clientGalleryId_photoId_key" ON "PhotoDownload"("clientGalleryId", "photoId");

-- AddForeignKey
ALTER TABLE "ClientGallery" ADD CONSTRAINT "ClientGallery_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "PhotoPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoPurchase" ADD CONSTRAINT "PhotoPurchase_clientGalleryId_fkey" FOREIGN KEY ("clientGalleryId") REFERENCES "ClientGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoDownload" ADD CONSTRAINT "PhotoDownload_clientGalleryId_fkey" FOREIGN KEY ("clientGalleryId") REFERENCES "ClientGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoDownload" ADD CONSTRAINT "PhotoDownload_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "ClientPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
