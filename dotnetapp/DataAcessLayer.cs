using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using dotnetapp.Models;
using Newtonsoft.Json;

//using static dotnetapp.BusinessLayer;

namespace dotnetapp
{
    internal class DataAccessLayer
    {
        private static SqlConnection GetSqlConnection()
        {
            string connectionString = "User ID=sa;password=examlyMssql@123; server=localhost;Database=Cook_Hiring_System;trusted_connection=false;Persist Security Info=False;Encrypt=False";
            SqlConnection connection = new SqlConnection(connectionString);
            return connection;
        }

        ///summarry
        /// User Controller

        internal static List<UserModel> getUser()
        {
            List<UserModel> userlist = new List<UserModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("getUser",con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        UserModel usermodel = new UserModel();
                        usermodel.email = dr["email"].ToString();
                        usermodel.username = dr["username"].ToString();
                        usermodel.mobileNumber = dr["mobileNumber"].ToString();
                        usermodel.userRole = dr["userRole"].ToString();

                        userlist.Add(usermodel);
                    }
                }
            }
            return userlist;
        }

        internal static List<UserModel> getUserId(string email)
        {
            List<UserModel> userlist = new List<UserModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("getUserById",con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("email",email);
                    cmd.Connection = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        UserModel usermodel = new UserModel();
                        usermodel.email = dr["email"].ToString();
                        usermodel.username = dr["username"].ToString();
                        usermodel.mobileNumber = dr["mobileNumber"].ToString();
                        usermodel.userRole = dr["userRole"].ToString();

                        userlist.Add(usermodel);
                    }
                }
            }
            return userlist;
        }

        internal static string addUser(UserModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandText = "addUser";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);
                        cmd.Parameters.AddWithValue("username", data.username);
                        cmd.Parameters.AddWithValue("mobileNumber", data.mobileNumber);
                        cmd.Parameters.AddWithValue("userRole", data.userRole);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Successfully inserted";
                        }
                        else
                        {
                            return "User email already exists";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        // Rest of the methods using the same pattern...




        internal static string editUser(string UserID, UserModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandText = "editUser";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", UserID);
                        cmd.Parameters.AddWithValue("password", data.password);
                        cmd.Parameters.AddWithValue("username", data.username);
                        cmd.Parameters.AddWithValue("mobileNumber", data.mobileNumber);
                        cmd.Parameters.AddWithValue("userRole", data.userRole);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Successfully updated";
                        }
                        else
                        {
                            return "User email does not exist";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string deleteUser(string UserID)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("deleteUser",con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", UserID);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Successfully deleted";
                        }
                        else
                        {
                            return "Failed to delete";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static List<personModel> dashboard(string jobId)
        {
            List<personModel> persons = new List<personModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("user_post_jobs", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("jobId", jobId);

                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        personModel person = new personModel();
                        person.ID = dr["ID"].ToString();
                        person.personId = dr["personId"].ToString();
                        person.personName = dr["personName"].ToString();
                        person.personAddress = dr["personAddress"].ToString();
                        person.personExp = dr["personExp"].ToString();
                        person.personPhone = dr["personPhone"].ToString();
                        person.personEmail = dr["personEmail"].ToString();
                        person.personStatus = dr["personStatus"].ToString();

                        string jobModelJson = dr["jobModel"].ToString();
                        JobModel jobModel = JsonConvert.DeserializeObject<JobModel>(jobModelJson);
                        person.JobModel = jobModel;

                        persons.Add(person);
                    }
                }
            }
            return persons;
        }

        ///summarry
        //Job controller

        internal static List<JobModel> getJob()
        {
            List<JobModel> joblist = new List<JobModel>();

            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = "getjob";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        JobModel jm = new JobModel();
                        jm.jobId = dr["jobId"].ToString();
                        jm.email = dr["email"].ToString();
                        jm.jobDescription = dr["jobDescription"].ToString();
                        jm.jobLocation = dr["jobLocation"].ToString();
                        jm.fromDate = Convert.ToDateTime(dr["fromDate"].ToString());
                        jm.toDate = Convert.ToDateTime(dr["toDate"].ToString());
                        jm.wagePerDay = dr["wagePerDay"].ToString();
                        jm.phoneNumber = dr["phoneNumber"].ToString();

                        joblist.Add(jm);
                    }
                }
            }

            return joblist;
        }

        internal static string addJob(JobModel Data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("addJob", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("Email", Data.email);
                        cmd.Parameters.AddWithValue("jobDescription", Data.jobDescription);
                        cmd.Parameters.AddWithValue("jobLocation", Data.jobLocation);
                        cmd.Parameters.AddWithValue("fromDate", Data.fromDate);
                        cmd.Parameters.AddWithValue("toDate", Data.toDate);
                        cmd.Parameters.AddWithValue("wagePerDay", Data.wagePerDay);
                        cmd.Parameters.AddWithValue("phoneNumber", Data.phoneNumber);

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Job added";
                        else
                            return "Job not added";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string editJob(string jobId, JobModel Data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("editJob", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("jobId", jobId);
                        cmd.Parameters.AddWithValue("jobDescription", Data.jobDescription);
                        cmd.Parameters.AddWithValue("jobLocation", Data.jobLocation);
                        cmd.Parameters.AddWithValue("fromDate", Data.fromDate);
                        cmd.Parameters.AddWithValue("toDate", Data.toDate);
                        cmd.Parameters.AddWithValue("wagePerDay", Data.wagePerDay);
                        cmd.Parameters.AddWithValue("phoneNumber", Data.phoneNumber);

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Job edited";
                        else
                            return "Edit failed";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string deleteJob(string jobId)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("deletejob", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("jobId", jobId);

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Job deleted";
                        }
                        else
                        {
                            return "Failed to delete";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        ///Sumarry
        ///Admin Controller

        internal static List<personModel> ViewProfile()
        {
            using (SqlConnection con = GetSqlConnection())
            {
                List<personModel> personmodel = new List<personModel>();
                using (SqlCommand cmd = new SqlCommand("viewprofile", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        personModel person = new personModel();
                        person.ID = dr["ID"].ToString();
                        person.personId = dr["personId"].ToString();
                        person.personName = dr["personName"].ToString();
                        person.personAddress = dr["personAddress"].ToString();
                        person.personExp = dr["personExp"].ToString();
                        person.personPhone = dr["personPhone"].ToString();
                        person.personEmail = dr["personEmail"].ToString();
                        person.personStatus = dr["personStatus"].ToString();
                        // Deserialize the JSON data for JobModel
                        string jobModelJson = dr["jobModel"].ToString();
                        JobModel jobModel = JsonConvert.DeserializeObject<JobModel>(jobModelJson);
                        person.JobModel = jobModel;

                        personmodel.Add(person);
                    }
                }
                return personmodel;
            }
        }

        internal static List<JobModel> getallappliedjobs()
        {
            using (SqlConnection con = GetSqlConnection())
            {
                List<JobModel> joblist = new List<JobModel>();
                using (SqlCommand cmd = new SqlCommand("getall_Appliedjobs", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        personModel person = new personModel();
                        // reading applied jobs data from personModel
                        string job = dr["jobModel"].ToString();
                        // Deserialize the JSON data for jobModel
                        JobModel jobModel = JsonConvert.DeserializeObject<JobModel>(job);

                        //adding the all appllied_jobs Deserialize data to the list to return
                        joblist.Add(jobModel);
                    }
                }
                return joblist;
            }
        }

        internal static List<personModel> appliedjobs(string personId)
        {
            using (SqlConnection con = GetSqlConnection())
            {
                List<personModel> personmodel = new List<personModel>();
                using (SqlCommand cmd = new SqlCommand("appliedjob", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("personId", personId);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        personModel person = new personModel();
                        person.ID = dr["ID"].ToString();
                        person.personId = dr["personId"].ToString();
                        person.personName = dr["personName"].ToString();
                        person.personAddress = dr["personAddress"].ToString();
                        person.personExp = dr["personExp"].ToString();
                        person.personPhone = dr["personPhone"].ToString();
                        person.personEmail = dr["personEmail"].ToString();
                        person.personStatus = dr["personStatus"].ToString();
                        string job = dr["jobModel"].ToString();
                        JobModel jobModel = JsonConvert.DeserializeObject<JobModel>(job);
                        person.JobModel = jobModel;

                        personmodel.Add(person);
                    }
                }
                return personmodel;
            }
        }

        internal static string addprofile(personModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("insertperson", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        // Set the parameter values
                        cmd.Parameters.AddWithValue("personId", data.personId);
                        cmd.Parameters.AddWithValue("personName", data.personName);
                        cmd.Parameters.AddWithValue("personAddress", data.personAddress);
                        cmd.Parameters.AddWithValue("personExp", data.personExp);
                        cmd.Parameters.AddWithValue("personPhone", data.personPhone);
                        cmd.Parameters.AddWithValue("personEmail", data.personEmail);
                        // Serialize the JSON data for jobModel
                        cmd.Parameters.AddWithValue("jobModel",JsonConvert.SerializeObject(data.JobModel));

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Profile added";
                        else
                            return "Already applied";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string EditProfile(string id, personModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("editprofile", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        // Set the parameter values
                        cmd.Parameters.AddWithValue("ID", id);
                        cmd.Parameters.AddWithValue("personName", data.personName);
                        cmd.Parameters.AddWithValue("personAddress", data.personAddress);
                        cmd.Parameters.AddWithValue("personExp", data.personExp);
                        cmd.Parameters.AddWithValue("personPhone", data.personPhone);
                        cmd.Parameters.AddWithValue("personEmail", data.personEmail);
                        cmd.Parameters.AddWithValue("personStatus", data.personStatus);
                        // Serialize the JSON data for jobModel
                        cmd.Parameters.AddWithValue("jobModel",JsonConvert.SerializeObject(data.JobModel));

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Profile updated";
                        else
                            return "Update failed";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string DeleteProfile(string id)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("deleteprofile", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("ID", id);
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Profile deleted";
                        }
                        else
                        {
                            return "Deletion failed";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        ///Report
        internal static List<ReportModel> report()
        {
            using (SqlConnection con = GetSqlConnection())
            {
                List<ReportModel> ReportList = new List<ReportModel>();
                using (SqlCommand cmd = new SqlCommand("TotalReports", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        ReportModel reportModel = new ReportModel();
                        reportModel.UserCount = dr["UserCount"].ToString();
                        reportModel.JobSeekerCount = dr["JobSeekerCount"].ToString();
                        reportModel.JobCount = dr["JobCount"].ToString();
                        reportModel.ExpireJobs = dr["ExpireJobs"].ToString();
                        reportModel.ActiveJobs = dr["ActiveJobs"].ToString();

                        ReportList.Add(reportModel);
                    }
                }
                return ReportList;
            }
        }

        ///summary
        ///Auth Controller

        internal static bool isUserPresent(LoginModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("userLogin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);

                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();

                        if (dr.Read())
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        internal static bool isAdminPresent(LoginModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("adminlogin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);

                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();

                        if (dr.Read())
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        internal static bool isJobseekerPresent(LoginModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("jobseekerLogin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);

                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();

                        if (dr.Read())
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        internal static string saveUser(UserModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("addUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);
                        cmd.Parameters.AddWithValue("username", data.username);
                        cmd.Parameters.AddWithValue("mobileNumber", data.mobileNumber);
                        cmd.Parameters.AddWithValue("userRole", data.userRole);

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "User added";
                        else
                            return "Email already exists";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string saveAdmin(AdminModel data)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("addAdmin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("email", data.email);
                        cmd.Parameters.AddWithValue("password", data.password);
                        cmd.Parameters.AddWithValue("mobileNumber", data.mobileNumber);
                        cmd.Parameters.AddWithValue("userRole", data.userRole);

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Admin added";
                        else
                            return " Email already exists";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        ///Sumarry
        ///ChatBox Controller

        internal static List<ChatModel> getCustomerChat(string jobseekerid)
        {
            List<ChatModel> chatlist = new List<ChatModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("get_jobseeker_chat", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("jobseekerid", jobseekerid);

                    cmd.Connection = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        ChatModel chatModel = new ChatModel();
                        chatModel.id = dr["id"].ToString();
                        chatModel.customerid = dr["customerid"].ToString();
                        chatModel.sender = dr["sender"].ToString();
                        chatModel.jobseekerid = dr["jobseekerid"].ToString();
                        chatModel.content = dr["content"].ToString();
                        chatModel.timestamp = Convert.ToDateTime(dr["timestamp"].ToString());

                        chatlist.Add(chatModel);
                    }
                }
            }
            return chatlist;
        }

        internal static string setCustomerChat(ChatModel chatmodel)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("set_customer_chat", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("customerid", chatmodel.customerid);
                        cmd.Parameters.AddWithValue("sender", chatmodel.sender);
                        cmd.Parameters.AddWithValue("jobseekerid", chatmodel.jobseekerid);
                        cmd.Parameters.AddWithValue("content", chatmodel.content);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Successfully inserted";
                        else
                            return "failed";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static List<ChatModel> getJobseekerChat(string customerid)
        {
            List<ChatModel> chatlist = new List<ChatModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("get_customer_chat", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("customerid", customerid);

                    cmd.Connection = con;

                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        ChatModel chatModel = new ChatModel();
                        chatModel.id = dr["id"].ToString();
                        chatModel.customerid = dr["customerid"].ToString();
                        chatModel.sender = dr["sender"].ToString();
                        chatModel.jobseekerid = dr["jobseekerid"].ToString();
                        chatModel.content = dr["content"].ToString();
                        chatModel.timestamp = Convert.ToDateTime(dr["timestamp"].ToString());

                        chatlist.Add(chatModel);
                    }
                }
            }
            return chatlist;
        }

        internal static string setJobseekerChat(ChatModel chatmodel)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("set_jobseeker_chat", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("customerid", chatmodel.customerid);
                        cmd.Parameters.AddWithValue("sender", chatmodel.sender);
                        cmd.Parameters.AddWithValue("jobseekerid", chatmodel.jobseekerid);
                        cmd.Parameters.AddWithValue("content", chatmodel.content);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();
                        con.Close();

                        if (roweffect > 0)
                            return "Successfully inserted";
                        else
                            return "failed";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        ///summary
        ///Review Controller

        internal static List<ReviewModel> getReview(string personId)
        {
            List<ReviewModel> reviewlist = new List<ReviewModel>();
            using (SqlConnection con = GetSqlConnection())
            {
                using (SqlCommand cmd = new SqlCommand("Get_Review", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("personId", personId);
                    cmd.Connection = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        ReviewModel reviewmodel = new ReviewModel();
                        reviewmodel.userId = dr["userId"].ToString();
                        reviewmodel.rating = int.Parse(dr["rating"].ToString());
                        reviewmodel.comments = dr["comments"].ToString();
                        reviewmodel.personId = dr["personId"].ToString();

                        reviewlist.Add(reviewmodel);
                    }
                }
            }
            return reviewlist;
        }

        internal static string addReview(ReviewModel review)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("Insert_Review", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("userid", review.userId);
                        cmd.Parameters.AddWithValue("rating", review.rating);
                        cmd.Parameters.AddWithValue("comments", review.comments);
                        cmd.Parameters.AddWithValue("personId", review.personId);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Successfully inserted";
                        }
                        else
                        {
                            return "insertion failed";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        ///summary
        ///complaint box

        internal static List<ComplaintBoxModel> getComplaint()
        {
            using(SqlConnection con = GetSqlConnection())
            {
                List<ComplaintBoxModel> complaint_list = new List<ComplaintBoxModel>();
                using(SqlCommand cmd = new SqlCommand("getComplaint",con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection  = con;
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while(dr.Read())
                    {
                        ComplaintBoxModel complaintmodel = new ComplaintBoxModel();
                        complaintmodel.complaintId = dr["complaintId"].ToString();
                        complaintmodel.userid = dr["userid"].ToString();
                        complaintmodel.complaint = dr["complaint"].ToString();
                        complaintmodel.userRole = dr["userRole"].ToString();
                        complaintmodel.status = dr["status"].ToString();

                        complaint_list.Add(complaintmodel);
                    }
                }
                return complaint_list;
            }
        }

        internal static string addcomplaint(ComplaintBoxModel complaintmodel)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("addComplaint", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("userid", complaintmodel.userid);
                        cmd.Parameters.AddWithValue("complaint", complaintmodel.complaint);
                        cmd.Parameters.AddWithValue("userRole", complaintmodel.userRole);
                        cmd.Parameters.AddWithValue("status", complaintmodel.status);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Complaint added";
                        }
                        else
                        {
                            return "failed";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string Editcomplaint(string complaintId, ComplaintBoxModel complaintmodel)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("editComplaint", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        // Set the parameter values
                        cmd.Parameters.AddWithValue("complaintId", complaintId);
                        cmd.Parameters.AddWithValue("status", complaintmodel.status);
                        

                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                            return "Complaint updated";
                        else
                            return "Update failed";
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        internal static string deletecomplaint(string complaintId)
        {
            try
            {
                using (SqlConnection con = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("deleteComplaint",con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("complaintId", complaintId);

                        cmd.Connection = con;
                        con.Open();
                        int roweffect = cmd.ExecuteNonQuery();

                        if (roweffect > 0)
                        {
                            return "Successfully deleted";
                        }
                        else
                        {
                            return "Failed to delete";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

    }
}
