/*
  Warnings:

  - You are about to drop the `MeterManufacturerMaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeterModelMaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeterSizeMaster` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[MeterManufacturerMaster];

-- DropTable
DROP TABLE [dbo].[MeterModelMaster];

-- DropTable
DROP TABLE [dbo].[MeterSizeMaster];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
