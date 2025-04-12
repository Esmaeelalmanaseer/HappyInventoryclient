import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-log-viewer',
  standalone: false,
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'] 
})
export class LogViewerComponent {
  logs: string = '';
  filteredLogs: string = '';
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7296/api/Logs?addAuth=true', { responseType: 'text' })
      .subscribe(res => {
        this.logs = res;
        this.filteredLogs = res;
      });
  }

  onSearch(): void {
    if (!this.searchText) {
      this.filteredLogs = this.logs;
    } else {
      const lines = this.logs.split('\n');
      this.filteredLogs = lines.filter(line => line.toLowerCase().includes(this.searchText.toLowerCase())).join('\n');
    }
  }

  downloadLog(): void {
    window.open('https://localhost:7296/api/Logs/download?addAuth=true', '_blank');
  }
}
