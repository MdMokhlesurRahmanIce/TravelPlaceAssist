using OSSAV_WebAPI.GenericDataDirectSP;
using OSSAV_WebAPI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static OSSAV_WebAPI.GenericDataDirectSP.AllServiceClasses;

namespace OSSAV_WebAPI.Services
{
    public class TravelAssist: iTravelAssist
    {
        XamarinDBEntities _ctxCmn = null;
        private iTravelAssist objService = null;
        private iGenericFactory_EF<TravelPlace> GenericFactory_EF_TravelPlace = null;
        private iGenericFactory_EF<CmnUser> GenericFactory_EF_CmnUser = null;
        private iGenericFactory_EF<Comments> GenericFactory_EF_Comments = null;
        private iGenericFactory<vmMEASmartEnergyTransportation> GenericFactoryFor_vmMEASmartEnergyTransportation = null;

        private iGenericFactory<vmResidentialInput> GenericFactoryFor_vmResidentialInput = null;

        public CmnUser UserResigtration(CmnUser objCmnUser)
        {
            GenericFactory_EF_CmnUser = new CmnUser_EF();
            CmnUser rtUser = new CmnUser();
             

            using (_ctxCmn = new XamarinDBEntities())
            {
               
                    try
                    {
                        Int64 id = objCmnUser.ID;
                        CmnUser objCom = (from cm in _ctxCmn.CmnUser.Where(m => m.UserName == objCmnUser.UserName) select cm).FirstOrDefault();

                        if (objCom != null)
                        {
                            rtUser = null;
                        }
                        else
                        {
                            CmnUser newCm = new CmnUser();
                            newCm.UserName = objCmnUser.UserName;
                            newCm.Password = objCmnUser.Password;  
                            _ctxCmn.CmnUser.Add(newCm);
                            _ctxCmn.SaveChanges();

                            rtUser = _ctxCmn.CmnUser.ToList().OrderByDescending(k=>k.ID).Take(1).FirstOrDefault();
                        }

                    }
                    catch (Exception e)
                    {
                        e.ToString();
                        rtUser = null;
                    } 
            }
            return rtUser;
        }

        public CmnUser GetLoginUser(CmnUser objCmnUser)
        {
            GenericFactory_EF_CmnUser = new CmnUser_EF();
            CmnUser rtUser = new CmnUser();


            using (_ctxCmn = new XamarinDBEntities())
            {

                try
                {
                    Int64 id = objCmnUser.ID;
                    rtUser = (from cm in _ctxCmn.CmnUser.Where(m => m.UserName == objCmnUser.UserName && m.Password==objCmnUser.Password) select cm).FirstOrDefault();
                     
                }
                catch (Exception e)
                {
                    e.ToString();
                    rtUser = null;
                }
            }
            return rtUser;
        }

        public object[] GettitleAndCommentsList()
        {
            object[] obj = null; 
            using (_ctxCmn = new XamarinDBEntities())
            {
                try
                {
                    obj = (
                           from tp in _ctxCmn.TravelPlace
                           where tp.IsDeleted == false
                           select new
                           {
                               CreateBy = tp.CreateBy,
                               Description = tp.Description,
                               ID = tp.ID,
                               ImageUrl = tp.ImageUrl,
                               IsDeleted = tp.IsDeleted,
                               Title = tp.Title,

                               allComments = (from cmnds in _ctxCmn.Comments
                                             where cmnds.IsDeleted == false && cmnds.TitleID== tp.ID 
                                             select new
                                             {
                                                 ID = cmnds.ID,
                                                 TitleID = cmnds.TitleID,
                                                 Comment = cmnds.Comment,
                                                 IsDeleted = cmnds.IsDeleted,
                                                 CreateBy = cmnds.CreateBy
                                                     
                                             })
                           }).ToArray();
                }
                catch (Exception e)
                {

                }
            }

            return obj;
        }

