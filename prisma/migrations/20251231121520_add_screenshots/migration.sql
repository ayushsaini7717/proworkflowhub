-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "screenshots" TEXT[] DEFAULT ARRAY[]::TEXT[];
