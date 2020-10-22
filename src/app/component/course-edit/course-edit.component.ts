import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/domain/course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public id: number;
  public course: Course;

  public showMsg: boolean = false;
  public msg: string;
  public type: string;

  constructor(public courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getById();
  }

  public getById() {
    let param = this.activatedRoute.params['_value'];
    this.id = param.id;

    this.courseService.getById(this.id).subscribe(data => {      
      this.course = data;
    });
  }

  public edit() {
    console.log(this.course);

    this.courseService.edit(this.course).subscribe(data => {
      this.router.navigate(['/course-list']);
    }, error => {
      console.log(error);
      this.showMsg = true;
      this.msg = 'An error has ocurred in the procedure';
      this.type = 'danger';
    });
  }
}
