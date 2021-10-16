import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-form',
  templateUrl: './manual-form.component.html',
  styleUrls: ['./manual-form.component.css']
})
export class ManualFormComponent implements OnInit {

  @Input() width: string;
  @Input() height: string;

  constructor() { 
    this.width = '';
    this.height = '';
  }

  ngOnInit(): void {
  }

}
