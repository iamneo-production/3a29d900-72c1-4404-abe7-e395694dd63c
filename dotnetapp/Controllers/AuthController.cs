using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
   
    public class AuthController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        //check the email and password for user login
        [HttpPost("user/login")]
        public IActionResult isUserPresent([FromBody]LoginModel data)
        {
            bool result = bussiness_layer.isUserPresent(data);
            return Ok(result);
        }

        //check the email and password for admin login
        [HttpPost("admin/login")]
        public IActionResult isAdminPresent([FromBody]LoginModel data)
        {
            bool result = bussiness_layer.isAdminPresent(data);
            return Ok(result);
        }

        //check the email and password for jobseeker login
        [HttpPost("jobseeker/login")]
        public IActionResult isJobseekerPresent([FromBody] LoginModel data)
        {
            bool result = bussiness_layer.isJobseekerPresent(data);
            return Ok(result);
        }

        //Add the user or jobseeker data to user database
        [HttpPost("user/signup")]
        public IActionResult saveUser([FromBody] UserModel data)
        {
            string result = bussiness_layer.saveUser(data);
            return Created("usersignup",result);
        }

        //Add the Admin data to admin database
        [HttpPost("admin/signup")]
        public IActionResult saveAdmin([FromBody] AdminModel data)
        {
            string result = bussiness_layer.saveAdmin(data);
            return Created("adminsigup",result);
        }
    }
}