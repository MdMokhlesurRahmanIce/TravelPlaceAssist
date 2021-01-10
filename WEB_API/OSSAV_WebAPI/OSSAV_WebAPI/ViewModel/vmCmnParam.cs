using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmCmnParam
    {
        public int? loggeduser { get; set; }
        public int? loggedCompany { get; set; }
        public long? Id { get; set; }
        public int? selectedCompany { get; set; }
        public int menuId { get; set; }
        public int? tTypeId { get; set; }
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public int? IsPaging { get; set; }
        //public int? id { get; set; }

        public long? pid { get; set; }
        public string id { get; set; }
        public string program_name { get; set; }
        public string program_type { get; set; }
        public string link { get; set; }
        public Nullable<double> mea_award { get; set; }
        public Nullable<double> total_project_cost { get; set; }
        public string sector { get; set; }
        public Nullable<double> capacity { get; set; }
        public string capacity_units { get; set; }
        public string technology { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public string notes { get; set; }
        public string legislative_district { get; set; }
        public string county { get; set; }

        public Int64? RedcdTotal { get; set; }


    }
}
