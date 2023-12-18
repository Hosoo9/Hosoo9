BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ALTER COLUMN [isSecurityWork] BIT NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [changedNotificationFlag] BIT NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [valveOpenFlag] BIT NULL;
ALTER TABLE [dbo].[Operation] ADD [housingType] TINYINT,
[phoneNumberType] TINYINT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
