using OSSAV_WebAPI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI.GenericDataDirectSP
{
    public class AllServiceClasses
    {
        

        #region System Common Entities


        public class vmMEASmartEnergyTransportation_GF : GenericFactory<XamarinDBEntities, vmMEASmartEnergyTransportation> { }

        public class vmResidentialInput_GF : GenericFactory<XamarinDBEntities, vmResidentialInput> { }


        public class TravelPlace_EF : GenericFactory_EF<XamarinDBEntities, TravelPlace> { }
        public class Comments_EF : GenericFactory_EF<XamarinDBEntities, Comments> { }
        public class CmnUser_EF : GenericFactory_EF<XamarinDBEntities, CmnUser> { }

        //public class CmnUser_EF : GenericFactory_EF<ERP_Entities, CmnUser> { }


        #endregion




        #region db Sample Entities


        //public class tbl_Sales_EF : GenericFactory_EF<dbSampleEntities, tbl_Sales> { }
        #endregion

        #region Commented Entities

        //public class CompanyDDL_EF : GenericFactory_EF<ERP_Entities, CmnCompany> { }
        //public class Organogram_GF : GenericFactory<ERP_Entities, vmCmnOrganogram> { }
        //public class CmnUOMFactory_EF : GenericFactory_EF<ERP_Entities, CmnUOM> { }
        //public class CmnColorFactory_EF : GenericFactory_EF<ERP_Entities, CmnItemColor> { }
        //public class CmnSizeFactory_EF : GenericFactory_EF<ERP_Entities, CmnItemSize> { }
        //public class ItemGroupFF_ddl : GenericFactory_EF<ERP_Entities, CmnItemGroup> { }
        //public partial class CmnItemMaster_EF : GenericFactory_EF<ERP_Entities, CmnItemMaster> { }
        #endregion



    }
}