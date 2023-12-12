/*
  Warnings:

  - You are about to drop the column `installingMeterId` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `removingMeterId` on the `Operation` table. All the data in the column will be lost.
  - Added the required column `manufacturer` to the `Meter` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] DROP COLUMN [installingMeterId],
[removingMeterId];
ALTER TABLE [dbo].[Operation] ADD [installingMeterManufacturer] CHAR(2) NULL,
[installingMeterMaximumUsage] INT NULL,
[installingMeterModel] CHAR(2) NULL,
[installingMeterSize] NVARCHAR(15) NULL,
[removingMeterManufacturer] CHAR(2) NULL,
[removingMeterModel] CHAR(2) NULL,
[removingMeterSize] NVARCHAR(15) NULL,
[removingMeterMaximumUsage] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
