BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ADD [companyId] NVARCHAR(10),
[reportIssueDate] DATETIME;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [technicianType] TINYINT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
