using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.ViewModel
{
    public class vmOrder
    {
        public long? ID { get; set; }
        public Nullable<int> OrderID { get; set; }
        public Nullable<int> OrderDetaiID { get; set; }
        public Nullable<int> ProductID { get; set; }
        public Nullable<int> UnitID { get; set; }
        public Nullable<double> Price { get; set; }
        public Nullable<double> Quantity { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

        public Nullable<int> OrderNo { get; set; }
        public string Customer { get; set; }
        public Nullable<bool> IfExpressDelivery { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Address { get; set; }

    }
}