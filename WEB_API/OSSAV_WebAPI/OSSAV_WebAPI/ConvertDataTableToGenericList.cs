using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace OSSAV_WebAPI
{
    public class ConvertDataTableToGenericList
    {
        public static T ConvertFromDBVal<T>(object obj)
        {
            if (obj == null || obj == DBNull.Value)
            {
                return default(T); // returns the default value for the type
            }
            else
            {
                return (T)obj;
            }
        }
        public DataTable GetData(SqlCommand objCmd)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["HumatData"].ConnectionString))
            {
                con.Open();

                DataTable dt = new DataTable();

                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    objCmd.Connection = con;
                    //objCmd.ExecuteNonQuery();
                    sda.SelectCommand = objCmd;

                    sda.Fill(dt);
                    con.Close();
                    return dt;
                }
            }
        }

        public DataSet GetDataSet(SqlCommand objCmd)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["HumatData"].ConnectionString))
            {
                con.Open();

                DataSet ds = new DataSet();

                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    objCmd.Connection = con;
                    //objCmd.ExecuteNonQuery();
                    sda.SelectCommand = objCmd;

                    sda.Fill(ds);
                    con.Close();
                    return ds;
                }
            }
        }

        public static List<T> BindList<T>(DataTable dt)
        {
            // Example 1:
            // Get private fields + non properties
            //var fields = typeof(T).GetFields(BindingFlags.NonPublic | BindingFlags.Instance);

            // Example 2: Your case
            // Get all public fields
            var fields = typeof(T).GetProperties();

            List<T> lst = new List<T>();

            foreach (DataRow dr in dt.Rows)
            {
                // Create the object of T
                var ob = Activator.CreateInstance<T>();

                foreach (var fieldInfo in fields)
                {
                    foreach (DataColumn dc in dt.Columns)
                    {
                        // Matching the columns with fields
                        if (fieldInfo.Name == dc.ColumnName)
                        {
                            // Get the value from the datatable cell
                            string type = dr[dc.ColumnName].GetType().FullName;
                            object value = new object();
                            if (type == "System.DBNull")
                            {
                                value = ConvertFromDBVal<string>(dr[dc.ColumnName]);
                            }
                            else if (type == "System.Boolean")
                            {
                                value = dr[dc.ColumnName] == null ? 0 : 1;
                            }
                            else
                            {
                                value = dr[dc.ColumnName];
                            }

                            // Set the value into the object
                            try
                            {
                                fieldInfo.SetValue(ob, value);
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine("Generic Exception Handler: {0}", e.ToString());
                            }
                            break;
                        }
                    }
                }
                lst.Add(ob);
            }
            return lst;
        }
    }
}