import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/domain/course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-save',
  templateUrl: './course-save.component.html',
  styleUrls: ['./course-save.component.css']
})
export class CourseSaveComponent implements OnInit {

  public course: Course;

  public showMsg: boolean = false;
  public msg: string;
  public type: string;

  constructor(public courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.course = new Course(0, '', 0);
  }

  public save() {

    console.log(this.course);

    this.courseService.save(this.course).subscribe(data => {
      this.router.navigate(['/course-list']);
    }, error => {
      console.log(error);
      this.showMsg = true;
      this.msg = 'An error has ocurred in the procedure';
      this.type = 'danger';
    });
  }
}
