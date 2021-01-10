using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmTravelPlaceAssist
    {
        public long? ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<long> CreateBy { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

        public Nullable<long> TitleID { get; set; }
        public string Comments { get; set; }
    }
}