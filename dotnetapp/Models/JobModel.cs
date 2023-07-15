using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class JobModel
    {
    
        public string jobId {get;set;} = string.Empty;
        public string email { get; set; } = string.Empty;
        public string jobDescription { get; set; }
        public string jobLocation { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string wagePerDay { get; set; }
        public string phoneNumber{ get; set;} = string.Empty;
    }
}