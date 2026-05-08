/*
  Warnings:

  - The `tasks` column on the `PreparationPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PreparationPlan" DROP COLUMN "tasks",
ADD COLUMN     "tasks" TEXT[];
