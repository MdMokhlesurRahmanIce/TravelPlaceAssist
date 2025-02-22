USE [master]
GO
/****** Object:  Database [TravelPlaceAssist]    Script Date: 1/10/2021 8:49:50 PM ******/
CREATE DATABASE [TravelPlaceAssist]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TravelPlaceAssist', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS_19\MSSQL\DATA\TravelPlaceAssist.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TravelPlaceAssist_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS_19\MSSQL\DATA\TravelPlaceAssist_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TravelPlaceAssist] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TravelPlaceAssist].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TravelPlaceAssist] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET ARITHABORT OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TravelPlaceAssist] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TravelPlaceAssist] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TravelPlaceAssist] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TravelPlaceAssist] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TravelPlaceAssist] SET  MULTI_USER 
GO
ALTER DATABASE [TravelPlaceAssist] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TravelPlaceAssist] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TravelPlaceAssist] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TravelPlaceAssist] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TravelPlaceAssist] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TravelPlaceAssist] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [TravelPlaceAssist] SET QUERY_STORE = OFF
GO
USE [TravelPlaceAssist]
GO
/****** Object:  Table [dbo].[CmnUser]    Script Date: 1/10/2021 8:49:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CmnUser](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](550) NULL,
	[Password] [nvarchar](50) NULL,
 CONSTRAINT [PK_CmnUser] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 1/10/2021 8:49:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[TitleID] [bigint] NULL,
	[Comment] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreateBy] [bigint] NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TravelPlace]    Script Date: 1/10/2021 8:49:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TravelPlace](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](550) NULL,
	[Description] [nvarchar](550) NULL,
	[ImageUrl] [nvarchar](550) NULL,
	[CreateBy] [bigint] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_TravelPlace] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CmnUser] ON 

INSERT [dbo].[CmnUser] ([ID], [UserName], [Password]) VALUES (1, N'mk', N'mk')
INSERT [dbo].[CmnUser] ([ID], [UserName], [Password]) VALUES (2, N'eh', N'eh')
SET IDENTITY_INSERT [dbo].[CmnUser] OFF
GO
SET IDENTITY_INSERT [dbo].[Comments] ON 

INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (1, 1, N'first comments by eh up', 0, 2)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (2, 1, N'second comments by eh', 0, 2)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (3, 2, N'last insert eh', 0, 2)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (4, 2, N'last insert two eh', 0, 2)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (5, 3, N'comment by mk', 0, 1)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (6, 1, N'by mk on eh title comment create and update mk self', 0, 1)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (7, 2, N'second comments  by mk on eh create cmnt up also', 0, 1)
INSERT [dbo].[Comments] ([ID], [TitleID], [Comment], [IsDeleted], [CreateBy]) VALUES (8, 4, N'commm  by mk', 0, 1)
SET IDENTITY_INSERT [dbo].[Comments] OFF
GO
SET IDENTITY_INSERT [dbo].[TravelPlace] ON 

INSERT [dbo].[TravelPlace] ([ID], [Title], [Description], [ImageUrl], [CreateBy], [IsDeleted]) VALUES (1, N'Title 1 eh', N'Description  1 eh', NULL, 2, 0)
INSERT [dbo].[TravelPlace] ([ID], [Title], [Description], [ImageUrl], [CreateBy], [IsDeleted]) VALUES (2, N'Title 2 eh', N'Description  2 eh', N'', 2, 0)
INSERT [dbo].[TravelPlace] ([ID], [Title], [Description], [ImageUrl], [CreateBy], [IsDeleted]) VALUES (3, N'Title 1 up by mk', N'Description  up mk', N'', 1, 0)
INSERT [dbo].[TravelPlace] ([ID], [Title], [Description], [ImageUrl], [CreateBy], [IsDeleted]) VALUES (4, N'Title create by mk', N'des by mk', N'', 1, 0)
INSERT [dbo].[TravelPlace] ([ID], [Title], [Description], [ImageUrl], [CreateBy], [IsDeleted]) VALUES (5, N'eh on mk create title', N'fsfd', N'', 2, 0)
SET IDENTITY_INSERT [dbo].[TravelPlace] OFF
GO
USE [master]
GO
ALTER DATABASE [TravelPlaceAssist] SET  READ_WRITE 
GO
