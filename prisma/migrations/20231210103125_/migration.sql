BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MeterManufacturerMaster] ALTER COLUMN [code] NVARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[MeterModelMaster] ALTER COLUMN [code] NVARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Operation] ALTER COLUMN [installingMeterManufacturer] NVARCHAR(2) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [installingMeterModel] NVARCHAR(2) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [removingMeterManufacturer] NVARCHAR(2) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [removingMeterModel] NVARCHAR(2) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
