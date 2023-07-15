using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
  
    public class ReviewController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        [HttpGet("customer/getReview/{personId}")]
        public IActionResult getReview(string personId)
        {
            List<ReviewModel> result = bussiness_layer.getReview(personId);
            return Ok(result);
        }

        [HttpPost("customer/addReview")]
        public IActionResult addReview([FromBody]ReviewModel review)
        {
            string result = bussiness_layer.addReview(review);
            return Ok(result);
        }
    }
}