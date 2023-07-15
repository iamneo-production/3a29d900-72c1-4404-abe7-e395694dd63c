using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]

    public class ComplaintBoxController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        [HttpGet("complaintBox/getComplaint")]
        public IActionResult getComplaint()
        {
            List<ComplaintBoxModel> result = bussiness_layer.getComplaint();
            return Ok(result);
        }

        [HttpPost("complaintBox/addComplaint")]
        public IActionResult addcomplaint(ComplaintBoxModel complaintmodel)
        {
            string result = bussiness_layer.addcomplaint(complaintmodel);
            return Ok(result);
        }
        
        [HttpPut("complaintBox/editComplaint/{complaintId}")]
        public IActionResult Editcomplaint(string complaintId, ComplaintBoxModel complaintmodel)
        {
            string result = bussiness_layer.Editcomplaint(complaintId,complaintmodel);
            return Ok(result);
        }

        [HttpDelete("complaintBox/deleteComplaint/{complaintId}")]
        public IActionResult deletecomplaint(string complaintId)
        {
            string result = bussiness_layer.deletecomplaint(complaintId);
            return Ok(result);
        }

    }
}