BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[casbin_rule] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ptype] NVARCHAR(1000) NOT NULL,
    [v0] NVARCHAR(1000),
    [v1] NVARCHAR(1000),
    [v2] NVARCHAR(1000),
    [v3] NVARCHAR(1000),
    [v4] NVARCHAR(1000),
    [v5] NVARCHAR(1000),
    CONSTRAINT [casbin_rule_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
