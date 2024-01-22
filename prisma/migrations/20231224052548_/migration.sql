BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [customerNumber] VARCHAR(12) NOT NULL,
    [postalCode] VARCHAR(8),
    [municipality] VARCHAR(50),
    [address] VARCHAR(100),
    [housingType] TINYINT,
    [buildingNameRoomNumber] VARCHAR(100),
    [name] VARCHAR(60),
    [nameKana] VARCHAR(100),
    [gasSupKeiCd] VARCHAR(1),
    [standYmd] SMALLINT,
    [gyoshuCd] VARCHAR(3),
    [userAdminCd] CHAR,
    [userTownCd] CHAR,
    [userStreetNo] SMALLINT,
    [userHouseNo] SMALLINT,
    [userSpecialNo] SMALLINT,
    [userKataKNm] VARCHAR(20),
    [userKataNm] VARCHAR(40),
    [userKNm] VARCHAR(20),
    [userNm] VARCHAR(40),
    [telKbn] VARCHAR(1),
    [userTel] VARCHAR(12),
    [kaiSu] SMALLINT,
    [posCd] VARCHAR(1),
    [makerCd] VARCHAR(1),
    [patNo] VARCHAR(2),
    [meterNumber] INT,
    [meterNo] VARCHAR(7),
    [meterYmd] DATETIME,
    [usedSu] INT,
    [meterPutKbn] VARCHAR(1),
    [meterPutYmd] DATETIME,
    [meterInfoKbn] VARCHAR(1),
    [meterTurnOnKbn] VARCHAR(1),
    [meterTurnOnYmd] DATETIME,
    [meterTurnOffKbn] VARCHAR(1),
    [meterTurnOffYmd] DATETIME,
    [meterRemoveKbn] VARCHAR(1),
    [meterRemoveYmd] DATETIME,
    [meterReadKbn] VARCHAR(1),
    [meterReadYmd] DATETIME,
    [noteCd] VARCHAR(1),
    [keyNo] SMALLINT,
    [supplyNo] VARCHAR(6),
    [contactTel] VARCHAR(12),
    [pastMeterSu1] INT,
    [pastMeterSu2] INT,
    [pastSupKei3] VARCHAR(1),
    [pastMeterSu3] INT,
    [pastMeterSu4] INT,
    [disaReblkCd] VARCHAR(1),
    [jigyoshaCd] CHAR(5),
    [kiguChosaYmd] DATETIME,
    [tatemonoKbn] CHAR(2),
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([customerNumber])
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
