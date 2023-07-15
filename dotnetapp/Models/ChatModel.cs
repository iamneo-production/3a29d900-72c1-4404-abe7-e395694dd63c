using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ChatModel
    {
        public string id {get; set;} = string.Empty;
        public string customerid {get; set;}
        public string sender {get; set;}
        public string jobseekerid {get;set;}
        public string content {get; set;}
        public DateTime? timestamp {get; set;}

    }
}