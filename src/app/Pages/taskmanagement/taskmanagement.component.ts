import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskdilogComponent } from './taskdilog/taskdilog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { TaskmanagementService } from './taskmanagement.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-taskmanagement',
  templateUrl: './taskmanagement.component.html',
  styleUrls: ['./taskmanagement.component.scss']
})

export class TaskmanagementComponent implements OnInit {
  dialogRef = null;
  displayedColumns: string[] = ['Date', 'Title', 'Description', 'Priority', 'label', 'type', 'action'];
  dataSource = new MatTableDataSource([]);
  backUpdetails: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  currentUserDetail: any = {}
  lstPriority = [
    { value: 1, viewValue: 'High' },
    { value: 2, viewValue: 'Low' },
  ];
  lstLable = [
    { value: 1, name: 'Feature' },
    { value: 2, name: 'Front end' },
    { value: 3, name: 'Change Request' },
    { value: 4, name: 'Back End' },

  ]
  lstType = [
    { value: 1, name: 'Task' },
    { value: 2, name: 'Story' },
    { value: 3, name: 'Bug' },

  ]
  constructor(
    private dialog: MatDialog,
    private snackBar: MatsnackbarService,
    private router: Router,
    private tasksrv: TaskmanagementService) {

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    var userData: any = this.snackBar.fnGetToken();
    if (userData && userData.accessToken) {
      this.currentUserDetail = _.cloneDeep(userData)
    }
    this.fnLoadTaskDetails();
  }


  fnOpenTaskDilod(data) {
    this.dialogRef = this.dialog.open(TaskdilogComponent, {
      width: '550px',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.title == 'Edit') {
          this.fnEdittask(result.data, result._id);
        } else {
          this.fnAddTask(result.data);
        }
      }
    });
  }
  fnAddTask(result) {
    this.tasksrv.fnAddTask(result).then((res: any) => {
      if (res) {
        this.fnLoadTaskDetails();
      }
    })
  }

  fnEdittask(result, id) {
    this.tasksrv.fnEditTask(result, id).then((res: any) => {
      if (res) {
        this.fnLoadTaskDetails();
      }
    })
  }
  fnLogOut() {
    this.snackBar.fnRemoveToken();
    this.snackBar.openSnackBar('Logout Successfully', 'Success')
    this.router.navigate(['/login'])

  }

  fnLoadTaskDetails() {

    this.tasksrv.fnGetAllTask().then((result: any) => {
      if (result && result.data && result.data.length) {
        this.backUpdetails = _.cloneDeep(result.data);
        result.data.filter((res: any) => {
          res.priority = res.priority ? this.lstPriority.filter(r => res.priority == r.value)[0].viewValue : '';
          res.type = res.type ? this.lstType.filter(r => res.type == r.value)[0].name : '';
          res.label = this.fnGetLabel(res.label)
        })
        this.dataSource.data = _.cloneDeep(result.data || [])
      } else {
        this.dataSource.data = [];
        this.backUpdetails = [];
      }
    })
  }
  fnGetLabel(labels) {
    if (labels && labels.length > 0) {
      var labelsDetails: any = [];
      labels.filter(res => {
        labelsDetails.push(this.lstLable.filter(r => r.value == res)[0].name)
      })
      return labelsDetails.toString();
    } else {
      return '';
    }
  }
  fnDelete(item) {
    if (item._id) {
      this.tasksrv.fnDeleteTask(item._id).then((res: any) => {
        this.fnLoadTaskDetails();
      })
    } else {
      return false;
    }

  }

  fnEdit(item) {
    var data = this.backUpdetails.filter((r: any) => r._id == item._id)[0];
    this.fnOpenTaskDilod(data)
  }
}
