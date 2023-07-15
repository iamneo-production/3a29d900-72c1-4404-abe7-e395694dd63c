using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class personModel
    {
        public string ID {get;set;} = string.Empty;
        public string personId { get; set; } = string.Empty;
        public string personName { get; set; }
        public string personAddress { get; set; }
        public string personExp { get; set; }
        public string personPhone { get; set; }
        public string personEmail { get; set; }
        public string personStatus {get; set;} = string.Empty;
        //initialized object for JobModel to store job details
        public JobModel JobModel { get; set; }
        
    }
}