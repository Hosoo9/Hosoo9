BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [operationId] BIGINT NOT NULL,
    [contactType] TINYINT NOT NULL,
    [details] NVARCHAR(1000) NOT NULL CONSTRAINT [Contact_details_df] DEFAULT '',
    [contactedAt] DATETIME NOT NULL,
    [contactedBy] NVARCHAR(30) NOT NULL,
    [createdBy] NVARCHAR(30) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contact_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Contact_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Contact_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_operationId_fkey] FOREIGN KEY ([operationId]) REFERENCES [dbo].[Operation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_contactedBy_fkey] FOREIGN KEY ([contactedBy]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
