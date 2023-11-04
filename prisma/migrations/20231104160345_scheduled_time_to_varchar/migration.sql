BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ALTER COLUMN [scheduledTime] NVARCHAR(1000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
