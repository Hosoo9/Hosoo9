/*
  Warnings:

  - A unique constraint covering the columns `[operationId,branchNumber]` on the table `InstallationAlarm` will be added. If there are existing duplicate values, this will fail.
  - Made the column `branchNumber` on table `InstallationAlarm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `modelNumber` on table `InstallationAlarm` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[InstallationAlarm] DROP CONSTRAINT [InstallationAlarm_modelNumber_fkey];

-- AlterTable
ALTER TABLE [dbo].[InstallationAlarm] ALTER COLUMN [branchNumber] NVARCHAR(3) NOT NULL;
ALTER TABLE [dbo].[InstallationAlarm] ALTER COLUMN [modelNumber] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_operationId_branchNumber_key] UNIQUE NONCLUSTERED ([operationId], [branchNumber]);

-- AddForeignKey
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_modelNumber_fkey] FOREIGN KEY ([modelNumber]) REFERENCES [dbo].[AlarmInfo]([modelNumber]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
