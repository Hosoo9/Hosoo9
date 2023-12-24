BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userAdminCd] CHAR NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userTownCd] CHAR NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
