BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[MeterManufacturerMaster] (
    [code] CHAR(1) NOT NULL,
    [name] NVARCHAR(60) NOT NULL,
    CONSTRAINT [MeterManufacturerMaster_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[MeterSizeMaster] (
    [size] NVARCHAR(10) NOT NULL,
    CONSTRAINT [MeterSizeMaster_pkey] PRIMARY KEY CLUSTERED ([size])
);

-- CreateTable
CREATE TABLE [dbo].[MeterModelMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] CHAR(2) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [MeterModelMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
