import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { Vehicle } from './vehicle.model';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/vehicles';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve vehicles', () => {
    const mockVehicles: Vehicle[] = [
      { id: 1, placa: 'ABC1234', chassi: 'CH1', renavam: 'RN1', modelo: 'Civic', marca: 'Honda', ano: 2020 },
      { id: 2, placa: 'XYZ9876', chassi: 'CH2', renavam: 'RN2', modelo: 'Corolla', marca: 'Toyota', ano: 2021 }
    ];

    service.getVehicles().subscribe(vehicles => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should create a vehicle', () => {
    const newVehicle: Vehicle = { placa: 'NEW1111', chassi: 'CHNEW', renavam: 'RNNEW', modelo: 'NewCar', marca: 'Brand', ano: 2023 };
    const createdVehicle: Vehicle = { id: 3, ...newVehicle };

    service.createVehicle(newVehicle).subscribe(vehicle => {
      expect(vehicle.id).toBe(3);
      expect(vehicle.placa).toBe('NEW1111');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVehicle);
    req.flush(createdVehicle);
  });

  it('should update a vehicle', () => {
    const updatedVehicle: Vehicle = { id: 1, placa: 'UPDATED', chassi: 'CH1', renavam: 'RN1', modelo: 'UpdatedModel', marca: 'UpdatedBrand', ano: 2022 };

    service.updateVehicle(1, updatedVehicle).subscribe(vehicle => {
      expect(vehicle.placa).toBe('UPDATED');
      expect(vehicle.modelo).toBe('UpdatedModel');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedVehicle);
    req.flush(updatedVehicle);
  });

  it('should delete a vehicle', () => {
    service.deleteVehicle(1).subscribe(() => {
      // Success callback
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
