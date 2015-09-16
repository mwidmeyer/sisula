// Create a raw table suitable for bulk insert
if(source.split == 'regex') {
/*~
IF Object_ID('$source.qualified$_CreateRawTable', 'P') IS NOT NULL
DROP PROCEDURE [$source.qualified$_CreateRawTable];
GO

--------------------------------------------------------------------------
-- Procedure: $source.qualified$_CreateRawTable
--
-- This table holds the 'raw' loaded data.
--
-- row
-- Holds a row loaded from a file.
--
-- _id
-- This sequence is generated in order to keep a lineage through the
-- staging process. If a single file has been loaded, this corresponds
-- to the row number in the file.
--
-- _file
-- A number containing the file id, which either points to metadata
-- if its used or is otherwise an incremented number per file.
--
-- _timestamp
-- The time the row was created.
--
-- Generated: ${new Date()}$ by $VARIABLES.USERNAME
-- From: $VARIABLES.COMPUTERNAME in the $VARIABLES.USERDOMAIN domain
--------------------------------------------------------------------------
CREATE PROCEDURE [$source.qualified$_CreateRawTable] (
    @agentJobId uniqueidentifier = null,
    @agentStepId smallint = null
)
AS
BEGIN
SET NOCOUNT ON;
~*/
beginMetadata(source.qualified + '_CreateRawTable', source.name, 'Source');
var rowlength = source.rowlength ? source.rowlength : 'max';
/*~
    IF Object_ID('$source.qualified$_Raw', 'U') IS NOT NULL
    DROP TABLE [$source.qualified$_Raw];

    CREATE TABLE [$source.qualified$_Raw] (
        _id int identity(1,1) not null,
        _file int not null default 0,
        _timestamp datetime not null default getdate(),
        [row] $(source.datafiletype == 'char')? varchar($rowlength), : nvarchar($rowlength),
        constraint [pk$source.qualified$_Raw] primary key(
            _id asc
        )
    );
~*/
endMetadata();
/*~
END
GO
~*/
}
