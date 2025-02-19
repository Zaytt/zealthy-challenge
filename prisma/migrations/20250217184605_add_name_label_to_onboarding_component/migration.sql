/*
  Warnings:

  - Added the required column `label` to the `OnboardingComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OnboardingComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnboardingComponent" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
