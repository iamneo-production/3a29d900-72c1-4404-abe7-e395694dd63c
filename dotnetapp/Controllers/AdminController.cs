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

    public class AdminController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        // return all jobseeker profiles
        [HttpGet("admin/Profile")]
        public IActionResult ViewProfile()
        {
            List<personModel> result= bussiness_layer.Profile();
            return Ok(result);
        }

        [HttpGet("jobseeker/getAppliedjobs")]
        public IActionResult getallappliedjobs()
        {
            List<JobModel> result= bussiness_layer.getallappliedjobs();
            return Ok(result);
        }
        

        //add the jobseeker profile for to apply a job
        [HttpPost("admin/addProfile")]
        public IActionResult addprofile([FromBody] personModel data)
        {
           string result = bussiness_layer.addprofile(data);
           return Ok(result);
        }


        [HttpGet("jobseeker/getJobs")]
        public IActionResult getJob()
        {
            List<JobModel> result = bussiness_layer.getJob();
            return Ok(result);
        }

        //Edit the jobseeker details for applied job
        [HttpPut("jobseeker/editProfile/{id}")]
        public IActionResult EditProfile(string id,[FromBody] personModel data)
        {
            string result =  bussiness_layer.EditProfile(id,data);
            return Ok(result);
        }

        //Delete the jobseeker detailes for apllied job
        [HttpDelete("jobseeker/deleteProfile/{id}")]
        public IActionResult DeleteProfile(string id)
        {
            string result = bussiness_layer.DeleteProfile(id);
            return Ok(result);
        }

        //Total all users and jobseeker and jobs report
        [HttpGet("admin/report")]
        public IActionResult report()
        {
            List<ReportModel> result = bussiness_layer.report();
            return Ok(result);
        }

    }
}