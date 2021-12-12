import React, { Component } from "react";
import "./EmployeeTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ReactTable,{useTable} from "react-table";  
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BasicTable from "./BasicTable";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;


class AdminEmployeeTable extends Component {
  state = {
    employeeData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Employee Code",
        field: "EmployeeCode",
        sortable: true,
        width: 140,
        // filter: true ,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        // filter: true ,
        width: 150,
      },
      {
        headerName: "Account Access",
        field: "Account",
        sortable: true,

        // width: 70,
        // filter: true ,
      },
      {
        headerName: "First Name",
        field: "FirstName",
        sortable: true,
        width: 110,

        // filter: true ,
      },
      {
        headerName: "Middle Name",
        field: "MiddleName",
        sortable: true,
        width: 130,

        // filter: true ,
      },
      {
        headerName: "Last Name",
        field: "LastName",
        sortable: true,
        width: 110,

        // filter: true ,
      },
      {
        headerName: "DOB",
        field: "DOB",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter"
      },
      {
        headerName: "ContactNo",
        field: "ContactNo",
        sortable: true,
        width: 117,
        // filter: true ,
      },

      {
        headerName: "Role",
        field: "RoleName",
        sortable: true,

        width: 70,
        // filter: true ,
      },
     
      {
        headerName: "Department Name",
        field: "DepartmentName",
        sortable: true
        ,
        width: 120,
        // filter: true ,
      },



      {
        headerName: "Date Of Joining",
        field: "DateOfJoining",
        sortable: true
        ,
        width: 120,
        // filter: true ,

      },
      // {
      //   headerName: "",
      //   field: "info",
      //   filter: false,
      //   width: 30,
      //   // cellRenderer:this.ageCellRendererFunc,
      //   // cellRendererFramework: function(params) {
      //   //   return <button OnClick={console.log("pa",params)}>Test</button>;
      //   // },
      //   cellRendererFramework: this.renderInfoButton.bind(this),


      // },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        // cellRenderer:this.ageCellRendererFunc,
        // cellRendererFramework: function(params) {
        //   return <button OnClick={console.log("pa",params)}>Test</button>;
        // },
        cellRendererFramework: this.renderEditButton.bind(this),


      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        // cellRenderer:this.ageCellRendererFunc,
        // cellRendererFramework: function(params) {
        //   return <button OnClick={console.log("pa",params)}>Test</button>;
        // },
        cellRendererFramework: this.renderButton.bind(this),


      },

    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 100,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  employeeObj = [];
  rowDataT = [];
  

  loadEmployeeData = () => {
    axios
      .get(process.env["REACT_APP_API_URL"] + "/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.employeeObj = response.data;
        console.log("response---->", response);
        this.setState({ employeeData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        console.log("")
        const obj =[
          {
            company: "Alfred",
            contact: "Maria Anders",
            country: "Germany"
          },
          {
            company: "Centro comercial Moctezuma",
            contact: "Francisco Chang",
            country: "Mexico"
          },
          {
            company: "Ernst Handel",
            contact: "Roland Mendel	",
            country: "Austria"
          }
        ]
        response.data.map(data => {
          let temp = {
            
            Email: data["Email"],
           // Password: data["Password"],
            Account: data["Account"] == 1 ? "Admin" : (data["Account"] == 2 ? "HR" : (data["Account"] == 3 ? "Employee" : "")),
            RoleName: data["role"] && data["role"].length>0 ? data["role"][0]["RoleName"] :" ",
            FirstName: data["FirstName"],
            MiddleName: data["MiddleName"],
            LastName: data["LastName"],
            DOB: data["DOB"].slice(0, 10),
            ContactNo: data["ContactNo"],
            EmployeeCode: data["EmployeeCode"],
            DepartmentName: data["department"] && data["department"].length>0 ?data["department"][0]["DepartmentName"]:" ",
            PositionName: " ",
            DateOfJoining: data["DateOfJoining"].slice(0, 10)
          };
          

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onEmployeeDelete = e => {
    console.log("employee id",e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      //window.alert("You are not allowed to perform this operation");
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/employee/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadEmployeeData();
  }
  handleClick = (e) => {
    console.log(e);
  }
  renderInfoButton(params) {
    console.log(params);
    return <div>
      <FontAwesomeIcon
        icon={faInfoCircle}
        onClick={() => this.props.onEmpInfo(params.data.data)}
      /></div>;
  }
  renderButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => this.onEmployeeDelete(params.data.data["_id"])}
    />;
  }
  renderEditButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => this.props.onEditEmployee(params.data.data)}
    />;
  }

  searchChange = e => {
    console.log(e.target.value);
    this.setState({ searchData: e.target.value });
  };
  // getFilteredEmp() {
  //   return this.employeeObj.filter(emp => {
  //     return (
  //       emp["Email"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["role"][0]["RoleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["FirstName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["MiddleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["LastName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DOB"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["ContactNo"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["EmployeeCode"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["department"][0]["DepartmentName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["position"][0]["PositionName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DateOfJoining"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase())
  //     );
  //   });
  // }

  render() {
    console.log("this.state.rowdata",this.state.rowData)
    const columns =  [
        {
          Header: "Email",
          accessor: "Email" // accessor is the "key" in the data
        },
        // {
        //   Header: "Password",
        //   accessor: "Password"
        // },
        {
          Header: "Account",
          accessor: "Account"
        },
        
          {
            Header: "RoleName",
            accessor: "RoleName"
          },
          {
            Header: "FirstName",
            accessor: "FirstName"
          },
          {
            Header: "MiddleName",
            accessor: "MiddleName"
          },
          
            {
              Header: "LastName",
              accessor: "LastName"
            },
            {
              Header: "DOB",
              accessor: "DOB"
            },
            
              {
                Header: "ContactNo",
                accessor: "ContactNo"
              },
              {
                Header: "EmployeeCode",
                accessor: "EmployeeCode"
              },
              {
                Header: "DepartmentName",
                accessor: "DepartmentName"
              },
              
                {
                  Header: "PositionName",
                  accessor: "PositionName"
                },
                {
                  Header: "DateOfJoining",
                  accessor: "DateOfJoining"
                },
        
      ]
      
    
  const data =[
        {
          company: "Alfred",
          contact: "Maria Anders",
          country: "Germany"
        },
        {
          company: "Centro comercial Moctezuma",
          contact: "Francisco Chang",
          country: "Mexico"
        },
        {
          company: "Ernst Handel",
          contact: "Roland Mendel	",
          country: "Austria"
        }
      ]
      console.log("row data-->",data)
      var rowStyle={
        backgroundColor:'red'
      }
     
    return (
      
      <div id="table-outer-div-scroll" style={{}}>
        <h2 id="role-title">Employee Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddEmployee}
        >
         
          Add
        </Button>

        <div id="clear-both" />
        {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
          //   style={
          //     {
          //     height: "500px",
          //     width: "100%"
          //   }
          // }
          >
 {/* <ReactTable  
            data={data}  
            columns={columns}  
           // defaultPageSize = {2}  
            //pageSizeOptions = {[2,4, 6]}  
         />   */}
         <BasicTable data={this.state.rowData} columns={columns}/>

            {/* <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowStyle={{rowStyle}}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            /> */}
          </div>
        ) : (
            <div id="loading-bar">
              <RingLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={"#0000ff"}
                loading={true}
              />
            </div>
          )}

      </div>
    );
  }
}

export default AdminEmployeeTable;
