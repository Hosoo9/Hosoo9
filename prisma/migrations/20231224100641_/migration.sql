/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Customer] DROP CONSTRAINT [Customer_pkey];
ALTER TABLE [dbo].[Customer] ALTER COLUMN [customerNumber] NVARCHAR(12) NOT NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [postalCode] NVARCHAR(8) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [municipality] NVARCHAR(50) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [address] NVARCHAR(100) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [buildingNameRoomNumber] NVARCHAR(100) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [name] NVARCHAR(60) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [nameKana] NVARCHAR(100) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [gasSupKeiCd] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [gyoshuCd] NVARCHAR(3) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userAdminCd] CHAR NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userTownCd] CHAR NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userKataKNm] NVARCHAR(20) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userKataNm] NVARCHAR(40) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userKNm] NVARCHAR(20) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userNm] NVARCHAR(40) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [telKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [userTel] NVARCHAR(12) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [posCd] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [makerCd] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [patNo] NVARCHAR(2) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterNo] NVARCHAR(7) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterPutKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterInfoKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterTurnOnKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterTurnOffKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterRemoveKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [meterReadKbn] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [noteCd] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [supplyNo] NVARCHAR(6) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [contactTel] NVARCHAR(12) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [pastSupKei3] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN [disaReblkCd] NVARCHAR(1) NULL;
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT Customer_pkey PRIMARY KEY CLUSTERED ([customerNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