        public string SaveUpdateTravelPlace(TravelPlace objTravelPlace)
        {
            GenericFactory_EF_TravelPlace = new TravelPlace_EF();
            string result = "";

            using ( _ctxCmn = new XamarinDBEntities())
            {
                if (objTravelPlace.ID > 0)
                { 
                    try
                        {
                            Int64 id = objTravelPlace.ID;
                            TravelPlace objTP = (from tv in _ctxCmn.TravelPlace.Where(m => m.ID == id) select tv).FirstOrDefault();

                        if(objTP!=null)
                        {
                            objTP.Description = objTravelPlace.Description;
                            objTP.ImageUrl = objTravelPlace.ImageUrl;
                            objTP.Title = objTravelPlace.Title; 
                            _ctxCmn.SaveChanges();

                            result = objTP.ID.ToString();
                        }
                            
                        }
                        catch (Exception e)
                        {
                            e.ToString();
                            result = "";
                        }
                    
                }
                else
                { 
                        try
                        {


                        // objTravelPlace.CreateBy = ;

                        TravelPlace newTrP = new TravelPlace();
                        newTrP.CreateBy = objTravelPlace.CreateBy;
                        newTrP.Description = objTravelPlace.Description;
                        newTrP.ImageUrl = objTravelPlace.ImageUrl;
                        newTrP.IsDeleted = false;
                        newTrP.Title = objTravelPlace.Title; 
                            _ctxCmn.TravelPlace.Add(newTrP); 
                            _ctxCmn.SaveChanges();
                         
                            result = _ctxCmn.TravelPlace.Max(k=>k.ID).ToString();
                        }
                        catch (Exception e)
                        {
                            result = "";
                        } 
                }
            }
            return result;
        }

        public string SaveUpdateComments(Comments objComments)
        {
            GenericFactory_EF_Comments = new Comments_EF();
            string result = "";

            using (_ctxCmn = new XamarinDBEntities())
            {
                if (objComments.ID > 0)
                {
                    try
                    {
                        Int64 id = objComments.ID;
                        Comments objCom = (from cm in _ctxCmn.Comments.Where(m => m.ID == id) select cm).FirstOrDefault();

                        if (objCom != null)
                        {
                            objCom.Comment = objComments.Comment;
                            _ctxCmn.SaveChanges();

                            result = objCom.ID.ToString();
                        }

                    }
                    catch (Exception e)
                    {
                        e.ToString();
                        result = "";
                    }

                }
                else
                {
                    try
                    {


                        // objTravelPlace.CreateBy = ;
                        Comments newCm = new Comments();
                        newCm.Comment = objComments.Comment;
                        newCm.CreateBy = objComments.CreateBy;
                        newCm.IsDeleted = false;
                        newCm.TitleID = objComments.TitleID;
                       
                        _ctxCmn.Comments.Add(newCm);
                        _ctxCmn.SaveChanges();

                       result = _ctxCmn.Comments.Max(k => k.ID).ToString();
                        
                    }
                    catch (Exception e)
                    {
                        result = "";
                    }
                }
            }
            return result;
        }

        public string DeleteTravelPlace(vmCmnParam objcmnParam, Int64 ID)
        {
            _ctxCmn = new XamarinDBEntities();
            string result = "";
            if (ID > 0)
            {
                try
                {
                    //TravelPlace delete
                    TravelPlace obj = new TravelPlace();
                    obj = _ctxCmn.TravelPlace.Where(s => s.ID == ID).FirstOrDefault();

                    if (obj != null)
                    {
                        obj.IsDeleted = true;
                        _ctxCmn.SaveChanges();
                        result = obj.Title;
                        List<Comments> lstDet = new List<Comments>();
                        lstDet = _ctxCmn.Comments.Where(s => s.TitleID == ID).ToList();
                        if (lstDet != null)
                        {
                            foreach (Comments cmd in lstDet)
                            {
                                Comments det = _ctxCmn.Comments.Where(l => l.ID == cmd.ID).FirstOrDefault();
                                if (det != null)
                                {
                                    det.IsDeleted = true;
                                    _ctxCmn.SaveChanges(); 
                                }
                            }
                        }
                    }


                }
                catch (Exception e)
                {
                    e.ToString();
                    result = "";
                }
            }
            return result;
        }

        public string DeleteComments(vmCmnParam objcmnParam, Int64 ID)
        {
            _ctxCmn = new XamarinDBEntities();
            string result = "";
            if (ID > 0)
            {
                try
                {
                    //Comments delete
                    Comments obj = new Comments();
                    obj = _ctxCmn.Comments.Where(s => s.ID == ID).FirstOrDefault();

                    if (obj != null)
                    {
                        obj.IsDeleted = true;
                        _ctxCmn.SaveChanges();
                        result = obj.Comment; 
                    }


                }
                catch (Exception e)
                {
                    e.ToString();
                    result = "";
                }
            }
            return result;
        }
    }
}