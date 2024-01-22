BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userAdminCd] CHAR(3) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userTownCd] CHAR(2) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH