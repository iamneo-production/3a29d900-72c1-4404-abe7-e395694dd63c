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
    public class ChatBoxController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        [HttpGet("chatBox/getCustomerChat/{jobseekerid}")]
        public IActionResult getCustomerChat(string jobseekerid)
        {
            List<ChatModel> result = bussiness_layer.getCustomerChat(jobseekerid);
            return Ok(result);
        }

        [HttpPost("chatBox/setCustomerChat")]
        public IActionResult setCustomerChat([FromBody] ChatModel chatmodel)
        {
            string result = bussiness_layer.setCustomerChat(chatmodel);
            return Ok(result);
        }

        [HttpGet("chatBox/getJobseekerChat/{customerid}")]
        public IActionResult getJobseekerChat(string customerid)
        {
            List<ChatModel> result = bussiness_layer.getJobseekerChat(customerid);
            return Ok(result);
        }

        [HttpPost("chatBox/setJobseekerChat")]
        public IActionResult setJobseekerChat([FromBody] ChatModel chatmodel)
        {
           string result = bussiness_layer.setJobseekerChat(chatmodel);
           return Ok(result);
        }
    }
}