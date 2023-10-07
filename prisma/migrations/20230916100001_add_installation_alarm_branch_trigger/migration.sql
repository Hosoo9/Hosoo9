CREATE TRIGGER InstallationAlarmBranchNumber
ON InstallationAlarm
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO InstallationAlarm (operationId, modelNumber, branchNumber)
    SELECT
        i.operationId,
        i.modelNumber,
        dbo.GenerateBranchNumber(i.operationId)
    FROM inserted i;

    SET NOCOUNT OFF;
END;
