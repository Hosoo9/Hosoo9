/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Operation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ADD [code] NVARCHAR(10) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Operation] ADD CONSTRAINT [Operation_code_key] UNIQUE NONCLUSTERED ([code]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
