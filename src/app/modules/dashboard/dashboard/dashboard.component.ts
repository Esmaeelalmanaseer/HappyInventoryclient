import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { WarehouseStatusDto } from '../../../shared/Models/Warehouse';
import { ItemStatDto } from '../../../shared/Models/Item';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  warehouseStatus: WarehouseStatusDto[] = [];
  topHighItems: ItemStatDto[] = [];
  topLowItems: ItemStatDto[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getWarehouseStatus().subscribe({
      next: res => this.warehouseStatus = res,
      error: err => console.error('Warehouse error:', err)
    });
    
    this.dashboardService.getTopHighItems().subscribe({
      next: res => this.topHighItems = res,
      error: err => console.error('Top High error:', err)
    });
    
    this.dashboardService.getTopLowItems().subscribe({
      next: res => this.topLowItems = res,
      error: err => console.error('Top Low error:', err)
    });
  }
}