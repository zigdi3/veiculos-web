import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle/vehicle.model';
import { VehicleService } from './vehicle/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Vehicles Test";
  vehicles: Vehicle[] = [];
  editingVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => this.vehicles = data,
      error: (err) => console.error('Error loading vehicles:', err)
    });
  }

  saveVehicle(vehicle: Vehicle): void {
    if (vehicle.id) {
      this.vehicleService.updateVehicle(vehicle.id, vehicle).subscribe({
        next: () => {
          this.loadVehicles();
          this.cancelEdit();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.vehicleService.createVehicle(vehicle).subscribe({
        next: () => {
          this.loadVehicles();
          this.cancelEdit();
        },
        error: (err) => console.error('Create failed:', err)
      });
    }
  }

  deleteVehicle(id: number): void {
    if (confirm('Confirm deletion? This action cannot be undone.')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => this.loadVehicles(),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  editVehicle(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle };
  }

  cancelEdit(): void {
    this.editingVehicle = null;
  }
}
