using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ReviewModel
    {
        public string userId{ get; set; }

        public int rating { get; set; }

        public string comments { get; set; }
        
        public string personId {get; set;}
    }
}