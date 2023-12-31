/*
  Warnings:

  - You are about to alter the column `userAdminCd` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Char(3)` to `Char(2)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userAdminCd] CHAR(2) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userTownCd] CHAR(3) NULL;
ALTER TABLE [dbo].[Customer] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [Customer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[kenKbn] NVARCHAR(1),
[pastSupKei1] NVARCHAR(1),
[pastSupKei2] NVARCHAR(1),
[pastSupKei4] NVARCHAR(1),
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [Customer_updatedAt_df] DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE [dbo].[CustomerAlarm] (
    [kyakuNo] CHAR(11) NOT NULL,
    [regNo] CHAR(3) NOT NULL,
    [systemKbn] NCHAR(2),
    [alarmModel] NVARCHAR(15),
    [seizouNo] NCHAR(11),
    [toritsukePos] NCHAR(10),
    [setterNm] NCHAR(1),
    [alarmEndYm] NCHAR(6),
    [alarmLeaseCash] NCHAR(1),
    [indvBatch] NCHAR(1),
    [toritsukeYmd] NCHAR(8),
    [alarmContractReason] NCHAR(1),
    [alarmContractYmd] NCHAR(8),
    [cancelReason] NCHAR(1),
    [cancelYmd] NCHAR(8),
    [exchangeReason] NCHAR(1),
    [exchangeYmd] NCHAR(8),
    [alarmRemoveReason] NCHAR(1),
    [alarmRemoveYmd] NCHAR(8),
    [endNoticeYmd] NCHAR(8),
    [mkYmd] NVARCHAR(30),
    [upYmd] NVARCHAR(30),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CustomerAlarm_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [CustomerAlarm_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CustomerAlarm_pkey] PRIMARY KEY CLUSTERED ([kyakuNo],[regNo])
);

-- CreateTable
CREATE TABLE [dbo].[CustomerEquipment] (
    [kyakuNo] CHAR(11) NOT NULL,
    [machinNo] SMALLINT NOT NULL,
    [modelCd] NVARCHAR(2),
    [makerCd] NVARCHAR(2),
    [modelNm] NVARCHAR(20),
    [seizouYm] NVARCHAR(6),
    [bashoCd] NVARCHAR(1),
    [kyuhiCd] NVARCHAR(2),
    [caloreiSu] INT,
    [unfitCd] NVARCHAR(2),
    [badCd] NVARCHAR(2),
    [daisu] SMALLINT,
    [jointCd] NVARCHAR(1),
    [chousaYmd] DATETIME2,
    [chousaTanto] NVARCHAR(2),
    [meterNo] NVARCHAR(3),
    [displayFlg] NVARCHAR(1),
    [mkYmd] DATETIME2 NOT NULL,
    [upYmd] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CustomerEquipment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [CustomerEquipment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CustomerEquipment_pkey] PRIMARY KEY CLUSTERED ([kyakuNo],[machinNo])
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
