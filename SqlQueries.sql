-- SQL Table Queries

create table user_table(
email varchar(100) not null,
password varchar(50) COLLATE Latin1_General_CS_AS not null,
username varchar(50) not null,
mobileNumber varchar(13) not null,
userRole varchar(50) not null,
primary key(email)
);

CREATE TABLE job_table
(
  jobId INT IDENTITY(1, 1) PRIMARY KEY,
  Email VARCHAR(100)   NOT NULL,
  jobDescription VARCHAR(100) NOT NULL,
  jobLocation VARCHAR(100) NOT NULL,
  fromDate DATE NOT NULL,
  toDate DATE NOT NULL,
  wagePerDay VARCHAR(20) NOT NULL,
  phoneNumber VARCHAR(13),
  foreign key (Email) References user_table (email)
);


create table admin_table(
email varchar(100)  ,
password varchar(30) COLLATE Latin1_General_CS_AS NOT NULL,
mobileNumber varchar(13) NOT NULL,
userRole varchar(20) NOT NULL,
primary key(email)
);

create table jobSeeker_table(
ID Int IDENTITY(1,1) primary key,
personId VARCHAR(100) NOT NULL,
personName VARCHAR(50) NOT NULL,
personAddress VARCHAR(100) NOT NULL,
personExp VARCHAR(100) NOT NULL,
personPhone VARCHAR(20) NOT NULL,
personEmail VARCHAR(100) NOT NULL,
jobModel NVARCHAR(MAX) NOT NULL,
PersonStatus varchar(10)
);




CREATE TABLE chatbox_table (
  id INT IDENTITY(1,1) PRIMARY KEY,
  customerid varchar(100) not null,
  sender VARCHAR(10) NOT NULL,
  jobseekerid VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT GETDATE()
);


create table Review_table(
userId varchar(100) not null,
rating int not null,
comments NVARCHAR(MAX) not null,
personId varchar(100) not null,
);

create table complaint_table(
complaintId int IDENTITY(1,1),
userId varchar(100) not null,
complaint nvarchar(max) not null,
userRole varchar(10) not null,
status varchar(10) not null
);

-- SQL Procedures Queries

create procedure getUser
as
begin
	select email,username,mobileNumber,userRole from user_table
end;
GO

create procedure getUserById(@email varchar(100))
as
begin
	select email,password,username,mobileNumber,userRole from user_table where email = @email
end;
GO


create procedure addUser(@email varchar(100),@password varchar(20),@username varchar(30),@mobileNumber varchar(12),@userRole varchar(20))
as
begin
if exists(select email from user_table where @email = email)
	print('the user is already exist')
else
	insert into user_table (email,password,username,mobileNumber,userRole) values(@email,@password,@username,@mobileNumber,@userRole)
end;
GO


create procedure editUser(@email varchar(100),@password varchar(20),@username varchar(30),@mobileNumber varchar(12),@userRole varchar(20))
as
begin
if exists(select email from user_table where @email = email)
	update user_table set username = @username ,password = @password, mobileNumber = @mobileNumber,userRole = @userRole where email = @email
else
	print('record is not found')
end;
GO


create procedure deleteUser(@email varchar(100))
as
begin
	delete from user_table2 where email = @email
end;
GO


create procedure userLogin(@email varchar(100),@password varchar(20))
as
begin
	if exists(select email from user_table where email = @email and password = @password and userRole = 'user')
		select email,password from user_table where email=@email and password = @password 
	else
		print('user is not present')
end;
GO


create procedure jobseekerLogin(@email varchar(100),@password varchar(20))
as
begin
	if exists(select email from user_table where email = @email and password = @password and userRole = 'job seeker')
		select email,password from user_table where email=@email and password = @password 
	else
		print('jobseeker is not present')
end;
GO


create procedure getJob
as
begin
	select * from job_table
end;
GO

create procedure addJob(@Email varchar(100),@jobDescription varchar(100),@jobLocation varchar(50),@fromDate date,@toDate date,@wagePerDay varchar(20),@phoneNumber varchar(20)=null)
as
begin
	insert into job_table(Email,jobDescription,jobLocation,fromDate,toDate,wagePerDay,phoneNumber) values(@Email,@jobDescription,@jobLocation,@fromDate,@toDate,@wagePerDay,@phoneNumber) 
end;
GO


create procedure editJob(@jobid varchar(10),@jobDescription varchar(100),@jobLocation varchar(50),@fromDate date,@toDate date,@wagePerDay varchar(20),@phoneNumber varchar(13) = null)
as
begin
	if exists(select jobId from job_table where jobId= @jobid)
		update job_table set jobDescription = @jobDescription,jobLocation = @jobLocation,fromDate = @fromDate,toDate = @toDate,wagePerDay = @wagePerDay,phoneNumber = @phoneNumber where jobId = @jobid
end;
GO


create procedure deletejob(@jobid varchar(10))
as
begin
	delete from job_table where jobId = @jobid
end;
GO

create  procedure adminlogin(@email varchar(100),@password varchar(30))
as
begin
if exists(select email from admin_table where email = @email and password = @password )
	select email,password from admin_table where email = @email and password = @password
end;
GO

create procedure addAdmin(@email varchar(100),@password varchar(20),@mobileNumber varchar(12),@userRole varchar(20))
as
begin
if exists(select email from admin_table where email = @email)
	print('the user is already exist')
