import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  @Input() vehicles: Vehicle[] = [];
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<number>();

  onEdit(vehicle: Vehicle): void {
    this.edit.emit(vehicle);
  }

  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      this.delete.emit(id);
    }
  }
}