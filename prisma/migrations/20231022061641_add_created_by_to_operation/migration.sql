/*
  Warnings:

  - Added the required column `createdBy` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ADD [createdBy] NVARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Meter] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [serialNumber] NVARCHAR(20) NOT NULL,
    [meterType] NVARCHAR(20) NOT NULL,
    [meterMaximumUsage] INT NOT NULL,
    CONSTRAINT [Meter_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Operation] ADD CONSTRAINT [Operation_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
