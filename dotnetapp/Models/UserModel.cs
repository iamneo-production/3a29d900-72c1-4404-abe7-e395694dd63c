using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace dotnetapp.Models
{
    public class UserModel
    {
        public string email { get; set; }

        public string password { get; set; } = string.Empty;

        public string username { get; set; }

        public string mobileNumber { get; set; }

        public string userRole { get; set; }
    }
}