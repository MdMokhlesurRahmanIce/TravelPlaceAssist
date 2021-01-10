// $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
// .success(function (data) {
//   $scope.gridOptions.data = data;
//                          }
//         );

var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter','ui.grid.pagination']);
 
app.controller('MainCtrl', ['$scope', '$timeout', '$window', '$filter','$rootScope','$http', function ($scope, $timeout, $window, $filter, $rootScope,$http) 
{

//       //**********----Get All Record----***************
//       // js call
//       function loadRecords_department(isPaging) {
//         var apiRoute = '/SystemCommon/api/SystemCommonDDL/GetDepartment/' + LCompanyID + '/' + LUserID + '/';
//         var ddlCountry = crudService.getAll(apiRoute, page, pageSize, isPaging);
//         ddlCountry.then(function (response) {
//             $scope.listDepartment = response.data
//         },
//         function (error) {
//             console.log("Error: " + error);
//         });
//     }
//     loadRecords_department(0);
// //  service 
    function getAll (apiRoute, page, pageSize, isPaging) {

        urlGet = apiRoute + page + '/' + pageSize + '/' + isPaging;
        return $http.get(urlGet);
    }
// api controller

// [Route("GetDepartment/{companyID:int}/{loggedUser:int}/{pageNumber:int}/{pageSize:int}/{IsPaging:int}")]
// [ResponseType(typeof(vmDepartment))]
// [HttpGet]
// public IEnumerable<vmDepartment> GetDepartment(int companyID, int loggedUser, int pageNumber, int pageSize, int IsPaging)
// {
//     IEnumerable<vmDepartment> DepartmentList = null;
//     try
//     {
//         DepartmentList = objDDLService.GetDepartment(companyID, pageNumber, pageSize, IsPaging);
//     }
//     catch (Exception e)
//     {
//         e.ToString();
//     }
//     return DepartmentList;
// }

// // factory service
// public List<vmDepartment> GetDepartment(int CompanyID, int pageNumber, int pageSize, int IsPaging)
//         {
//             List<vmDepartment> DepartmentList = null;

//             try
//             {
//                 using (_ctxCmn = new ERP_Entities())
//                 {
//                     DepartmentList = (from c in _ctxCmn.CmnOrganograms
//                                       where c.IsDeleted == false && c.CompanyID == CompanyID
//                                       orderby c.OrganogramID ascending
//                                       select new vmDepartment
//                                       {
//                                           OrganogramID = c.OrganogramID,
//                                           CustomCode = c.CustomCode,
//                                           OrganogramName = c.OrganogramName

//                                       }).ToList();
//                     //.Skip(pageNumber)
//                     //.Take(pageSize).ToList();
//                 }


//             }
//             catch (Exception e)
//             {
//                 e.ToString();
//             }

//             return DepartmentList;
//         }

    // Start Service Here 
    var urlGet = '';

    function GetList (apiRoute, page, pageSize, isPaging) {

        urlGet = apiRoute + page + '/' + pageSize + '/' + isPaging;
        return $http.get(urlGet);
    }
    function getAllUsers (apiRoute, page, pageSize, isPaging, UserTypeID, LoginCompanyID) {

        urlGet = apiRoute + page + '/' + pageSize + '/' + isPaging + '/' + UserTypeID + '/' + LoginCompanyID;
        return $http.get(urlGet);
    }
    //**********----Get Single Record----***************
     function getItemByID (apiRoute) {
        return $http.get(apiRoute);
    }

    
    function getMasterByID (apiRoute, QuotationId, CompanyID)//, headerToken) 
    {
        urlGet = apiRoute + QuotationId + '/' + CompanyID;
        var request = $http({
            method: "get",
            url: urlGet
            //,
           // headers: headerToken
        });
        return request; 
    }

  function GetList (apiRoute, cmnParam) 
  {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: cmnParam,
            dataType: "json",
            contentType: "application/json"

        });
        return request;
    }

    // End Service Here

// start basic config

 $scope.ListMrrDetails = [
                            {
                                "id": "1",
                                "system_type_name": "New Order"
                            },
                            {
                                "id": "2",
                                "system_type_name": "Trip Started"
                            },
                            {
                                "id": "3",
                                "system_type_name": "Trip Completed"
                            },
                            {
                                "id": "4",
                                "system_type_name": "Order Cancelled"
                            }
                        ];

 //*************---Show and Hide Order---**********//
 $scope.IsShowMasterGrid = false;
 $scope.IsShow = true;
 $scope.IsShowDetail = true
 $scope.IsCreateIcon = false;
 $scope.IsListIcon = true;
//  $('#ProductDetailForm').load("For_exporting_html/ProductDetailForm.html");
//  $('#ProductMasterForm').load("For_exporting_html/ProductMasterForm.html");

 $scope.btnShowText = "Show List";
 $scope.btnSaveText = "Save";
 
//  $scope.ShowHide = function () {
//      $scope.IsShowMasterGrid = $scope.IsShowMasterGrid == true ? false : true;
//      $scope.IsShowDetail = true;
//      if ($scope.IsShowMasterGrid == true) {
//          $scope.btnShowText = "Show List";
//          $scope.IsShow = true;

//          $scope.IsCreateIcon = false;
//          $scope.IsListIcon = true;
//      }
//      else {
//          $scope.btnShowText = "Create";
//          $scope.IsShow = false;
//          $scope.IsShowMasterGrid = false;

//          $scope.IsCreateIcon = true;
//          $scope.IsListIcon = false;
//          loadGridData(); 
//      }
//  }


$scope.ShowHide = function () 
{
    $scope.IsShowMasterGrid = $scope.IsShowMasterGrid == false ? true : false;
    $scope.IsShowDetail = true;
    if ($scope.IsShowMasterGrid == false) 
    {
        $scope.btnShowText = "Show List";
        $scope.IsShow = true;

        $scope.IsCreateIcon = false;
        $scope.IsListIcon = true;
        $scope.IsShowDetail= true;
    }
    else 
    {
        $scope.btnShowText = "Create";
        $scope.IsShow = false;
        $scope.IsShowMasterGrid = true;

        $scope.IsCreateIcon = true;
        $scope.IsListIcon = false;
        $scope.IsShowDetail= false;
        
    }
}

loadGridData(); 

$scope.loaderMoreMrrMaster = true;
$scope.lblMessageForMrrMaster = 'loading please wait....!';
$scope.result = "color-red";

// end basic config






  $scope.SystemTypesList=[];
  $scope.assesment_type='Real';
  var date = new Date();
  $scope.Date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

 // $scope.Date = dataModel.Date == null ? "" : conversion.getDateToString(dataModel.Date);
 // in table Date: conversion.getStringToDate($scope.ScheduleUnloadingDate),
  // start for grid
$scope.IfChecked = true;

  function loadGridData() 
  {
    $scope.gridOptions = {
        // useExternalPagination: true,
        // useExternalSorting: true,
     
         enableFiltering: true,
         enableRowSelection: false,
         enableSelectAll: false,
        // showFooter: true,
        // enableGridMenu: true,
         // from  denim
         columnDefs: [
            //  { field: "UserID", displayName: "UserID", visible: true, title: "UserID", headerCellClass: $scope.highlightFilteredHeader },
            //  { field: "LoginID", displayName: "LoginID", visible: true, title: "LoginID", headerCellClass: $scope.highlightFilteredHeader },
            //  { field: "LoginEmail", displayName: "LoginEmail", visible: true, title: "LoginEmail", headerCellClass: $scope.highlightFilteredHeader },
            //  { field: "LoginPhone", displayName: "LoginPhone", visible: true, title: "LoginPhone", headerCellClass: $scope.highlightFilteredHeader },
            

            { field: "id", displayName: "id", visible: true, title: "id", headerCellClass: $scope.highlightFilteredHeader },
            { field: "system_type_name", displayName: "system_type_name", visible: true, title: "system_type_name", headerCellClass: $scope.highlightFilteredHeader },
              

           //{ field: 'name' },
         //   { field: 'gender', visible: false},
         //   { field: 'company' }
         ],
         enableGridMenu: true,
         paginationPageSizes: [25, 50, 75],
         paginationPageSize: 25,
        // enableSelectAll: true,
         exporterCsvFilename: 'myFile.csv',
         exporterPdfDefaultStyle: {fontSize: 9},
         exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
         exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
         exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
         exporterPdfFooter: function ( currentPage, pageCount ) {
           return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
         },
         exporterPdfCustomFormatter: function ( docDefinition ) {
           docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
           docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
           return docDefinition;
         },
         exporterPdfOrientation: 'portrait',
         exporterPdfPageSize: 'LETTER',
         exporterPdfMaxGridWidth: 500,
         exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
         exporterExcelFilename: 'myFile.xlsx',
         exporterExcelSheetName: 'Sheet1',
         onRegisterApi: function(gridApi){
           $scope.gridApi = gridApi;
         }
       };

       $scope.gridOptions.data=$scope.ListMrrDetails;
      
    //    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    //    .then(function(response) {
    //       $scope.gridOptions.data =response.data;
    //    });
    // $http.get('http://192.168.43.84:55/api/Login/XAMARIN_Login?username=1&password=12345')
    // .then(function(response) {
    //    $scope.gridOptions.data =response.data.lstUser;
    // });

    // // work well
    // $.ajax({
    //     url: 'http://192.168.43.84:55/api/Login/XAMARIN_Login?username=1&password=12345',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     type: "GET", /* or type:"GET" or type:"PUT" */
    //     dataType: "json",
    //     // data: {
    //     // },
    //     success: function (result) 
    //     {
    //         $scope.gridOptions.data =result.lstUser;
    //     },
    //     error: function () {
    //         console.log("error");
    //     }
    // });

    //   $http.get('https://192.168.43.84:55/api/Login/XAMARIN_Login?username=1&password=12345')
    //    .then(function(response) {
    //       $scope.gridOptions.data =response.data.lstUser;
    //    });
// http://localhost:51576/api/Login/XAMARIN_Login?username=1&password=12345  by postman to debug mode
    
// var apiRoute = baseUrl + 'GetSystemTypesAir/';
//       var listSystemTypesMaster = buildingInfoCollectionService.getQuotationMasterList(apiRoute, objcmnParam);
//       listSystemTypesMaster.then(function (response) {
//           $scope.SystemTypesList = response.data.objSystemTypes;
//       },
//       function (error) {
//           //console.log("Error: " + error);
//       });
       
  }
  loadGridData();
  

  // end grid

  $scope.LoadSystemTypes = function () 
  {
    // $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    // .then(function(response) {
    //   $scope.SystemTypesList = response.data;
    // });
    
        $("#ddlSecondCSK").select2('data', { id: '', text: '--Please Select--' });
        $scope.ddlSecondCSK=null;
        $scope.SecondCSKList=null; 
        _.defer(function () {$scope.$apply(); 
        });
         
        $("#ddlFirstCSK").select2('data', { id: '', text: '--Please Select--' });
        $scope.ddlFirstCSK=null; 
        $scope.FirstCSK_List=null; 
        _.defer(function () {$scope.$apply();            
        });

         $("#ddlSystemTypes").select2('data', { id: '', text: '--Please Select--' }); 
        $scope.ddlSystemTypes = null;
        _.defer(function () {$scope.$apply(); 
        }); 
        $scope.SystemTypesList =
         [
             {
                 "id": "1",
                 "system_type_name": "New Order"
             },
             {
                 "id": "2",
                 "system_type_name": "Trip Started"
             },
             {
                 "id": "3",
                 "system_type_name": "Trip Completed"
             },
             {
                 "id": "4",
                 "system_type_name": "Order Cancelled"
             }
         ];

     
         _.defer(function () {$scope.$apply(); 
         });
     
     // $("#ddlSystemTypes").select2("data", { id: '', text: '--Please Select--' });
 
      // var apiRoute = baseUrl + 'GetSystemTypesAir/';
      // var listSystemTypesMaster = buildingInfoCollectionService.getQuotationMasterList(apiRoute, objcmnParam);
      // listSystemTypesMaster.then(function (response) {
      //     $scope.SystemTypesList = response.data.objSystemTypes;
      // },
      // function (error) {
      //     //console.log("Error: " + error);
      // });
  }
  $scope.LoadSystemTypes();

  $scope.loadFirstCSKList = function()
  {
     
      $("#ddlFirstCSK").select2('data', { id: '', text: '--Please Select--' });
      $scope.ddlFirstCSK=null; 
      $scope.FirstCSK_List=null; 
    _.defer(function () {$scope.$apply(); 
    });

        $("#ddlSecondCSK").select2('data', { id: '', text: '--Please Select--' });
        $scope.ddlSecondCSK=null; 
        $scope.SecondCSKList=null; 
        _.defer(function () {$scope.$apply(); 
        });
          
      if($scope.ddlSystemTypes>0)
      {
        
            $scope.FirstCSK_List=
                        [
                            {
                                "id": "1",
                                "system_type_name": "1st New Order"
                            },
                            {
                                "id": "2",
                                "system_type_name": "1st Trip Started"
                            },
                            {
                                "id": "3",
                                "system_type_name": "1st Trip Completed"
                            },
                            {
                                "id": "4",
                                "system_type_name": "1st Order Cancelled"
                            }
                        ]; 

                     //   alert($scope.FirstCSK_List[0].id.toString());
      }
    
    
  };

  $scope.loadSecondCSKList = function()
  {
    
    $scope.ddlSecondCSK=null;
    $scope.SecondCSKList=null;
   $("#ddlSecondCSK").select2('data', { id: '', text: '--Please Select--' }); 
       _.defer(function () {$scope.$apply(); 
       });
     if($scope.ddlFirstCSK>0)
     {
        $scope.SecondCSKList=
        [
            {
                "id": "1",
                "system_type_name": "Sec New Order"
            },
            {
                "id": "2",
                "system_type_name": "Sec Trip Started"
            },
            {
                "id": "3",
                "system_type_name": "Sec Trip Completed"
            },
            {
                "id": "4",
                "system_type_name": "Sec Order Cancelled"
            }
        ];
     }

  //  alert("check Second on change...");
      
  };

        // ===start final save ===//

        $scope.save = function ()
        { 

            if ($scope.id == 0 || $scope.id == null)
            {
                Command: toastr["warning"]("Please Edit Building.");

                return false;
            }

            //if ($scope.year_of_construction == "" || $scope.year_of_construction == null) {
            //    Command: toastr["warning"]("Please Enter Year Completed.");

            //    return false;
            //}

            //if ($scope.total_floor_area == "" || $scope.total_floor_area == null) {
            //    Command: toastr["warning"]("Please Enter Total Floor Area.");

            //    return false;
            //}
            //if ($scope.address == "" || $scope.address == null) {
            //    Command: toastr["warning"]("Please Enter Street.");

            //    return false;
            //}

            //if ($scope.city == "" || $scope.city == null) {
            //    Command: toastr["warning"]("Please Enter City.");

            //    return false;
            //}
            //if ($scope.ddlState == "" || $scope.ddlState == null) {
            //    Command: toastr["warning"]("Please Select.");

            //    return false;
            //}
            //if ($scope.zip_code == "" || $scope.zip_code == null) {
            //    Command: toastr["warning"]("Please Enter Zip Code.");

            //    return false;
            //}


            openModalLoader_Final();
            //$('#modalMyLoader').css("display", "block");
            //$('#fadeMyLoader').css("display", "block");
          //  $scope.IsShowingmodalMyLoader = true;
           // $scope.IsShowingfadeMyLoader = true

           

            objcmnParam = {
                pageNumber: page,
                pageSize: pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };

            var HedarTokenPostPut = $scope.id > 0 ? $scope.HeaderToken.put : $scope.HeaderToken.post;
            var Masterdata =
            {

                id: $scope.id,
                Name: $scope.Name,
                year_of_construction: $scope.year_of_construction,
                total_floor_area: $scope.total_floor_area,
                notes: $scope.notes,
                address: $scope.address,
                //ScheduleLoadingDate: conversion.getStringToDate($scope.ScheduleLoadingDate),
                //ScheduleUnloadingDate: conversion.getStringToDate($scope.ScheduleUnloadingDate),
                assesment_type: $scope.assesment_type,
                IsAdvancedSystem: $scope.IsAdvancedSystem,
                IsHVACSystem: $scope.IsHVACSystem,
                city: $scope.city,
                state: $scope.ddlState,
                zip_code: $scope.zip_code,
                user_id: $scope.UserCommonEntity.loggedUserID

                //CompanyID: $scope.UserCommonEntity.loggedCompnyID, 
                //IsDeleted: false
            };

        
            if ($scope.id>0)
            {
            var apiRoute = baseUrl + 'SaveUpdateFinalData/';
            var cmnParam = "[" + JSON.stringify(objcmnParam)
                            + "," + JSON.stringify(Masterdata)
                            + "," + JSON.stringify($scope.UseTypesGridList)
                            + "," + JSON.stringify($scope.RoofPanelGridList)
                            + "," + JSON.stringify($scope.SkylightPanelGridList)
                            + "," + JSON.stringify($scope.WallPanelGridList)
                            + "," + JSON.stringify($scope.WindowPanelGridList)
                            + "," + JSON.stringify($scope.FloorPanelGridList)
                            + "," + JSON.stringify($scope.LightingPanelGridList) 
                            + "," + JSON.stringify($scope.WaterHeaterPanelGridList)
                            + "," + JSON.stringify($scope.PlantLoopPanelGridList) 
                            + "," + JSON.stringify($scope.VRFConPanelGridList)
                            + "," + JSON.stringify($scope.ElevatorPanelGridList)
                            + "," + JSON.stringify($scope.Air_HandlerPanelGridList)
                            + "," + JSON.stringify($scope.ZoneEquipmentPanelGridList)
                            + "," + JSON.stringify($scope.OperationPanelGridList)
                            + "]";

            
            
            var FinalDataCreateUpdate = buildingInfoCollectionService.GetList(apiRoute, cmnParam, HedarTokenPostPut);

            FinalDataCreateUpdate.then(function (response)
            {


                if (response.data == 1 && $scope.id == 0) {
                    Command: toastr["success"]("Data Saved Successfully.");
                    $scope.clearFinalBuilding();

                }
                else if (response.data == 1 && $scope.id > 0) {
                        Command: toastr["success"]("Data Updated Successfully.");
                    $scope.clearFinalBuilding();

                }
                else {
                    ShowCustomToastrMessageSaveUpdate(0, $scope.UserCommonEntity);
                }

                //closeModalLoader_Building();

                closeModalLoader_Final();

            },
                function (error) {
                    var msgForSaveUpdate = (error.statusText == "Unauthorized" && $scope.id == "0") ? " You have no permission to save. " : ((error.statusText == "Unauthorized" && $scope.id > 0) ? " You have no permission to update. " : " Data Not Saved, Error.");

                    Command: toastr["warning"](" " + msgForSaveUpdate + " ");

                    closeModalLoader_Final();
 
                    $scope.IsShowingmodalMyLoader = false;
                    $scope.IsShowingfadeMyLoader = false
                });
                
            }
            else
            {

                Command: toastr["warning"]("Please Edit Building. ");
            }

        };

        //=====  end final save ===//


 $scope.Clear = function()
 {
    //alert("check Clear on Click...");
  
    $scope.IsShowMasterGrid = true;
    $scope.IsShow = true;
    $scope.IsShowDetail = true
    $scope.IsCreateIcon = false;
    $scope.IsListIcon = true;

    $scope.btnCreateBuilding = "Create Building";
    $scope.btnShowText = "Show List";
    $scope.btnSaveText = "Save";

    var date = new Date();
  $scope.Date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  $scope.IfChecked = true;
  $scope.assesment_type='Real';
  
    $("#ddlSecondCSK").select2('data',{ id: '', text: '--Please Select--' });
    
    $scope.ddlSecondCSK=null; 
    $scope.SecondCSKList=null; 
    _.defer(function () {$scope.$apply(); 
    });

    $("#ddlFirstCSK").select2('data', { id: '', text: '--Please Select--' });
    $scope.ddlFirstCSK=null; 
    $scope.FirstCSK_List=null; 
    _.defer(function () {$scope.$apply(); 
    });
   
    $("#ddlSystemTypes").select2('data', { id: '', text: '--Please Select--' });
    $scope.ddlSystemTypes=null; 
    _.defer(function () {$scope.$apply(); 
    });

     //$("#ddlSystemTypes").select2('data', {id: null, text: null})
      // $scope.ddlSystemTypes = "";
      //$("#ddlSystemTypes").select2("data", { id: '', text: '--Please Select--' });
 };


}]);

function openModalLoader_Final()
{ 
    $("#modalMyLoaderNEWID").attr("style", "display:block!important");
    $("#fadeMyLoaderNEWID").attr("style", "display:block!important");
     
}

function closeModalLoader_Final()
{
    //$('#fadeMyLoader').css("height", "100%");
    //$('#modalMyLoader').css("top", "45%");

    //$('#modalMyLoader').css("display", "none!important");
    //$('#fadeMyLoader').css("display", "none!important");

    $("#modalMyLoaderNEWID").attr("style", "display:none!important");
    $("#fadeMyLoaderNEWID").attr("style", "display:none!important");

}
