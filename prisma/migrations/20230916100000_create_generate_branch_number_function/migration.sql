CREATE FUNCTION GenerateBranchNumber(@operationId INT)
RETURNS CHAR(3)
AS
BEGIN
    DECLARE @branchNumber CHAR(3);
    
    SELECT @branchNumber = COALESCE(MAX(branchNumber), '000')
    FROM InstallationAlarm ia
    WHERE operationId = @operationId;
    
    SET @branchNumber = RIGHT('00' + CAST(CAST(@branchNumber AS INT) + 1 AS VARCHAR(3)), 3);
    
    RETURN @branchNumber;
END;
