import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-entry-card',
  templateUrl: './form-entry-card.component.html',
  styleUrls: ['./form-entry-card.component.css']
})
export class FormEntryCardComponent implements OnInit {

    @Input() width: string;
    @Input() height: string;

    constructor() {

        this.width = '';
        this.height = '';
        
    }

    ngOnInit(): void { }

    ngOnChanges(): void { }

}
