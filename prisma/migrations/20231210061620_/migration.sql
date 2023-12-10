BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[MeterManufacturerMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] CHAR(2) NOT NULL,
    CONSTRAINT [MeterManufacturerMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MeterSizeMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] NVARCHAR(15) NOT NULL,
    CONSTRAINT [MeterSizeMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MeterModelMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] CHAR(2) NOT NULL,
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
