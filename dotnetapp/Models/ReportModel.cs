using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ReportModel
    {
        public string UserCount {get; set;}
        public string JobSeekerCount {get; set;}
        public string JobCount {get; set;}
        public string ExpireJobs {get; set;}
        public string ActiveJobs {get; set;}
    }
}