else
	insert into admin_table (email,password,mobileNumber,userRole) values(@email,@password,@mobileNumber,@userRole)
end;
GO

create procedure viewprofile
as
begin
	select * from jobSeeker_table
end;
GO


create PROCEDURE insertperson
(
    @personId VARCHAR(100),
    @personName VARCHAR(50),
    @personAddress VARCHAR(200),
    @personExp VARCHAR(50),
    @personPhone VARCHAR(20),
    @personEmail VARCHAR(100),
    @jobModel NVARCHAR(MAX)
)
AS
BEGIN
    IF EXISTS(SELECT personId, JSON_VALUE(jobModel, '$.jobId') as jobModel FROM jobSeeker_table where personId = @personId and jobModel=@jobModel)
        SELECT 'already register for job' AS Result
    ELSE
        INSERT INTO jobSeeker_table(personId,personName, personAddress, personExp, personPhone, personEmail, jobModel) VALUES (@personId,@personName, @personAddress, @personExp, @personPhone, @personEmail, @jobModel)
END;
GO

create procedure editprofile(@ID varchar(10),@personName VARCHAR(100),@personAddress VARCHAR(200),
@personExp VARCHAR(50),@personPhone VARCHAR(20),@personEmail VARCHAR(100),@jobModel NVARCHAR(MAX),@personStatus varchar(10)= null)
as
begin
	if exists(select ID from jobSeeker_table where ID = @ID)
		update jobSeeker_table set personName=@personName,personAddress=@personAddress,personExp=@personExp,personPhone = @personPhone,personEmail = @personEmail,jobModel = @jobModel,personStatus = @personStatus where ID = @ID
end;
GO


create procedure deleteprofile(@ID varchar(10))
as
begin
	delete from jobSeeker_table where ID = @ID
end;
GO

create procedure user_post_jobs(@jobid varchar(100))
as
begin
	if exists(SELECT  JSON_VALUE(jobModel, '$.email') as jobId FROM jobSeeker_table where  JSON_VALUE(jobModel,'$.email') = @jobid )
		SELECT ID,personId,personName,personAddress,personExp,personPhone,personEmail,personStatus,  jobModel FROM jobSeeker_table where  JSON_VALUE(jobModel,'$.email') = @jobid
end;
GO

create procedure getall_Appliedjobs
as
begin
	select jobModel from jobSeeker_table where personStatus = 'Applied'
end;
GO

create procedure appliedjob(@personId varchar(100))
as
begin
	if exists(select personId from jobSeeker_table where personId = @personId)
		select * from jobSeeker_table where personId = @personId
end;
GO

create procedure get_jobseeker_chat(@jobseekerid varchar(100))
as
begin
	select * from chatbox_table where jobseekerid = @jobseekerid
end;
GO

create procedure set_customer_chat(@customerid varchar(100),@sender varchar(10),@jobseekerid varchar(100),@content text)
as
begin
	insert into chatbox_table(customerid,sender,jobseekerid,content) values (@customerid,@sender,@jobseekerid,@content)
end;
GO

create procedure get_customer_chat(@customerid varchar(100))
as
begin
	select * from chatbox_table where customerid = @customerid
end;
GO


create procedure set_jobseeker_chat(@customerid varchar(100),@sender varchar(10),@jobseekerid varchar(100),@content text)
as
begin
	insert into chatbox_table(customerid,sender,jobseekerid,content) values (@customerid,@sender,@jobseekerid,@content)
end;
GO

create procedure Insert_Review(@userId varchar(100),@rating int,@comments nvarchar(MAX),@personId varchar(100))
As
Begin
	insert into Review_table(userId,rating,comments,personId)values(@userId,@rating,@comments,@personId)
End;
GO

create procedure Get_Review(@personId varchar(100))
As 
Begin
	select*from Review_table where personId = @personId
End;
GO

create PROCEDURE TotalReports
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserCount INT;
    DECLARE @JobSeekerCount INT;
    DECLARE @JobCount INT;
	DECLARE @ExpireJobs INT;
	DECLARE @ActiveJobs INT;
    
    -- Get count from user_table
    SELECT @UserCount = COUNT(*) FROM [user_table];
    
    -- Get count from jobseeker_table
    SELECT @JobSeekerCount =  COUNT(*) FROM [jobseeker_table];
    
    -- Get count from job_table
    SELECT @JobCount =  COUNT(*) FROM [job_table];

	SELECT @ExpireJobs =  COUNT(*) FROM job_table WHERE toDate < GETDATE();

	SELECT @ActiveJobs =  COUNT(*) FROM job_table WHERE toDate > GETDATE();
    
    -- Return the counts
    SELECT @UserCount AS UserCount, @JobSeekerCount AS JobSeekerCount, @JobCount AS JobCount,@ExpireJobs AS ExpireJobs,@ActiveJobs AS ActiveJobs;
END;
GO

create procedure getComplaint
as
begin
	select * from complaint_table;
end;
GO

create procedure addComplaint(@userid varchar(100),@complaint nvarchar(max),@userRole varchar(10),@status varchar(10))
as
begin
	insert into complaint_table(userId,complaint,userRole,status) values(@userid,@complaint,@userRole,@status);
end;
GO

create procedure editComplaint(@complaintId int,@status varchar(10))
as
begin
	update complaint_table set status = @status where complaintId = @complaintId;
end;
GO

create procedure deleteComplaint(@complaintId int)
as
begin
	delete from complaint_table where complaintId = @complaintId
end;
GO

