import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {

  user: User; // TODO: get the user?

  changePasswordForm = new FormGroup({
    newPassword: new FormControl(null, [Validators.required]),
    newPasswordConfirm: new FormControl(null, [Validators.required]),
  })

  onSubmit(post:any) {
    this.changePasswordForm.reset()
    // TODO: tell user about new password change
    // TODO: Also tell server about new password change
  }
}
