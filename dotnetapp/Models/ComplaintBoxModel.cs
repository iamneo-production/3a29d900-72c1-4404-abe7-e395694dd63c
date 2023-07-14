using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ComplaintBoxModel
    {
        public string complaintId {get; set;} = string.Empty;

        public string userid {get; set;}

        public string complaint {get; set;}

        public string userRole {get; set;}

        public string status {get; set;}
    }
}