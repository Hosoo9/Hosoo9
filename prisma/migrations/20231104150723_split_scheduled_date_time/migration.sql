/*
  Warnings:

  - You are about to drop the column `scheduledDatetime` on the `Operation` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] DROP COLUMN [scheduledDatetime];
ALTER TABLE [dbo].[Operation] ADD [scheduledDate] DATE,
[scheduledTime] TIME;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
