import { Component } from '@angular/core';
import { ItemCreate, ItemUpdate } from '../../../shared/Models/Item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  standalone: false,
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent {
  itemForm!: FormGroup;
  isEditMode = false;
  itemId!: number;
  warehouseId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const itemIdParam = this.route.snapshot.paramMap.get('itemId');
    const warehouseIdParam = this.route.snapshot.paramMap.get('warehouseId');

    if (itemIdParam) {
      this.isEditMode = true;
      this.itemId = +itemIdParam;
      this.loadItem();
    } else if (warehouseIdParam) {
      this.warehouseId = +warehouseIdParam;
    }
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      qty: [1, [Validators.required, Validators.min(1)]],
      costPrice: ['', Validators.required],
      msrpPrice: ['']
    });
  }

  loadItem(): void {
    this.itemService.getByid(this.itemId).subscribe((res: any) => {
      this.itemForm.patchValue(res);
      this.warehouseId = res.warehouseId;
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;

    const formData = this.itemForm.value;

    if (this.isEditMode) {
      const updateData: ItemUpdate = {
        id: this.itemId,
        ...formData,
        warehouseId: this.warehouseId
      };
      this.itemService.Update(updateData).subscribe(() => {
        this.router.navigate(['/warehouse/items', this.warehouseId]);
      });
    } else {
      const createData: ItemCreate = {
        ...formData,
        warehouseId: this.warehouseId
      };
      this.itemService.aadd(createData).subscribe(() => {
        this.router.navigate(['/warehouse/items', this.warehouseId]);
      });
    }
  }
}
