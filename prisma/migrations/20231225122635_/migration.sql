/*
  Warnings:

  - A unique constraint covering the columns `[loginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `loginId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- Update table
UPDATE [dbo].[User] SET [loginId] = [id] WHERE [loginId] IS NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [loginId] NVARCHAR(30) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_loginId_key] UNIQUE NONCLUSTERED ([loginId]);


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
