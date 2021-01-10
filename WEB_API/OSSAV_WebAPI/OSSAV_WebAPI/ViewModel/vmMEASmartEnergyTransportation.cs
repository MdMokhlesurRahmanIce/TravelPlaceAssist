using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmMEASmartEnergyTransportation
    {
        public int? RedcdTotal { get; set; }

        public long? AutoId { get; set; }
        public string id { get; set; }
        public string program_name { get; set; }
        public string link { get; set; }
        public string program_type { get; set; }
        public string project_name { get; set; }
        public string recipient_region_s_if_applicable { get; set; }
        public Nullable<double> mea_award { get; set; }
        public Nullable<double> total_project_cost { get; set; }
        public string sector { get; set; }
        public string vehicle_technology { get; set; }
        public string charging_fueling_station_technology { get; set; }
        public string public_or_private { get; set; }
        public Nullable<double> gallons_of_gasoline_equivalent_avoided { get; set; }
        public Nullable<double> co2_emissions_reductions_tons { get; set; }
        public string notes { get; set; }
        public string point { get; set; }
        public string county { get; set; }
        public string legislative { get; set; }
        public Nullable<double> congressional { get; set; }
        public Nullable<double> zipcode { get; set; }

    }
}