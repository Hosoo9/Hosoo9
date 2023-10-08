/*
  Warnings:

  - You are about to drop the column `openrationType` on the `Operation` table. All the data in the column will be lost.
  - Added the required column `operationType` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ALTER COLUMN [position] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [removingMeterImagePath] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [installingMeterImagePath] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [signatureImgPath] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Operation] DROP COLUMN [openrationType];
ALTER TABLE [dbo].[Operation] ADD [operationType] TINYINT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
