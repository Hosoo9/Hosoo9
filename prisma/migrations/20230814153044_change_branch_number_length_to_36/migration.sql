/*
  Warnings:

  - Made the column `branchNumber` on table `InstallationAlarm` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[InstallationAlarm] DROP CONSTRAINT [InstallationAlarm_operationId_branchNumber_key];

-- AlterTable
ALTER TABLE [dbo].[InstallationAlarm] ALTER COLUMN [branchNumber] NVARCHAR(36) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_operationId_branchNumber_key] UNIQUE NONCLUSTERED ([operationId], [branchNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
