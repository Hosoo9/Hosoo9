-- This is an empty migration.
BEGIN TRY

BEGIN TRAN;

CREATE SEQUENCE dbo.OperationCodeSequence
    AS INT
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 99999
    CYCLE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
