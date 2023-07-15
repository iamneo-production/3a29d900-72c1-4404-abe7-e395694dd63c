using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;


namespace dotnetapp
{
    public class BusinessLayer
    {
        ///summarry
        //User controller
        public List<UserModel> getUser()
        {
            return DataAccessLayer.getUser();
        }

        public List<UserModel> getUserId(string email)
        {
            return DataAccessLayer.getUserId(email);
        }

        public string addUser(UserModel data)
        {
            return DataAccessLayer.addUser(data);
        }

        public string editUser(string UserID,UserModel data){
            return DataAccessLayer .editUser(UserID,data);
        }
        public string deleteUser(string UserID)
        {
            return DataAccessLayer.deleteUser(UserID);
        }
        
        public List<personModel> dashboard(string jobId){
            return DataAccessLayer.dashboard(jobId);
        }
              
        ///summarry     
        //Job controller
        public List<JobModel> getJob()
        {
            return DataAccessLayer.getJob();
        }

        public string addJob(JobModel Data)
        {
            return DataAccessLayer.addJob(Data);
        }

        public string editJob(string jobId, JobModel Data){
            return DataAccessLayer.editJob(jobId,Data);
        }

        public string deletejob(string jobId)
        {
            return DataAccessLayer.deleteJob(jobId);
        }

        ///summarry
        ///Admin Controller

        public List<personModel> Profile()//change
        {
            return DataAccessLayer.ViewProfile();
        }

        public List<JobModel> getallappliedjobs()
        {
            return DataAccessLayer.getallappliedjobs();
        }

        public List<personModel> appliedjobs(string personId)
        {
            return DataAccessLayer.appliedjobs(personId);
        }

        public string addprofile(personModel data)
        {
            return DataAccessLayer.addprofile(data);
        }

        public string EditProfile(string id, personModel data)
        {
            return DataAccessLayer.EditProfile(id,data);
        }

        public string DeleteProfile(string id)
        {
            return DataAccessLayer.DeleteProfile(id);
        }

        //admin report
        public List<ReportModel> report()
        {
            return DataAccessLayer.report();
        }

        ///summarry
        ///Auth controller
        public bool isUserPresent(LoginModel data)
        {
            return DataAccessLayer.isUserPresent(data);
        }

        public bool isAdminPresent(LoginModel data)
        {
            return DataAccessLayer.isAdminPresent(data);
        }

        public bool isJobseekerPresent(LoginModel data)
        {
            return DataAccessLayer.isJobseekerPresent(data);
        }

        public string saveUser(UserModel data)
        {
            return DataAccessLayer.saveUser(data);
        }

        public string saveAdmin(AdminModel data)
        {
            return DataAccessLayer.saveAdmin(data);
        }

        ///summarry
        ///ChatBox controller


        public List<ChatModel> getCustomerChat(string jobseekerid)
        {
            return DataAccessLayer.getCustomerChat(jobseekerid);
        }

        public string setCustomerChat( ChatModel chatmodel)
        {
            return DataAccessLayer.setCustomerChat(chatmodel);
        }

        public List<ChatModel> getJobseekerChat(string customerid)
        {
            return DataAccessLayer.getJobseekerChat(customerid);
        }

        public string setJobseekerChat( ChatModel chatmodel)
        {
           return DataAccessLayer.setJobseekerChat(chatmodel);
        }

        ///summarry
        ///Review Controller
        
        public string addReview(ReviewModel review)
        {
            return DataAccessLayer.addReview(review);
        }
        
        public List<ReviewModel> getReview(string personId)
        {
            return DataAccessLayer.getReview(personId);
        }

        

        /// complaint box
        public List<ComplaintBoxModel> getComplaint()
        {
            return DataAccessLayer.getComplaint();
        }

        public string addcomplaint(ComplaintBoxModel complaintmodel)
        {
            return DataAccessLayer.addcomplaint(complaintmodel);
        }

        public string Editcomplaint(string complaintId, ComplaintBoxModel complaintmodel)
        {
            return DataAccessLayer.Editcomplaint(complaintId,complaintmodel);
        }

        public string deletecomplaint(string complaintId)
        {
            return DataAccessLayer.deletecomplaint(complaintId);
        }
    
    }
}