import { Component } from '@angular/core';
import { WarehouseCreate, WarehouseUpdate } from '../../../shared/Models/Warehouse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-form',
  standalone: false,
  templateUrl: './warehouse-form.component.html',
  styleUrl: './warehouse-form.component.scss'
})
export class WarehouseFormComponent {
  warehouseForm!: FormGroup;
  isEditMode: boolean = false;
  warehouseId!: number;
  countries = ['USA', 'Germany', 'Egypt', 'Saudi Arabia', 'France'];

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Check if it's edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.warehouseId = +idParam;
      this.loadWarehouse();
    }
  }

  initForm() {
    this.warehouseForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  loadWarehouse() {
    this.warehouseService.getByid(this.warehouseId).subscribe((res: any) => {
      this.warehouseForm.patchValue(res);
    });
  }

  onSubmit() {
    if (this.warehouseForm.invalid) return;

    const warehouseData = this.warehouseForm.value;

    if (this.isEditMode) {
      const updateData: WarehouseUpdate = {
        id: this.warehouseId,
        ...warehouseData
      };
      this.warehouseService.Update(updateData).subscribe(() => {
        this.router.navigate(['/warehouse']);
      });
    } else {
      const createData: WarehouseCreate = { ...warehouseData };
      this.warehouseService.aadd(createData).subscribe(() => {
        this.router.navigate(['/warehouse']);
      });
    }
  }
}
