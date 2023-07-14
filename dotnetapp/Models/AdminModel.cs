using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class AdminModel
    {
        public string email{get; set; }
        public string password{get; set; }
        public string username { get; set; } = string.Empty;
        public string mobileNumber{get; set; }
        public string userRole{get; set; }

    }
}