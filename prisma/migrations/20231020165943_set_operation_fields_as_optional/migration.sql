BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Operation] ALTER COLUMN [customerNumber] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [postalCode] NVARCHAR(8) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [municipality] NVARCHAR(50) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [address] NVARCHAR(100) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [name] NVARCHAR(60) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [phoneNumber] NVARCHAR(20) NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [footprint] TINYINT NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [installingMeterReferenceDate] DATE NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [operationType] TINYINT NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [afterWorkResult] BIT NULL;
ALTER TABLE [dbo].[Operation] ALTER COLUMN [beforeWorkResult] BIT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
