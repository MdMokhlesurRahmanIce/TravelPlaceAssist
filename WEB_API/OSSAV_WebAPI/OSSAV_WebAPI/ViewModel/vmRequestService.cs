using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmRequestService
    {
        public long ReqSNSID { get; set; }
        public Nullable<System.DateTime> RequestDate { get; set; }
        public Nullable<System.DateTime> ApproxEndDate { get; set; }
        public string RequestFor { get; set; }
        public string StatusString { get; set; }

        public string ZoneFullName { get; set; }

        public Nullable<Int32> RequestToZoneID { get; set; }
        public Nullable<int> StatusID { get; set; }
        public Nullable<long> RequestByID { get; set; }
        public Nullable<long> RequestTo { get; set; }

        public Nullable<long> DoneByID { get; set; }
        public Nullable<System.DateTime> DoneDate { get; set; }
        public byte[] RequestingImage { get; set; }
        public string RequestingImageUrl { get; set; }
        public byte[] DoneImage { get; set; }
        public string DoneImageUrl { get; set; }
        public string RequestRemarks { get; set; }
        public string DoneRemarks { get; set; }
        public Nullable<bool> IsComplete { get; set; }
        public Nullable<bool> IsPending { get; set; }
        public Nullable<bool> IsDone { get; set; }
        public Nullable<bool> IsRatingDone { get; set; }
        public Nullable<int> RatingScore { get; set; }
        public string RatingScorerComment { get; set; }
        public Nullable<bool> IsArgent { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
        public string CreatePc { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateOn { get; set; }
        public string UpdatePc { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<int> DeleteBy { get; set; }
        public Nullable<System.DateTime> DeleteOn { get; set; }
        public string DeletePc { get; set; }
    }
}
