using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmUserWiseZoneAssign
    {
        public string Remarks { get; set; }
        public string LoginID { get; set; }
        public string LoginEmail { get; set; }
        public long? UserWiseZoneAssignID { get; set; }
        public string UserFullName { get; set; }
        public string ZoneFullName { get; set; }
        public string IsActiveString { get; set; }
        public Nullable<int> ZoneID { get; set; }
        public Nullable<long> UserID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
        public string CreatePc { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateOn { get; set; }
        public string UpdatePc { get; set; }
        public bool? IsDeleted { get; set; }
        public Nullable<int> DeleteBy { get; set; }
        public Nullable<System.DateTime> DeleteOn { get; set; }
        public string DeletePc { get; set; }
    }
}