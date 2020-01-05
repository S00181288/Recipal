import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../recipe-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _service: RecipeServiceService) { }



  ngOnInit() {
  }

}
