using OSSAV_WebAPI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSSAV_WebAPI.Services
{
    public interface iTravelAssist
    {
        object[] GettitleAndCommentsList();
        string SaveUpdateTravelPlace(TravelPlace objTravelPlace);
        string SaveUpdateComments(Comments objComments);
        string DeleteTravelPlace(vmCmnParam objcmnParam, Int64 ID);
        string DeleteComments(vmCmnParam objcmnParam, Int64 ID);

        CmnUser GetLoginUser(CmnUser objCmnUser);
        CmnUser UserResigtration(CmnUser objCmnUser);

    }
}
