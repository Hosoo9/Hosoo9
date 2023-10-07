BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refresh_token] TEXT,
    [access_token] TEXT,
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] TEXT,
    [session_state] NVARCHAR(1000),
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_providerAccountId_key] UNIQUE NONCLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [identifier] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_identifier_token_key] UNIQUE NONCLUSTERED ([identifier],[token])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [nameKana] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [image] NVARCHAR(1000),
    [password] NVARCHAR(1000),
    [companyCode] NVARCHAR(1000),
    [role] INT NOT NULL CONSTRAINT [User_role_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [User_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Invite] (
    [id] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [role] TINYINT NOT NULL,
    [companyCode] NVARCHAR(1000),
    [status] TINYINT NOT NULL CONSTRAINT [Invite_status_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Invite_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Invite_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Invite_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Invite_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[LaborCost] (
    [recordNumber] NVARCHAR(1000) NOT NULL,
    [itemName] NVARCHAR(1000) NOT NULL,
    [unitPrice] INT NOT NULL,
    [startDay] DATETIME2 NOT NULL,
    [endDay] DATETIME2 NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [LaborCost_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [LaborCost_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [LaborCost_pkey] PRIMARY KEY CLUSTERED ([recordNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Operation] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [code] NVARCHAR(10) NOT NULL,
    [type] TINYINT NOT NULL CONSTRAINT [Operation_type_df] DEFAULT 1,
    [status] TINYINT NOT NULL CONSTRAINT [Operation_status_df] DEFAULT 1,
    [applicationDate] DATE,
    [createdBy] NVARCHAR(1000) NOT NULL,
    [solicitingCompanyId] NVARCHAR(1000),
    [gasType] TINYINT NOT NULL CONSTRAINT [Operation_gasType_df] DEFAULT 1,
    [customerNumber] NVARCHAR(15),
    [postalCode] NVARCHAR(8) NOT NULL,
    [municipality] NVARCHAR(50) NOT NULL,
    [address] NVARCHAR(100) NOT NULL,
    [housingType] TINYINT NOT NULL CONSTRAINT [Operation_housingType_df] DEFAULT 1,
    [buildingNameRoomNumber] NVARCHAR(100),
    [name] NVARCHAR(60) NOT NULL,
    [nameKana] NVARCHAR(100),
    [phoneNumber] NVARCHAR(20) NOT NULL,
    [phoneNumberType] TINYINT NOT NULL CONSTRAINT [Operation_phoneNumberType_df] DEFAULT 1,
    [mailAddress] NVARCHAR(1000),
    [oneOrBulk] TINYINT NOT NULL CONSTRAINT [Operation_oneOrBulk_df] DEFAULT 1,
    [paymentType] TINYINT NOT NULL CONSTRAINT [Operation_paymentType_df] DEFAULT 1,
    [desiredDate] DATE,
    [desiredTimeSlot] TINYINT,
    [memo] NVARCHAR(1000),
    [assignedWorkerId] NVARCHAR(10),
    [scheduledDatetime] DATETIME,
    [amountExcludingTax] INT,
    [amountConsumptionTax] INT,
    [amountIncludingTax] INT,
    [taxRate] INT,
    [contractDate] DATE NOT NULL,
    [branchType] TINYINT,
    [supplyType] TINYINT,
    [buildingType] TINYINT,
    [facilityType] TINYINT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Operation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Operation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Operation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Company_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[InstallationAlarm] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [operationId] BIGINT NOT NULL,
    [branchNumber] NVARCHAR(3),
    [customerNumber] NVARCHAR(1000),
    [meterNumber] NVARCHAR(1000),
    [postalCode] NVARCHAR(8),
    [municipality] NVARCHAR(50),
    [address] NVARCHAR(100),
    [housingType] TINYINT CONSTRAINT [InstallationAlarm_housingType_df] DEFAULT 1,
    [buildingNameRoomNumber] NVARCHAR(100),
    [phoneNumber] NVARCHAR(20),
    [phoneNumberType] TINYINT CONSTRAINT [InstallationAlarm_phoneNumberType_df] DEFAULT 1,
    [name] NVARCHAR(60),
    [nameKana] NVARCHAR(100),
    [gasLeakDetectorAbnormality] BIT,
    [carbonMonoxideDetectorAbnormality] BIT,
    [fireAlarmDetectorAbnormality] BIT,
    [operationInspectionDate] DATE,
    [inspectorId] NVARCHAR(1000),
    [modelNumber] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [InstallationAlarm_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [InstallationAlarm_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [InstallationAlarm_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AlarmInfo] (
    [modelNumber] NVARCHAR(1000) NOT NULL,
    [price] INT,
    [alarmType] TINYINT NOT NULL CONSTRAINT [AlarmInfo_alarmType_df] DEFAULT 1,
    [systemCategoryCode] NVARCHAR(5) NOT NULL,
    [systemCategoryName] NVARCHAR(50) NOT NULL,
    [standard] NVARCHAR(50) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AlarmInfo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [AlarmInfo_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AlarmInfo_pkey] PRIMARY KEY CLUSTERED ([modelNumber])
);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_companyCode_fkey] FOREIGN KEY ([companyCode]) REFERENCES [dbo].[Company]([code]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_operationId_fkey] FOREIGN KEY ([operationId]) REFERENCES [dbo].[Operation]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_inspectorId_fkey] FOREIGN KEY ([inspectorId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InstallationAlarm] ADD CONSTRAINT [InstallationAlarm_modelNumber_fkey] FOREIGN KEY ([modelNumber]) REFERENCES [dbo].[AlarmInfo]([modelNumber]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
