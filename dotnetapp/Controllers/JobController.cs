using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class JobController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();
        
        //Get the all user posted jobs data
        [HttpGet("admin/getalljobs")]
        public IActionResult GetJob()
        {
            List<JobModel> result = bussiness_layer.getJob();
            return Ok(result);
        }

        //Add new a job data
        [HttpPost("admin/addJob")]
        public IActionResult addJob([FromBody] JobModel Data)
        {
            string result = bussiness_layer.addJob(Data);
            return Ok(result);
        }

        //Edit job data by jobId
        [HttpPut("admin/editJob/{jobId}")]
        public IActionResult editJob(string jobId,[FromBody] JobModel Data)
        {
            string result = bussiness_layer.editJob(jobId,Data);
            return Ok(result);
        }

        //Delete job by jobId
        [HttpDelete("admin/deleteJob/{jobId}")]
        public IActionResult deletejob(string jobId)
        {
            string result = bussiness_layer.deletejob(jobId);
            return Ok(result);
        }

        //get the list of jobs applied by jobseeker by id
        [HttpGet("jobseeker/getAppliedjobs/{personId}")]
        public IActionResult appliedjobs(string personId)
        {
            List<personModel> result= bussiness_layer.appliedjobs(personId);
            return Ok(result);
        }
    }
}