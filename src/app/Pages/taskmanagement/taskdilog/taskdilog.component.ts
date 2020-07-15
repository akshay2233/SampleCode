import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-taskdilog',
  templateUrl: './taskdilog.component.html',
  styleUrls: ['./taskdilog.component.scss']
})
export class TaskdilogComponent implements OnInit {
  taskformForm: FormGroup;
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
  title: any = "Add";
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskdilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm()
  }



  initForm() {
    
    this.taskformForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', [Validators.required]],
      label: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
    if (this.data) {
      this.title = 'Edit';
      this.taskformForm.patchValue(this.data)
    }


  }
  onSubmit() {
    if (this.taskformForm.valid) {
      var params = {
        data: this.taskformForm.value,
        title: this.title,
        _id: this.data ? this.data._id : ''
      }
      
      if (this.title == 'Edit') {
        this.dialogRef.close(params);

      } else {
        this.dialogRef.close(params);

      }
    }
  }

  fnCancel() {
    this.taskformForm.reset();
    this.dialogRef.close();

  }
}
