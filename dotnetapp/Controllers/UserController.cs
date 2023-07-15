using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Newtonsoft.Json;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();
        
        ///summarry
        ///Required functionality : same table for store user and joobseeker data

        //Get all user and joobseeker from user Database
        [HttpGet("user/getUser")]
        public IActionResult getUser()
        {
            List<UserModel> result = bussiness_layer.getUser();
            return Ok(result);
        }

        [HttpGet("user/getUser/{email}")]
        public IActionResult getUser(string email)
        {
            List<UserModel> result = bussiness_layer.getUserId(email);
            return Ok(result);
        }

        //Add the new user to user database
        [HttpPost("user/addUser")]
        public IActionResult addUser([FromBody] UserModel data)
        {
            string result = bussiness_layer.addUser(data);
            return Ok(result);
        }

        //Edit user or joobseeker by Id from user database
        [HttpPut("admin/editProfile/{UserID}")]
        public IActionResult editUser(string UserID,[FromBody]UserModel data){
            string result = bussiness_layer.editUser(UserID,data);
            return Ok(result);
        }

        //Delete user or jobseeker by Id from User database
        [HttpDelete("admin/deleteProfile/{UserID}")]
        public IActionResult deleteUser(string UserID)
        {
            string result = bussiness_layer.deleteUser(UserID);
            return Ok(result);
        }

        //get the list of jobs from the customers
        [HttpGet("user/dashboard")]
        public IActionResult dashboard()
        {
            List<JobModel> result = bussiness_layer.getJob();
            return Ok(result);
        }
        
        // get the list of jobs posted by a particular customer
        [HttpGet("user/dashboard/{jobId}")]
        public IActionResult dashboard(string jobId){
            List<personModel> result = bussiness_layer.dashboard(jobId);
            return Ok(result);
        }
              
    }
}