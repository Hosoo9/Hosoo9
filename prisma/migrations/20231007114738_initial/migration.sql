BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[casbin_rule] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ptype] NVARCHAR(1000) NOT NULL,
    [v0] NVARCHAR(1000),
    [v1] NVARCHAR(1000),
    [v2] NVARCHAR(1000),
    [v3] NVARCHAR(1000),
    [v4] NVARCHAR(1000),
    [v5] NVARCHAR(1000),
    CONSTRAINT [casbin_rule_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(30) NOT NULL,
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
    [userId] NVARCHAR(30) NOT NULL,
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
CREATE TABLE [dbo].[ResetCode] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [ResetCode_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ResetCode_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(30) NOT NULL,
    [name] NVARCHAR(1000),
    [nameKana] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [password] NVARCHAR(1000) NOT NULL,
    [companyId] NVARCHAR(10),
    [role] INT NOT NULL CONSTRAINT [User_role_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [User_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Operation] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [isSecurityWork] BIT NOT NULL CONSTRAINT [Operation_isSecurityWork_df] DEFAULT 0,
    [status] TINYINT NOT NULL CONSTRAINT [Operation_status_df] DEFAULT 1,
    [changedNotificationFlag] BIT NOT NULL,
    [valveOpenFlag] BIT NOT NULL,
    [prePauseStatus] TINYINT,
    [pauseTimestamp] DATETIME2,
    [pauseDuration] TINYINT,
    [customerNumber] NVARCHAR(1000) NOT NULL,
    [postalCode] NVARCHAR(8) NOT NULL,
    [municipality] NVARCHAR(50) NOT NULL,
    [address] NVARCHAR(100) NOT NULL,
    [buildingNameRoomNumber] NVARCHAR(100),
    [name] NVARCHAR(60) NOT NULL,
    [nameKana] NVARCHAR(100),
    [phoneNumber] NVARCHAR(20) NOT NULL,
    [assignedWorkerId] NVARCHAR(30),
    [memo] NVARCHAR(500),
    [scheduledDatetime] DATETIME,
    [footprint] TINYINT NOT NULL,
    [postcardOutputTimestamp] DATETIME,
    [absenceNoticeDeliveryDate] DATE NOT NULL,
    [openrationType] TINYINT NOT NULL,
    [completedAt] DATETIME,
    [exchangingDate] DATETIME,
    [removingMeterId] NVARCHAR(30),
    [removingMeterNumber] NVARCHAR(20),
    [removingMeterValue] INT,
    [removingMeterInspectionDate] DATETIME,
    [referenceDate] DATETIME,
    [position] NVARCHAR,
    [removingMeterImagePath] NVARCHAR,
    [installingMeterId] NVARCHAR(1000),
    [installingMeterNumber] NVARCHAR(1000),
    [installingMeterValue] INT,
    [installingMeterReferenceDate] DATE NOT NULL,
    [installingMeterImagePath] NVARCHAR,
    [signatureImgPath] NVARCHAR,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Operation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Operation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Operation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [id] NVARCHAR(10) NOT NULL,
    [name] NVARCHAR(60) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Company_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
