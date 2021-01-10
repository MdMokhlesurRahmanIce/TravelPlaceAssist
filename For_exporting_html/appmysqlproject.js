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


 $scope.ListProductDetail = [];
 $scope.OrderTotal=0;
 $scope.project_id=0;

 var date = new Date();
 $scope.Date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();


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
        $scope.loadMasterRecords(0);
        $scope.IsCreateIcon = true;
        $scope.IsListIcon = false;
        $scope.IsShowDetail= false;
        
    }
}
 
        //Pagination for Master Grid
        $scope.pagination = {
            paginationPageSizes: [10, 25, 50, 75, 100, 500, 1000, "All"],
            ddlpageSize: 10, pageNumber: 1, pageSize: 10, totalItems: 0,

            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            pageSizeChange: function () {
                if (this.ddlpageSize == "All")
                    this.pageSize = $scope.pagination.totalItems;
                else
                    this.pageSize = this.ddlpageSize
                this.pageNumber = 1

                $scope.loadMasterRecords(1);
            },
            firstPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber = 1
                    $scope.loadMasterRecords(1);
                }
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    $scope.loadMasterRecords(1);
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    $scope.loadMasterRecords(1);
                }
            },
            lastPage: function () {
                if (this.pageNumber >= 1) {
                    this.pageNumber = this.getTotalPages();
                    $scope.loadMasterRecords(1);
                }
            }
        };


        //Method for Master Grid List 
        $scope.loadMasterRecords = function(isPaging) {

            openModalLoader_Final();
            // For Paging
            if (isPaging == 0)
                $scope.pagination.pageNumber = 1;

            // For Loading
            $scope.loaderMoreIssueMaster = true;
            $scope.lblMessageForQCMaster = 'loading please wait....!';
            $scope.result = "color-red";

            //Ui Grid
            objcmnParam = {
                pageNumber: (($scope.pagination.pageNumber - 1) * $scope.pagination.pageSize),
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser:1,// $scope.UserCommonEntity.loggedUserID,
                loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
                menuId:1,// $scope.UserCommonEntity.currentMenuID,
                tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
            };

            $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                if (col.filters[0].term) {
                    return 'header-filtered';
                } else {
                    return '';
                }
            };

            $scope.gridOptionsMaster = {
                useExternalPagination: true,
                useExternalSorting: true,

                enableFiltering: true,
                enableRowSelection: true,
                enableSelectAll: true,
                showFooter: true,
                enableGridMenu: true,
                columnDefs: [
                    { name: "project_id", displayName: "id", visible: false, title: "id", headerCellClass: $scope.highlightFilteredHeader },
                    { name: "SL#", field:'', width:'10%', displayName: "SL#", visible: true, title: "SL#",cellTemplate:'<span>{{rowRenderIndex+1}}</span>',  headerCellClass: $scope.highlightFilteredHeader },
                   
                    { name: "project_name", displayName: "project_name", title: "project_name", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                   
                    { name: "Introduction", displayName: "Introduction", title: "Introduction", cellFilter: 'date:"dd-MM-yyyy"', width: '12%', headerCellClass: $scope.highlightFilteredHeader },
                    
                    { name: "Project_Category", displayName: "Project Category", title: "Project Category", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    
                    { name: "Sub_Category", displayName: "Sub Category", title: "Sub Category", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Objectives", displayName: "Objectives", title: "Objectives", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "URL", displayName: "URL", title: "URL", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Project_Architecture", displayName: "Project Architecture", title: "Project Architecture", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Name_Of_Modules", displayName: "Name Of Modules", title: "Name Of Modules", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Client_List", displayName: "ClientList", title: "ClientList", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Challenges", displayName: "Challenges", title: "Challenges", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Flow_Chart", displayName: "Flow Chart", title: "Flow Chart", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Purposes", displayName: "Purposes", title: "Purposes", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Visio", displayName: "Visio", title: "Visio", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Workflow", displayName: "Workflow", title: "Workflow", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Label", displayName: "Label", title: "Label", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Number_Of_People_worked", displayName: "Number Of People worked", title: "Number Of People worked", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Scope_Of_Improvement", displayName: "Scope Of Improvement", title: "Scope Of Improvement", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Time_Taken", displayName: "Time Taken", title: "Time Taken", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Client_Testimonials", displayName: "Client Testimonials", title: "Client Testimonials", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Freelancing_Platform", displayName: "Freelancing Platform", title: "Freelancing Platform", width: '20%', headerCellClass: $scope.highlightFilteredHeader },
                     
                    
                    //{ name: "TotalOrder", displayName: "Total Order", cellFilter: 'number:2', cellClass:'ForNumbered', title: "Total Order", width: '15%', headerCellClass: $scope.highlightFilteredHeader },
                    {
                        name: 'Action',
                        displayName: "Action",
                        enableColumnResizing: false,
                        enableFiltering: false,
                        enableSorting: false,
                        width: '10%',
                        headerCellClass: $scope.highlightFilteredHeader,
                        visible: true,//$scope.UserCommonEntity.visible,

                        //cellTemplate: '<span class="label label-info label-mini">' +
                        //             '<a href="javascript:void(0);" ng-href="#FileModal" data-toggle="modal" class="bs-tooltip" title="Show File List">' +
                        //                   '<i class="glyphicon glyphicon-file" aria-hidden="true" ng-click="grid.appScope.getFileInfo(row.entity)">&nbsp;File</i>' +
                        //               '</a>' +
                        //               '</span>' + $scope.UserCommonEntity.cellTemplate

                        cellTemplate: '<span class="label label-info label-mini" style="text-align:center !important;">' +
                                      '<a href="" title="Edit" ng-click="grid.appScope.loadRecordsByID(row.entity)">' +
                                        '<i class="icon-edit" aria-hidden="true"></i> Edit' +
                                      '</a>' +
                                      '</span>'

                        +

                        '<span class="label label-warning label-mini" style="text-align:center !important;">' +
                        '<a href="" title="Delete" ng-click="grid.appScope.deleteMaster(row.entity)">' +
                         '<i class="icon-glyphicon glyphicon-trash" aria-hidden="true"></i> Delete' +
                        '</a>' +
                        '</span>'

                    }
                 
                ], 
                exporterCsvFilename: 'project.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: { text: "project", style: 'headerStyle' },
                exporterPdfFooter: function (currentPage, pageCount) {
                    return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                    docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                    return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),

                exporterExcelFilename: 'project',
                exporterExcelSheetName: 'Sheet1',
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                gridMenuCustomItems: [{
                    title: 'Export all data as EXCEL',
                    action: function ($event) {
                        exportToExcel('Sheet 1', $scope.gridApi, 'all', 'all');
                    },
                    order: 110
                },
                       {
                           title: 'Export visible data as EXCEL',
                           action: function ($event) {
                               exportToExcel('Sheet 1', $scope.gridApi, 'visible', 'visible');
                           },
                           order: 111
                       }
                ]
            };
 

            var apiRoute = 'http://localhost:51576/api/Login/GetProjectList';
            var cmnParam = "[" + JSON.stringify(objcmnParam) + "]";
          
            var allcall = GetList(apiRoute, cmnParam);
                     allcall.then(function (response) 
                     {      
                        $scope.pagination.totalItems =response.data.recordsTotal;
                        $scope.gridOptionsMaster.data = response.data.projectList;
                                    
                         $scope.loaderMore = false;
                         closeModalLoader_Final();
                     },
                     function (error) {
                         //console.log("Error: " + error);
                         closeModalLoader_Final();
                     });
}
 

$scope.loaderMoreMrrMaster = true;
$scope.lblMessageForMrrMaster = 'loading please wait....!';
$scope.result = "color-red";

// end basic config
  
 // start for grid
 
  // end grid
//Edit From Master Grid Entry
$scope.loadRecordsByID = function (dataModel) 
{

          
    $scope.project_id = dataModel.project_id;
    
    
    objcmnParam = {
        pageNumber: page,
        pageSize: pageSize,
        IsPaging: isPaging,
        pid: dataModel.project_id,
        loggeduser: 1,//$scope.UserCommonEntity.loggedUserID,
        loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
        menuId: 1,//$scope.UserCommonEntity.currentMenuID,
        tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
    };

    $scope.btnShowText = "Show List";
    $scope.IsShow = true;

    $scope.IsCreateIcon = false;
    $scope.IsListIcon = true;
    $scope.IsShowDetail= true;
    $scope.IsShowMasterGrid=false; 
    $scope.btnSaveText = "Update";

  
    // start master data

   $scope.project_name = dataModel.project_name;
    
   $scope.Introduction=dataModel.Introduction;
   $scope.Project_Architecture=dataModel.Project_Architecture;
   $scope.Name_Of_Modules=dataModel.Name_Of_Modules;
   $scope.Client_List=dataModel.Client_List;
   $scope.Challenges=dataModel.Challenges;
   $scope.Flow_Chart=dataModel.Flow_Chart;
   $scope.Purposes=dataModel.Purposes;
   $scope.Visio=dataModel.Visio;
   $scope.Workflow=dataModel.Workflow;
   $scope.Label=dataModel.Label;
   $scope.Number_Of_People_worked=dataModel.Number_Of_People_worked;
   $scope.Scope_Of_Improvement=dataModel.Scope_Of_Improvement;
   $scope.Time_Taken=dataModel.Time_Taken;
   $scope.Client_Testimonials=dataModel.Client_Testimonials;
   $scope.Project_Category=dataModel.Project_Category;
   $scope.URL=dataModel.URL;
   $scope.Objectives=dataModel.Objectives;
   $scope.Sub_Category=dataModel.Sub_Category;
   $scope.Freelancing_Platform=dataModel.Freelancing_Platform;
 
    // $scope.ListProductDetail = [];

    // var cmnParam = "[" + JSON.stringify(objcmnParam)+ "]";
     
    // var apiRoute ='http://localhost:51576/api/Login/GetOrderDetailByID/';
    // var GetOrderDetailByID = GetList(apiRoute, cmnParam);
    // GetOrderDetailByID.then(function (response)
    // {

    //     $scope.ListProductDetail = response.data.lstOrderDetail;
    //     $scope.CalTotal();
        
    // },
    // function (error) {
        
    // });
     
} 
 
  

  $scope.deleteMaster = function (dataModel) 
  {

    var IsConf = confirm('You are about to delete ' + dataModel.project_name + '. Are you sure?');
    if (IsConf) 
    {
        objcmnParam = {
            pageNumber: page,
            pageSize: pageSize,
            IsPaging: isPaging,
            pid: dataModel.project_id,
            loggeduser: 1,//$scope.UserCommonEntity.loggedUserID,
            loggedCompany:1,// $scope.UserCommonEntity.loggedCompnyID,
            menuId: 1,//$scope.UserCommonEntity.currentMenuID,
            tTypeId:1,// $scope.UserCommonEntity.currentTransactionTypeID
        };

        var apiRoute = 'http://localhost:51576/api/Login/DeleteMasterByID';
        var cmnParam = "[" + JSON.stringify(objcmnParam)+ "]";
        var allcall = GetList(apiRoute, cmnParam);

        allcall.then(function (response) 
        {
            if(response.data==1)
            {
                Command: toastr["success"]("Project Deleted Successfully.");
                 $scope.loadMasterRecords(0);
                 closeModalLoader_Final();
            }
            else
            {
                Command: toastr["warning"]("Project Not Delete.");
                closeModalLoader_Final();
            }
            
        },
        function (error) {
            console.log("Error: " + error);
            closeModalLoader_Final();
        });
    };
  };


        // ===start final save ===//

$scope.save = function ()
 { 

            if ($scope.project_name == "" || $scope.project_name == null)
            {
                Command: toastr["warning"]("Please Enter Project Name.");

                return false;
            }
  
            openModalLoader_Final();  
            var Masterdata =
            { 
                project_id: $scope.project_id,
                project_name: $scope.project_name,
                Introduction: $scope.Introduction, 
                Project_Architecture: $scope.Project_Architecture, 
                Name_Of_Modules: $scope.Name_Of_Modules,
                Client_List: $scope.Client_List,
                Challenges: $scope.Challenges,
                Flow_Chart: $scope.Flow_Chart,
                Purposes: $scope.Purposes,
                Visio: $scope.Visio,
                Workflow: $scope.Workflow,
                Label: $scope.Label,
                Number_Of_People_worked: $scope.Number_Of_People_worked,
                Scope_Of_Improvement: $scope.Scope_Of_Improvement,
                Time_Taken: $scope.Time_Taken,
                Client_Testimonials: $scope.Client_Testimonials,
                Project_Category: $scope.Project_Category,
                URL: $scope.URL,
                Objectives: $scope.Objectives,
                Sub_Category: $scope.Sub_Category,
                Freelancing_Platform: $scope.Freelancing_Platform 
               // Date:  getStringToDate($scope.Date), 
                 
            };
       // var DetailData = $scope.ListProductDetail;
        
        var apiRoute = 'http://localhost:51576/api/Login/SaveUpdateProject';
        var cmnParam = "[" + JSON.stringify(Masterdata) + "]";

        var allcall = GetList(apiRoute, cmnParam);

        allcall.then(function (response) 
        {
            if(response.data==1)
            {
                Command: toastr["success"]("Data Saved Successfully.");
                $scope.Clear();
                 closeModalLoader_Final();
            }
            else
            {
                Command: toastr["warning"]("Data Not Saved.");
                closeModalLoader_Final();
            }
            
        },
    function (error) {
        console.log("Error: " + error);
        closeModalLoader_Final();
    });

};

        //=====  end final save ===//


 $scope.Clear = function()
 {
     
    $scope.IsShowMasterGrid = false;
    $scope.IsShow = true;
    $scope.IsShowDetail = true
    $scope.IsCreateIcon = false;
    $scope.IsListIcon = true;
 
    $scope.btnShowText = "Show List";
    $scope.btnSaveText = "Save";

   // var date = new Date();
  // $scope.Date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
   $scope.project_id="";
   $scope.project_name="";
   $scope.description="";
   $scope.feature_list="";
   $scope.module_list="";
   $scope.link="";
   $scope.Introduction="";
   $scope.Project_Architecture="";

   $scope.Name_Of_Modules="";
   $scope.Client_List="";
   $scope.Challenges="";
   $scope.Flow_Chart="";
   $scope.Purposes="";
   $scope.Visio="";
   $scope.Workflow="";
   $scope.Label="";
   $scope.Number_Of_People_worked="";
   $scope.Scope_Of_Improvement="";
   $scope.Time_Taken="";
   $scope.Client_Testimonials="";
   $scope.Project_Category="";
   $scope.URL="";
   $scope.Objectives="";
   $scope.Sub_Category="";
   $scope.Freelancing_Platform=""; 





  
    // $("#ddlProduct").select2('data',{ id: '', text: '--Please Select--' }); 
    // $scope.ddlProduct=null;  
    // _.defer(function () {$scope.$apply(); 
    // });
  
    $scope.loadMasterRecords(0);
 
 };


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
 