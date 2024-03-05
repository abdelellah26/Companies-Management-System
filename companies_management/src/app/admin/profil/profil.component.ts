import { Component, NgZone } from '@angular/core';
import { ProfilService } from '../services/profil/profil.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private profilService: ProfilService,
  ) {
    this.updateForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
      email: [''],
      gender: [''],
    });

    this.profilService.getProfil().subscribe(
      (res: any) => {

        // Assurez-vous que les propriétés existent avant d'essayer d'y accéder
        if (Array.isArray(res) && res.length > 0) {
          const adminInfo = res[0];
          this.updateForm.setValue({
            first_name: adminInfo.first_name,
            last_name: adminInfo.last_name,
            phone: adminInfo.phone,
            email: adminInfo.email,
            gender: adminInfo.gender,
          });
        }
      },
    );
  }
}
