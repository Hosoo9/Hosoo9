/*
  Warnings:

  - Added the required column `afterWorkResult` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beforeWorkResult` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ADD [afterWorkInspectionType] TINYINT,
[afterWorkKpa] INT,
[afterWorkResult] BIT NOT NULL,
[beforeWorkInspectionType] TINYINT,
[beforeWorkKpa] INT,
[beforeWorkResult] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
