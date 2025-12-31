/*
  Warnings:

  - You are about to drop the column `screenshots` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "screenshots",
ADD COLUMN     "docHighlights" JSONB DEFAULT '[]';
