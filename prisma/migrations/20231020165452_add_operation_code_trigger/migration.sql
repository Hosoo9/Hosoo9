CREATE TRIGGER dbo.UpdateOperationCode
ON dbo.Operation
FOR INSERT
AS
BEGIN
    -- Check if the month has changed since the last inserted record
    IF NOT EXISTS (
        SELECT TOP 1 1
        FROM dbo.Operation
        WHERE MONTH(createdAt) = MONTH(GETDATE())
    )
    BEGIN
        -- If the month has changed, reset the sequence to 1
        ALTER SEQUENCE dbo.OperationCodeSequence RESTART WITH 1;
    END

    DECLARE @Month CHAR(4)
    SET @Month = FORMAT(GETDATE(), 'yyMM')

    UPDATE t
    SET t.code = @Month + RIGHT('00000' + CAST((NEXT VALUE FOR dbo.OperationCodeSequence) AS VARCHAR(5)), 5)
    FROM dbo.Operation t
    JOIN inserted i ON t.id = i.id; -- Replace "id" with the primary key column of your table
END;
