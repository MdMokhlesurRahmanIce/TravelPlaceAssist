using Newtonsoft.Json;
using OSSAV_WebAPI.GenericDataDirectSP;
using OSSAV_WebAPI.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using static OSSAV_WebAPI.GenericDataDirectSP.AllServiceClasses;


using MySql.Data.MySqlClient;
using System.Configuration;
using OSSAV_WebAPI.Services;

//using System.Transactions;

namespace OSSAV_WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [System.Web.Http.RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        XamarinDBEntities db = new XamarinDBEntities();
        private iTravelAssist objService = null;
        private iGenericFactory<vmMEASmartEnergyTransportation> GenericFactoryFor_vmMEASmartEnergyTransportation = null;

        private iGenericFactory<vmResidentialInput> GenericFactoryFor_vmResidentialInput = null;

        ConvertDataTableToGenericList classDt = new ConvertDataTableToGenericList();
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;

        public LoginController()
        {
            objService = new TravelAssist();
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;

        }

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
 

        [System.Web.Http.ActionName("GetLoginUser")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetLoginUser(object[] data)
        {
            CmnUser objUser = JsonConvert.DeserializeObject<CmnUser>(data[0].ToString());

            CmnUser loginUser = new CmnUser();

            try
            {
                loginUser = objService.GetLoginUser(objUser);
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                loginUser
            });
        }

        [System.Web.Http.ActionName("UserResigtration")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UserResigtration(object[] data)
        {
            CmnUser objUserRes = JsonConvert.DeserializeObject<CmnUser>(data[0].ToString());

            try
            {
                objUserRes = objService.UserResigtration(objUserRes);
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                objUserRes
            });
        }



        [System.Web.Http.ActionName("GettitleAndCommentsList")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GettitleAndCommentsList(object[] data)
        {

            object[] lsttitleAndCommentsList = null; 
            try
            {
                lsttitleAndCommentsList = objService.GettitleAndCommentsList();
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                lsttitleAndCommentsList
            });
        }

        [System.Web.Http.ActionName("SaveUpdateTravelPlace")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage SaveUpdateTravelPlace(object[] data)
        {
            TravelPlace objTravelPlace = JsonConvert.DeserializeObject<TravelPlace>(data[0].ToString());
            string result = "";
            try
            {
                if (objTravelPlace != null && objTravelPlace.Title.ToString() != "")
                {
                    result = objService.SaveUpdateTravelPlace(objTravelPlace);
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception e)
            {
                e.ToString();
                result = "";
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [System.Web.Http.ActionName("SaveUpdateComments")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage SaveUpdateComments(object[] data)
        {
            Comments objComments = JsonConvert.DeserializeObject<Comments>(data[0].ToString());
            string result = "";
            try
            {
                if (objComments != null && objComments.Comment.ToString() != "")
                {
                    result = objService.SaveUpdateComments(objComments);
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception e)
            {
                e.ToString();
                result = "";
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [System.Web.Http.ActionName("DeleteTravelPlace")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage DeleteTravelPlace(object[] data)
        {
            string result = "";
            try
            {
                vmCmnParam objcmnParam = JsonConvert.DeserializeObject<vmCmnParam>(data[0].ToString());

                Int64 ID = Convert.ToInt64(objcmnParam.pid);

                if (ID != 0)
                {
                    result = objService.DeleteTravelPlace(objcmnParam, ID);
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception e)
            {
                e.ToString();
                result = "";
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [System.Web.Http.ActionName("DeleteComments")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage DeleteComments(object[] data)
        {
            string result = "";
            try
            {
                vmCmnParam objcmnParam = JsonConvert.DeserializeObject<vmCmnParam>(data[0].ToString());

                Int64 ID = Convert.ToInt64(objcmnParam.pid);

                if (ID != 0)
                {
                    result = objService.DeleteComments(objcmnParam, ID);
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception e)
            {
                e.ToString();
                result = "";
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
         


    }
}