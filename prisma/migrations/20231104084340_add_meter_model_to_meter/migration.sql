/*
  Warnings:

  - The primary key for the `Meter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Meter` table. All the data in the column will be lost.
  - Added the required column `meterModel` to the `Meter` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Meter] DROP CONSTRAINT [Meter_pkey];
ALTER TABLE [dbo].[Meter] DROP COLUMN [id];
ALTER TABLE [dbo].[Meter] ADD [meterModel] NVARCHAR(20) NOT NULL;
ALTER TABLE [dbo].[Meter] ADD CONSTRAINT Meter_pkey PRIMARY KEY CLUSTERED ([meterModel]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
