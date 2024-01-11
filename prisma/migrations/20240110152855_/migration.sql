BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MeterModelMaster] ALTER COLUMN [code] NCHAR(2) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[BasicLaborRate] (
    [code] CHAR(4) NOT NULL,
    [operationType] TINYINT NOT NULL,
    [meterType] TINYINT,
    [exchangeType] TINYINT,
    [workingTime] TINYINT,
    [meterSizeType] TINYINT,
    [districtType] TINYINT,
    [rate] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BasicLaborRate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [BasicLaborRate_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [BasicLaborRate_pkey] PRIMARY KEY CLUSTERED ([code]),
    CONSTRAINT [BasicLaborRate_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[AdditionalLaborRate] (
    [code] CHAR(4) NOT NULL,
    [operationType] TINYINT NOT NULL,
    [workingTime] TINYINT,
    [workerType] TINYINT,
    [districtType] TINYINT,
    [rate] TINYINT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AdditionalLaborRate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [AdditionalLaborRate_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AdditionalLaborRate_pkey] PRIMARY KEY CLUSTERED ([code]),
    CONSTRAINT [AdditionalLaborRate_code_key] UNIQUE NONCLUSTERED ([code])
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
