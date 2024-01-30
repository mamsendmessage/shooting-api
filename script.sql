
CREATE TABLE [GameType] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [GameType] VALUES ('Normal')
INSERT INTO [GameType] VALUES ('Special sessions')
INSERT INTO [GameType] VALUES ('Competition')

GO

CREATE TABLE [Nationality] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [Nationality] VALUES ('Qatar')
INSERT INTO [Nationality] VALUES ('Jordan')
INSERT INTO [Nationality] VALUES ('Saudi Arabia')

GO

CREATE TABLE [PlayerLevel] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [PlayerLevel] VALUES ('Beginner')
INSERT INTO [PlayerLevel] VALUES ('Intermediate')
INSERT INTO [PlayerLevel] VALUES ('Professional Arabia')

GO

CREATE TABLE [SessionTime] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [SessionTime] VALUES ('30')
INSERT INTO [SessionTime] VALUES ('45')
INSERT INTO [SessionTime] VALUES ('60')

GO

CREATE TABLE [Lane]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL,[Name] [nvarchar](255) NOT NULL,[Number] [bigint] Unique NOT NULL,[CreationDate] [datetime] NOT NULL)

GO

CREATE TABLE [dbo].[User]([ID] [bigint] PRIMARY KEY IDENTITY(1,1) NOT NULL, [Name] [nvarchar](255) NOT NULL,[Email] [nvarchar](500) Unique NOT NULL,[Password] [nvarchar](255) NOT NULL,
	[MobileNumber] [nvarchar](10) NOT NULL Unique ,[CreationDate] [datetime] NOT NULL)

GO

CREATE TABLE [dbo].[Player]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL, [Name] [nvarchar](255) NOT NULL,[NationalityId] [bigint] NULL, [Age] [int] NULL,
	[MobileNumber] [nvarchar](10) NULL,[Photo] [nvarchar](max) NULL,[CreationDate] [datetime] NOT NULL
	FOREIGN KEY (NationalityId) REFERENCES Nationality(ID)
	)

GO

CREATE TABLE [dbo].[Ticket]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL, [UserId] [bigint] NOT NULL, [LaneId] [bigint] NOT NULL,[GameTypeId] [bigint] NOT NULL,[PlayerLevelId] [bigint] NOT NULL,
	[SessionTimeId] [bigint] NOT NULL,[State] [int] NOT NULL,[CreationDate] [datetime] NOT NULL,[LastModificationDate] [datetime] NULL

	FOREIGN KEY (UserId) REFERENCES [User](ID),
	FOREIGN KEY (LaneId) REFERENCES Lane(ID),
	FOREIGN KEY (GameTypeId) REFERENCES GameType(ID),
	FOREIGN KEY (PlayerLevelId) REFERENCES PlayerLevel(ID),
	FOREIGN KEY (SessionTimeId) REFERENCES SessionTime(ID)

	)

CREATE VIEW [X_TodayPlayers] AS SELECT [Player].[ID] As UserId,[Player].[Photo],[Player].[Name],[Ticket].[CreationDate],[Ticket].[State],[PlayerLevel].[Value] AS PlayerLevel,[GameType].[Name] as GameType, [Ticket].[TicketType], [Ticket].[UserType] , [Ticket].[LaneId] FROM Ticket
JOIN [Player] ON [Ticket].UserId = [Player].[ID]
JOIN [PlayerLevel] ON [PlayerLevel].[ID] = [Ticket].[PlayerLevelId]
JOIN [GameType] ON [Ticket].[GameTypeId] = [GameType].[ID] 
WHERE CONVERT(varchar(10), [Ticket].[CreationDate], 102)  = CONVERT(varchar(10), getdate(), 102)
