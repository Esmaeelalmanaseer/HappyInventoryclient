import { Component } from '@angular/core';
import { WarehouseParams } from '../../../shared/Models/Warehouse';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  standalone: false,
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss'
})
export class WarehouseListComponent {
  warehouses: any[] = [];
  params: WarehouseParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: ''
  };

  constructor(private warehouseService: WarehouseService,private router: Router) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.warehouseService.getAll(this.params).subscribe((res: any) => {
      this.warehouses = res;
    });
  }
 
  editWarehouse(id: number) {
    this.router.navigate(['/warehouse/edit', id]);
  }

  deleteWarehouse(id: number) {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.Delete(id).subscribe(() => {
        this.loadWarehouses();
      });
    }
  }

  nextPage() {
    this.params.pageNumber++;
    this.loadWarehouses();
  }
  viewItems(id: number) {
    this.router.navigate(['/warehouse/items/add', id]);
  }
  previousPage() {
    if (this.params.pageNumber > 1) {
      this.params.pageNumber--;
      this.loadWarehouses();
    }
  }
}
