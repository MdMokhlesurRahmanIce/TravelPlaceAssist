// $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
// .success(function (data) {
//   $scope.gridOptions.data = data;
//                          }
//         );

var app = angular.module('app', [ 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination',
'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.selection',
'ui.grid.autoResize', 'ui.grid.exporter' ]);
 

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
}]);

app.controller('MainCtrl', ['$scope', '$timeout', '$window', '$filter','$rootScope','$http','uiGridConstants', 'uiGridExporterService',  function ($scope, $timeout, $window, $filter, $rootScope,$http, uiGridConstants, uiGridExporterService) 
{
 
  //************************************Start Convert String to Date Formate*****************************
  getStringToDate = function (InputString) {
        
    var newStringToDate = InputString.replace(/[/-]/g, '-');
    var StringToDate = newStringToDate;
    var SplitedDate = StringToDate.split("-");
    var Day = SplitedDate[0];
    var Month = SplitedDate[1];
    var Year = SplitedDate[2];
    var FullFormateDate = Month + "-" + Day + "-" + Year;
    var Output = $filter('date')(new Date(), FullFormateDate);
    return Output;
}
//**************************************End Convert String to Date Formate*****************************

//************************************Start Convert Date Formate to String*****************************
getDateToString = function (InputDate) {
    
    var DateToString = InputDate;
    var SplitedDate = DateToString.split("-");
    var Year = SplitedDate[0];
    var Month = SplitedDate[1];
    var Day = SplitedDate[2].split("T");
    var Output = Day[0] + "/" + Month + "/" + Year;
    return Output;
}
//**************************************End Convert Date Formate to String*****************************


// //  service 
    function getAll (apiRoute, page, pageSize, isPaging) {

        urlGet = apiRoute + page + '/' + pageSize + '/' + isPaging;
        return $http.get(urlGet);
    }
// api controller
 

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

 //start excel


 function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function exportToExcel(sheetName, gridApi, rowTypes, colTypes) {
    var columns = gridApi.grid.options.showHeader ? uiGridExporterService.getColumnHeaders(gridApi.grid, colTypes) : [];
    var data = uiGridExporterService.getData(gridApi.grid, rowTypes, colTypes);
    var fileName = gridApi.grid.options.exporterExcelFilename ? gridApi.grid.options.exporterExcelFilename : 'dokuman';
    fileName += '.xlsx';
    var wb = new Workbook(),
        ws = sheetFromArrayUiGrid(data, columns);
    wb.SheetNames.push(sheetName);
    wb.Sheets[sheetName] = ws;
    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
    }), fileName);
}

