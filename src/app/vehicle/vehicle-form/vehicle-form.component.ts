import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  @Input() vehicle: Vehicle | null = null;
  @Output() save = new EventEmitter<Vehicle>();
  @Output() cancel = new EventEmitter<void>();

  formData!: Vehicle;

  ngOnInit(): void {
    this.formData = this.vehicle ? { ...this.vehicle } : {
      placa: '',
      chassi: '',
      renavam: '',
      modelo: '',
      marca: '',
      ano: 0
    };
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.save.emit(this.formData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}