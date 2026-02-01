import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { VehicleService } from './vehicle/vehicle.service';
import { of } from 'rxjs';
import { Vehicle } from './vehicle/vehicle.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockVehicleService: any;

  beforeEach(async () => {
    mockVehicleService = {
      getVehicles: jest.fn().mockReturnValue(of([])),
      createVehicle: jest.fn().mockReturnValue(of({ id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Car', marca: 'Test', ano: 2020 })),
      updateVehicle: jest.fn().mockReturnValue(of(undefined)),
      deleteVehicle: jest.fn().mockReturnValue(of(undefined)),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: VehicleService, useValue: mockVehicleService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Vehicles Test'`, () => {
    expect(component.title).toEqual('Vehicles Test');
  });

  it('should load vehicles on ngOnInit', () => {
    const vehicles: Vehicle[] = [{ id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Car', marca: 'Test', ano: 2020 }];
    mockVehicleService.getVehicles.mockReturnValue(of(vehicles));
    component.ngOnInit();
    expect(component.vehicles).toEqual(vehicles);
  });

  it('should call createVehicle and reload vehicles on saveVehicle for new vehicle', () => {
    const newVehicle: Vehicle = { placa: 'DEF5678', chassi: '76543210987654321', renavam: '98765432109', modelo: 'Truck', marca: 'New', ano: 2021 };
    const createdVehicle: Vehicle = { id: 1, ...newVehicle };
    mockVehicleService.createVehicle.mockReturnValue(of(createdVehicle));
    mockVehicleService.getVehicles.mockReturnValue(of([createdVehicle]));

    component.saveVehicle(newVehicle);

    expect(mockVehicleService.createVehicle).toHaveBeenCalledWith(newVehicle);
    expect(mockVehicleService.getVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual([createdVehicle]);
    expect(component.editingVehicle).toBeNull();
  });

  it('should call updateVehicle and reload vehicles on saveVehicle for existing vehicle', () => {
    const existingVehicle: Vehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Car', marca: 'Updated', ano: 2020 };
    mockVehicleService.updateVehicle.mockReturnValue(of(undefined));
    mockVehicleService.getVehicles.mockReturnValue(of([existingVehicle]));

    component.saveVehicle(existingVehicle);

    expect(mockVehicleService.updateVehicle).toHaveBeenCalledWith(existingVehicle.id, existingVehicle);
    expect(mockVehicleService.getVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual([existingVehicle]);
    expect(component.editingVehicle).toBeNull();
  });

  it('should call deleteVehicle and reload vehicles on deleteVehicle', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const vehicleIdToDelete = 1;
    mockVehicleService.deleteVehicle.mockReturnValue(of(undefined));
    mockVehicleService.getVehicles.mockReturnValue(of([]));

    component.deleteVehicle(vehicleIdToDelete);

    expect(mockVehicleService.deleteVehicle).toHaveBeenCalledWith(vehicleIdToDelete);
    expect(mockVehicleService.getVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual([]);
  });

  it('should set editingVehicle on editVehicle', () => {
    const vehicleToEdit: Vehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Car', marca: 'Edit', ano: 2020 };
    component.editVehicle(vehicleToEdit);
    expect(component.editingVehicle).toEqual({ ...vehicleToEdit });
  });

  it('should clear editingVehicle on cancelEdit', () => {
    component.editingVehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Car', marca: 'Edit', ano: 2020 };
    component.cancelEdit();
    expect(component.editingVehicle).toBeNull();
  });
});