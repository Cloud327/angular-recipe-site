import { Component, Directive, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {
  formGroup: FormGroup;
  post: any = '';
  dynamictype: string = "number";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      defaultdyn: [null, Validators.required],
      defaulttemp: [null, Validators.required],
      defaultadditional: [null, Validators.required],
    });
  }

  onSubmit(post: any) {
    this.post = post;
  }
}

@Directive({
  selector: 'input[type=number]',
})
export class TestDirective {
  constructor(private elementRef: ElementRef) {}
  ngOnInit() {
    console.log('type=number', this.elementRef.nativeElement);
  }
}
