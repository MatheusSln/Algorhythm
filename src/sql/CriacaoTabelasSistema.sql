IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Modules] (
    [Id] uniqueidentifier NOT NULL,
    [Title] varchar(200) NOT NULL,
    [Level] int NOT NULL,
    CONSTRAINT [PK_Modules] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Exercises] (
    [Id] uniqueidentifier NOT NULL,
    [ModuleId] uniqueidentifier NOT NULL,
    [Question] varchar(300) NOT NULL,
    [CorrectAnswer] varchar(100) NOT NULL,
    CONSTRAINT [PK_Exercises] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Exercises_Modules_ModuleId] FOREIGN KEY ([ModuleId]) REFERENCES [Modules] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [Alternatives] (
    [Id] uniqueidentifier NOT NULL,
    [ExerciseId] uniqueidentifier NOT NULL,
    [Title] varchar(100) NOT NULL,
    CONSTRAINT [PK_Alternatives] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Alternatives_Exercises_ExerciseId] FOREIGN KEY ([ExerciseId]) REFERENCES [Exercises] ([Id]) ON DELETE NO ACTION
);
GO

CREATE INDEX [IX_Alternatives_ExerciseId] ON [Alternatives] ([ExerciseId]);
GO

CREATE INDEX [IX_Exercises_ModuleId] ON [Exercises] ([ModuleId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220201235209_Initial', N'5.0.13');
GO

COMMIT;
GO

