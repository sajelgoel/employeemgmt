import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EmployeeDetailsService } from '../../services/employee-details.service';
import $ from 'jquery';
declare const $: $;

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.scss']
})
export class EmployeeContainerComponent implements OnInit {

  myForm: FormGroup;

  employees = [];
  errorMessage: string = "";
  labelName: string ="name";
  formControl:any;
  deleteIndex: number;



  constructor(private employeeDetailService: EmployeeDetailsService, private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [this.noEmptyValidator, Validators.required]]
    });
    
    this.getEmployees();
    this.onChanges();
  }

  onChanges(): void {
    this.myForm.get('name').valueChanges.subscribe(val => {
      if(this.myForm.controls.name.errors?.['emptyInput']){
        this.errorMessage = "input is empty, Please enter something.";
      }
      if(!this.myForm.controls.name.errors){
        this.errorMessage = "";
      }
    });
  }
  
  getEmployees(){
    this.employeeDetailService.getEmployees().subscribe(
      (response:any) => {
        this.employees = response; 
      },
      (error) => {
      //  this.errorMessage = error;
      });
  }

  confirmationModal(index){
    $('#staticBackdrop').modal('show');
    this.deleteIndex = index;
  }

  dismissModal(){
    this.deleteIndex = null;
  }

  deleteEmployee(){
    let index = this.deleteIndex;
    this.employeeDetailService.deleteEmployee(index).subscribe(
      (response:any) => {
        this.employees.splice(index,1)
      },
      (error) => {
      //  this.errorMessage = error;
      });
  }

  createEmployee(){
    let data = this.myForm.controls.name.value;
    this.employeeDetailService.createEmployee(data).subscribe(
      (response:any) => {
        this.employees.push({id:response.id,name:data});
      },
      (error) => {
      //  this.errorMessage = error;
      });
  }

  noEmptyValidator(control:AbstractControl){
    if(!control.value.trim()){
      return {'emptyInput':true};
    }
    return null;
  }

  trackEmployees(index, employee){
    return employee.id;
  }


  onSubmit(form: FormGroup) {
    this.createEmployee();
  }
  
}
