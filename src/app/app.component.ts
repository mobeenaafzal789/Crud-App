import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EpmAddEditComponent } from './epm-add-edit/epm-add-edit.component';
import { EmployeeService } from './service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  


  constructor(private _dialog: MatDialog, private empService : EmployeeService){}
  ngOnInit(): void {
   this.getEmployeeList();
  }
  
  openAddEmplForm(){
    const _dialog =  this._dialog.open(EpmAddEditComponent);
    _dialog.afterClosed().subscribe({
      next:(val) => {
        if(val){
          this.getEmployeeList();
        }
      }
    })
  
    
  }

  getEmployeeList(){
    this.empService.getEmployeeList().subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // delete user

  deleteEmpl(id: number){
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert("Employee Delted!");
        this.getEmployeeList();
      },
      error: console.log,
    })

  }

  // edit detail

  openEditEmpl(data: any){
   this._dialog.open(EpmAddEditComponent),{
     data,
   }
  
    
  }
}


