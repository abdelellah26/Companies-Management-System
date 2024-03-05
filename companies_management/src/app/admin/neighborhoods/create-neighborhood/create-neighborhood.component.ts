import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { NeighborhoodService } from '../../services/neighborhood/neighborhood.service';

@Component({
  selector: 'app-create-neighborhood',
  templateUrl: './create-neighborhood.component.html',
  styleUrls: ['./create-neighborhood.component.css']
})
export class CreateNeighborhoodComponent implements OnInit {
  neiborhoodForm: FormGroup;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private neighborhoodService: NeighborhoodService
  ){
    this.neiborhoodForm = this.formBuilder.group({
      name: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.neighborhoodService.addNeiborhood(this.neiborhoodForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Dashboard'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
