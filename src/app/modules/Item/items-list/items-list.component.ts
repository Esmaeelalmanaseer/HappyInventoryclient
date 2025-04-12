import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { ItemParams } from '../../../shared/Models/Item';

@Component({
  selector: 'app-items-list',
  standalone: false,
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent {
  items: any[] = [];
  warehouseId!: number;

  params: ItemParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    warehouseId: 0
  };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.warehouseId = +id;
      this.params.warehouseId = this.warehouseId;
      this.loadItems();
    }
  }

  loadItems(): void {
    this.itemService.getAll(this.params).subscribe((res: any) => {
      this.items = res;
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.Delete(id).subscribe(() => {
        this.loadItems();
      });
    }
  }

  nextPage(): void {
    this.params.pageNumber++;
    this.loadItems();
  }

  previousPage(): void {
    if (this.params.pageNumber > 1) {
      this.params.pageNumber--;
      this.loadItems();
    }
  }
}