function sheetFromArrayUiGrid(data, columns) {
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    var C = 0;
    columns.forEach(function (c) {
        var v = c.displayName || c.name;
        addCell(range, v, 0, C, ws);
        C++;
    }, this);
    var R = 1;
    data.forEach(function (ds) {
        C = 0;
        ds.forEach(function (d) {
            var v = d.value;
            addCell(range, v, R, C, ws);
            C++;
        });
        R++;
    }, this);
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function addCell(range, value, row, col, ws) {
    if (range.s.r > row) range.s.r = row;
    if (range.s.c > col) range.s.c = col;
    if (range.e.r < row) range.e.r = row;
    if (range.e.c < col) range.e.c = col;
    var cell = {
        v: value
    };
    if (cell.v == null) cell.v = '-';
    var cell_ref = XLSX.utils.encode_cell({
        c: col,
        r: row
    });

    if (typeof cell.v === 'number') cell.t = 'n';
    else if (typeof cell.v === 'boolean') cell.t = 'b';
    //else if (cell.v instanceof Date) {
    //    cell.t = 'n';
    //    cell.z = XLSX.SSF._table[14];
    //    cell.v = datenum(cell.v);
    //}
    else if ((cell.v).indexOf("T00:00:00") != -1) {
        cell.t = 's';
        cell.z = XLSX.SSF._table[14];
        cell.v = getDateToString(cell.v);//datenum(cell.v); //('0' + (cell.v).getDate()).slice(-2) + '/' + ('0' + ((cell.v).getMonth() + 1)).slice(-2) + '/' + (cell.v).getFullYear();//conversion.getDateToString(cell.v); //datenum(cell.v); change for date format to Excel data
    }
    else cell.t = 's';

    ws[cell_ref] = cell;
}

//end  excel


var objcmnParam = {};
       // var baseUrl = '/BuildingManagement/api/BuildingInfoCollection/';
        var isExisting = 0;
        var page = 0;
        var pageSize = 100;
        var isPaging = 0;


 $scope.WaterHeaterPanelGridList=[];
 $scope.CommentsPanelGridList=[];
 $scope.PlaceCreateAndCommentsList=[];

 // $scope.PlaceCreateAndCommentsList=[ {
	  // "ID":"1",
	  // "Title":"Title1",
	  // "Description":"Description1",
	  // "ImageUrl":"Image1",
	  // "CreateBy":null,
	  // "allComments": [
		// { "ID":"1","TitleID":"1",  "Comment":"Comments1",
	  // "CreateBy":null} 
	  // ]
	 // }, 
	 // {
   // "ID":"2",
	  // "Title":"Title2",
	  // "Description":"Description2",
	  // "ImageUrl":"Image2",
	  // "CreateBy":null,
	  // "allComments": [
		// { "ID":"1","TitleID":"2",  "Comment":"Comments1",
	  // "CreateBy":null},
		// { "ID":"2","TitleID":"2",  "Comment":"Comments2",
	  // "CreateBy":null} 
	  // ]
   // }, 
 // {
      // "ID":"3",
	  // "Title":"Title3",
	  // "Description":"Description3",
	  // "ImageUrl":"Image3",
	  // "CreateBy":null,
	  // "allComments": [
		// { "ID":"1","TitleID":"3",  "Comment":"Comments1",
	  // "CreateBy":null},
		// { "ID":"2","TitleID":"3",  "Comment":"Comments2",
	  // "CreateBy":null} 
		// ,
		// { "ID":"3","TitleID":"3",  "Comment":"Comments3" ,
	  // "CreateBy":null} 
	  // ]
 // }, 
 // {
      // "ID":"4",
	  // "Title":"Title4",
	  // "Description":"Description4",
	  // "ImageUrl":"Image4",
	  // "CreateBy":null,
	  // "allComments": [
		// { "ID":"1","TitleID":"4",  "Comment":"Comments1", "CreateBy":null},
		// { "ID":"2","TitleID":"4",  "Comment":"Comments2","CreateBy":null} 
		// ,
		// { "ID":"3","TitleID":"4",  "Comment":"Comments3","CreateBy":null} 
		// ,
		// { "ID":"4","TitleID":"4",  "Comment":"Comments4","CreateBy":null} 
	  // ]
 // }
 
 // ];
 
    
 var date = new Date();
 $scope.Date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

 // start user login
 $scope.userid=null;
 $scope.userpassword=null;
 $scope.Logout= function()
 {
	  $scope.userid=null;
      $scope.userpassword=null;
 }
 
 $scope.UserLogin=function()
 {
	  var cmnuser = 
	  {
            ID: 0,
            UserName: $scope.UserNameLogin,
            Password: $scope.PasswordLogin 
        };

        var apiRoute = 'http://localhost:51576/api/Login/GetLoginUser';
        var cmnParam = "[" + JSON.stringify(cmnuser)+ "]";
        var allcall = GetList(apiRoute, cmnParam);

        allcall.then(function (response) 
        {
            if(response.data.loginUser!=null)
            {
                $scope.userid=response.data.loginUser.ID;
				$scope.userpassword=response.data.loginUser.Password;
            }
            else
            {
                Command: toastr["warning"]("User Not Found");
                
            }
            
        },
        function (error) {
            console.log("Error: " + error);
           
        }); 
 }
 // end user login

  // start user registration

 $scope.UserResigtration=function()
 {
	  var cmnuser = 
	  {
            ID: 0,
            UserName: $scope.UserNameRes,
            Password: $scope.PasswordRes,
			Email: $scope.Email
        };

        var apiRoute = 'http://localhost:51576/api/Login/UserResigtration';
        var cmnParam = "[" + JSON.stringify(cmnuser)+ "]";
        var allcall = GetList(apiRoute, cmnParam);

        allcall.then(function (response) 
        {
            if(response.data.objUserRes!=null)
            {
                $scope.userid=response.data.objUserRes.ID;
				$scope.userpassword=response.data.objUserRes.Password;
            }
            else
            {
                Command: toastr["warning"]("User Already Exist.");
                
            }
            
        },
        function (error) {
            console.log("Error: " + error);
           
        }); 
 }
 // end user registration
 
 
 
 //*************---Show and Hide Order---**********//
 $scope.IsShowMasterGrid = false;
 $scope.IsShow = true;
 $scope.IsShowDetail = true
 $scope.IsCreateIcon = false;
 $scope.IsListIcon = true;
//  $('#ProductDetailForm').load("For_exporting_html/ProductDetailForm.html");
//  $('#ProductMasterForm').load("For_exporting_html/ProductMasterForm.html");

$scope.btnCreate_Insert = "Create Travel Place";
$scope.btnCreate_Comments='Create Comment';

 $scope.btnShowText = "Show List";
 $scope.btnSaveText = "Save";
  
  
 $scope.GetTitleandComments = function () 
  { 
        objcmnParam = {
            pageNumber: page,
            pageSize: pageSize,
            IsPaging: isPaging,
            pid: null,
            loggeduser: 1,//$scope.UserCommonEntity.loggedUserID,
            loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
            menuId: 1,//$scope.UserCommonEntity.currentMenuID,
            tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
        };

        var apiRoute = 'http://localhost:51576/api/Login/GettitleAndCommentsList';
        var cmnParam = "[" + JSON.stringify(objcmnParam)+ "]";
        var allcall = GetList(apiRoute, cmnParam);

        allcall.then(function (response) 
        {
            if(response.data.lsttitleAndCommentsList!=null)
            {
                $scope.PlaceCreateAndCommentsList=response.data.lsttitleAndCommentsList;
            }
            else
            {
                Command: toastr["warning"]("No Travel Place Found");
                
            }
            
        },
        function (error) {
            console.log("Error: " + error);
           
        }); 
  };
 
  $scope.GetTitleandComments();
 

 $scope.Clear = function()
 {
     
    $scope.IsShowMasterGrid = false;
    $scope.IsShow = true;
    $scope.IsShowDetail = true
    $scope.IsCreateIcon = false;
    $scope.IsListIcon = true;
 
    $scope.btnShowText = "Show List";
    $scope.btnSaveText = "Save"; 
    // $("#ddlProduct").select2('data',{ id: '', text: '--Please Select--' }); 
    // $scope.ddlProduct=null;  
    // _.defer(function () {$scope.$apply(); 
    // });
  
     
 };


// ++++++++++++============ start insert travelasset++++++++++++============ 

         
        $scope.deleteWaterHeaterPnl = function (element, index, WaterHeatergrd) {
		if(element.CreateBy==$scope.userid)
		{
            var IsConf = confirm('You are about to delete ' + element.Title + '. Are you sure?');
            if (IsConf) 
			{
				objcmnParam = {
							pageNumber: page,
							pageSize: pageSize,
							IsPaging: isPaging,
							pid: element.ID,
							loggeduser: 1,//$scope.UserCommonEntity.loggedUserID,
							loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
							menuId: 1,//$scope.UserCommonEntity.currentMenuID,
							tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
						};

						var apiRoute = 'http://localhost:51576/api/Login/DeleteTravelPlace';
						var cmnParam = "[" + JSON.stringify(objcmnParam)+ "]";
						var allcall = GetList(apiRoute, cmnParam);

						allcall.then(function (response) 
						{
							if(response.data!="")
							{
								Command: toastr["success"](" "+response.data +" Deleted Successfully.");
								$scope.GetTitleandComments();
							}
							else
							{
								Command: toastr["warning"](" "+response.data +" Not Delete.");
								 
							}
							
						},
						function (error) {
							console.log("Error: " + error);
							
						});
                

            };
		 }
		 else
		 {
			 Command: toastr["warning"](" You are not permitted to delete");
		 }
		 
	   };
        $scope.editWaterHeaterPnl = function (dataModel, index, rfgrd) 
		{
			if(dataModel.CreateBy==$scope.userid)
			{
				$('#NewWaterHeaterModal').show();
				$scope.cleanWaterHeaterPop();

				$scope.DataModelIndex = index; 
				$scope.btnCreate_Insert = "Update Travel Place";
				$scope.Title = dataModel.Title; 
				
				$scope.Description = dataModel.Description;
				$scope.ImageUrl = dataModel.ImageUrl;
          
			}
			 else
			 {
				 $('#NewWaterHeaterModal').hide();
				 Command: toastr["warning"](" You are not permitted to edit");
			 }
        };

        $scope.showWaterHeaterPopUP = function () 
        {
            $('#NewWaterHeaterModal').show();
            $scope.cleanWaterHeaterPop();

        }
        $scope.cleanWaterHeaterPop = function ()
        {
            $scope.btnCreate_Insert = "Create Travel Place";
            $scope.Title = '';  
            $scope.Description = '';
            $scope.ImageUrl = ''; 
        }
        $scope.AddWaterHeaterToPanelPopUP = function () 
        {

                var msg = $scope.Title == "" ? "Please Enter Title" : '';// $scope.ddlWallTypes == "" ? "Please Select Wall Type" : $scope.short_name_value == "" ? "Please Enter " + $scope.short_name + "" : "";
                if (msg == "")
                {
                    if ($scope.btnCreate_Insert == "Create Travel Place")
                    {
                       
						
						  var Masterdata =
									{ 
										ID: 0,
										Title: $scope.Title,
										Description: $scope.Description,
                          
										ImageUrl: $scope.ImageUrl,
                             
										CreateBy: $scope.userid
										 
									};
							 
								var apiRoute = 'http://localhost:51576/api/Login/SaveUpdateTravelPlace';
								var cmnParam = "[" + JSON.stringify(Masterdata) + "]";

								var allcall = GetList(apiRoute, cmnParam);

								allcall.then(function (response) 
								{
									if(response.data!="")
									{
										 $scope.PlaceCreateAndCommentsList.push({
																					ID: response.data,
																					Title: $scope.Title,
																					Description: $scope.Description,
																				  
																					ImageUrl: $scope.ImageUrl,
																					 
																					CreateBy: $scope.userid,
																					allComments: [
																						//{ "ID":"0","TitleID":"",  "Comment":"", "CreateBy":null}
																					  ]
																				}); 
																				
										Command: toastr["success"](""+$scope.Title+" Saved Successfully.");
								         $scope.cleanWaterHeaterPop();
										 closeModalLoader_Final();
									}
									else
									{
										Command: toastr["warning"](""+$scope.Title+" Not Saved.");
										closeModalLoader_Final();
									}
									
								},
							function (error) {
								console.log("Error: " + error);
								closeModalLoader_Final();
							});
                    }

                    else if ($scope.btnCreate_Insert == "Update Travel Place")
                    {
						                 $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].ID = $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].ID;
									     $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].Title = $scope.Title;
									     $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].Description= $scope.Description;
									     $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].ImageUrl= $scope.ImageUrl;
									     $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].CreateBy= $scope.userid;
									     $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].allComments= $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].allComments;
									    
								var Masterdata =
									{ 
										ID: $scope.PlaceCreateAndCommentsList[$scope.DataModelIndex].ID,
										Title: $scope.Title,
										Description: $scope.Description,
                          
										ImageUrl: $scope.ImageUrl,
                             
										CreateBy: null
										 
									};
							 
								$scope.DataModelIndex = ""; 
										 
								var apiRoute = 'http://localhost:51576/api/Login/SaveUpdateTravelPlace';
								var cmnParam = "[" + JSON.stringify(Masterdata) + "]";

								var allcall = GetList(apiRoute, cmnParam);

								allcall.then(function (response) 
								{
									if(response.data!="")
									{
										 
						
										Command: toastr["success"](""+$scope.Title+" Updated Successfully.");
										$scope.cleanWaterHeaterPop();
										 closeModalLoader_Final();
									}
									else
									{
										Command: toastr["warning"](""+$scope.Title+" Not Updated.");
										closeModalLoader_Final();
									}
									
								},
							function (error) {
								console.log("Error: " + error);
								closeModalLoader_Final();
							});
							
							
                       
                    } 
                }

                else {
                    Command: toastr["warning"]("" + msg + ""); 
                }
            // }

            // else {
            //     Command: toastr["warning"]("Please Select Water Heater Type.");

            // }
        }

        //++++++++++++============ end insert travelasset++++++++++++============ 

      //  +++++++++++++ start for comments +++++++++++++++++//
    $scope.deleteWaterHeaterPnlComments = function (element, index, WaterHeatergrd) 
	 {
	  if(element.CreateBy==$scope.userid)
	  {

        var IsConf = confirm('You are about to delete ' + element.Comment + '. Are you sure?');
        if (IsConf) 
		{
				objcmnParam = {
								pageNumber: page,
								pageSize: pageSize,
								IsPaging: isPaging,
								pid: element.ID,
								loggeduser: 1,//$scope.UserCommonEntity.loggedUserID,
								loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
								menuId: 1,//$scope.UserCommonEntity.currentMenuID,
								tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
							};

							var apiRoute = 'http://localhost:51576/api/Login/DeleteComments';
							var cmnParam = "[" + JSON.stringify(objcmnParam)+ "]";
							var allcall = GetList(apiRoute, cmnParam);

							allcall.then(function (response) 
							{
								if(response.data!="")
								{
									Command: toastr["success"](" "+response.data +" Deleted Successfully.");
									$scope.GetTitleandComments();
								}
								else
								{
									Command: toastr["warning"](" "+response.data +" Not Delete.");
									 
								}
								
							},
							function (error) {
								console.log("Error: " + error);
								
							}); 

        };
      }
	  else
	  {
			 Command: toastr["warning"](" You are not permitted to delete");
	  }
	};

    $scope.tempdataModelComments=null;
    $scope.editWaterHeaterPnlComments = function (dataModel, index, dataModelComments, dataModelCommentsComments) 
	{
	  if(dataModelComments.CreateBy==$scope.userid)
	  {
        $('#CommentsModalupdate').show();
        $scope.cleanCommentsPop();

		 $scope.tempdataModel=dataModel;
         $scope.tempdataindex=index;
         $scope.tempdataModelComments=dataModelComments;
		 $scope.tempdataModelallComments=dataModelCommentsComments;
					  
       // $scope.DataModelIndex = index; 
        
        $scope.Commentsupdate = dataModelCommentsComments;  
	 }
	 else
	 {       
			$('#CommentsModalupdate').hide();
			 Command: toastr["warning"](" You are not permitted to edit");
	 }
		
   };
	
	$scope.AddWaterHeaterToPanelCommentsFromPopUPupdate= function()
	  {
		  var msg = $scope.Commentsupdate == "" ? "Please Enter Comment" : '';// $scope.ddlWallTypes == "" ? "Please Select Wall Type" : $scope.short_name_value == "" ? "Please Enter " + $scope.short_name + "" : "";
            if (msg == "")
            {
               
                 var dm= $scope.tempdataModel;
                 var ttleID=$scope.tempdataModel.ID;
                 var nd = $scope.tempdataindex;
                 var commentID =$scope.tempdataModelComments.ID;
         
                var ttlindex = $scope.PlaceCreateAndCommentsList.findIndex(obj => obj.ID==ttleID);

					$scope.PlaceCreateAndCommentsList[ttlindex].allComments[nd].Comment=$scope.Commentsupdate;
					$scope.PlaceCreateAndCommentsList[ttlindex].allComments[nd].CreateBy=$scope.userid;
					
					  $scope.tempdataModel=null;
					  $scope.tempdataindex=null;
					  $scope.tempdataModelComments=null;
					  $scope.tempdataModelallComments=[];
					  
					  var MasterdataComments =
									{ 
										ID:commentID,
										TitleID: ttleID,
										Comment: $scope.Commentsupdate, 
										CreateBy: $scope.userid
										 
									};
							 
								var apiRoute = 'http://localhost:51576/api/Login/SaveUpdateComments';
								var cmnParam = "[" + JSON.stringify(MasterdataComments) + "]";

								var allcall = GetList(apiRoute, cmnParam);

								allcall.then(function (response) 
								{
									if(response.data!="")
									{
									
																				
										Command: toastr["success"]("Comment Updated Successfully.");
										//$scope.Clear();
										$scope.Commentsupdate='';
										 closeModalLoader_Final();
									}
									else
									{
										Command: toastr["warning"](""+$scope.Title+" Not Saved.");
										closeModalLoader_Final();
									}
									
								},
							function (error) {
								console.log("Error: " + error);
								closeModalLoader_Final();
							});
							
                
            }

            else {
                Command: toastr["warning"]("" + msg + ""); 
            }
	  }
	  

    $scope.showWaterHeaterPopUPComments = function () 
    {
        $('#CommentsModal').show();
        $scope.cleanCommentsPop();

    }
    $scope.cleanCommentsPop = function ()
    {
        $scope.btnCreate_Comments = "Create Comment";
        $scope.Comment = '';  
		$scope.Commetsupdate='';
    }
	 
	  $scope.tempdataModel=null;
	  $scope.tempdataindex=null;
	  $scope.tempdataModelallComments=[];
	  
	  $scope.AddWaterHeaterToPanelCommentsFromPopUP= function()
	  {
		  var msg = $scope.Comment == "" ? "Please Enter Comment" : '';// $scope.ddlWallTypes == "" ? "Please Select Wall Type" : $scope.short_name_value == "" ? "Please Enter " + $scope.short_name + "" : "";
            if (msg == "")
            {
                if ($scope.btnCreate_Comments == "Create Comment")
                {
                    
					var MasterdataComments =
									{ 
										ID:0,
										TitleID: $scope.tempdataModel.ID,
										Comment: $scope.Comment, 
										CreateBy: $scope.userid
										 
									};
							 
							
								var apiRoute = 'http://localhost:51576/api/Login/SaveUpdateComments';
								var cmnParam = "[" + JSON.stringify(MasterdataComments) + "]";

								var allcall = GetList(apiRoute, cmnParam);

								allcall.then(function (response) 
								{
									if(response.data!="")
									{
										$scope.tempdataModelallComments.push({
																				ID: response.data,
																				TitleID: MasterdataComments.TitleID,
																				Comment: $scope.Comment,
																				CreateBy:$scope.userid
																			});
																			
										$scope.PlaceCreateAndCommentsList[$scope.tempdataindex].allComments=$scope.tempdataModelallComments;
																			
																					
											Command: toastr["success"]("Comment Saved Successfully.");
											$scope.Comment=null;
											$scope.tempdataModel=null;
											  $scope.tempdataindex=null;
											  $scope.tempdataModelallComments=[];
					  
											 closeModalLoader_Final();
									}
									else
									{
										Command: toastr["warning"](""+$scope.Title+" Not Saved.");
										closeModalLoader_Final();
									}
									
								},
							function (error) {
								console.log("Error: " + error);
								closeModalLoader_Final();
							});
							
							
					  
                }  
            }

            else {
                Command: toastr["warning"]("" + msg + ""); 
            }
	  }
	  
    $scope.AddWaterHeaterToPanelComments = function (dataModel, index, dataModelallComments) 
	{ 
		$scope.DataModelIndex = index; 
		
		$scope.tempdataModel=dataModel;
	    $scope.tempdataindex=index;
		$scope.tempdataModelallComments=dataModelallComments; 
    }

      //    +++++++++++++ end for comments ++++++++++++++++++//


 
}]);

function openModalLoader_Final()
{ 
    $("#modalMyLoaderNEWID").attr("style", "display:block!important");
    $("#fadeMyLoaderNEWID").attr("style", "display:block!important");
     
}

function closeModalLoader_Final()
{ 

    $("#modalMyLoaderNEWID").attr("style", "display:none!important");
    $("#fadeMyLoaderNEWID").attr("style", "display:none!important");

}
 