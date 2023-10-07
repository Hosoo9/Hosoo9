/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `InstallationAlarm` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[InstallationAlarm] ADD [expirationYearMonth] DATE,
[installationDate] DATE,
[installationLocation] NVARCHAR(60),
[isInstalled] BIT,
[isNonNumber] BIT NOT NULL CONSTRAINT [InstallationAlarm_isNonNumber_df] DEFAULT 0,
[memo] NVARCHAR(500),
[removalExpirationYearMonth] DATE,
[removalLocation] NVARCHAR(60),
[removalModelNumber] NVARCHAR(1000),
[removalSerialMonth] NVARCHAR(20),
[serialNumber] NVARCHAR(20);

-- CreateIndex
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_serialNumber_key] UNIQUE NONCLUSTERED ([serialNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
