import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let empList = this.employeeService.getData();
    empList.snapshotChanges().subscribe(
      item => {
        this.employeeList = [];
        item.forEach(element => {
          var data = element.payload.toJSON();
          data["$key"] = element.key;
          this.employeeList.push(data as Employee);
        })
      }
    );
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure you wan to delete this record ?')){
      this.employeeService.deleteEmployee(key);
      this.toastr.warning('Deleted successfully', 'Employee Register');
    }

  }

}
