using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmProject
    {
        public Int32? project_id { get; set; }
        public string project_name { get; set; }
        public string description { get; set; }
        public string feature_list { get; set; }
        public string module_list { get; set; }
        public string link { get; set; }
        public sbyte? isactive { get; set; }

        public string Introduction { get; set; }
        public string Project_Architecture { get; set; }
        public string Name_Of_Modules { get; set; }
        public string Client_List { get; set; }
        public string Challenges { get; set; }
        public string Flow_Chart { get; set; }
        public string Purposes { get; set; }
        public string Visio { get; set; }
        public string Workflow { get; set; }
        public string Label { get; set; }
        public string Number_Of_People_worked { get; set; }
        public string Scope_Of_Improvement { get; set; }
        public string Time_Taken { get; set; }
        public string Client_Testimonials { get; set; }
        public string Project_Category { get; set; }
        public string URL { get; set; }
        public string Objectives { get; set; }
        public string Sub_Category { get; set; }
        public string Freelancing_Platform { get; set; }



    }
}