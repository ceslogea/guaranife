import { Component, OnInit } from '@angular/core';
import { CoinTypeService } from '../services/coinType.service';
import { Company } from '../Models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public model = new Company();
  public CompanyCoinType: null;
  public coins: Array<any>;
  constructor(private _coinService: CoinTypeService) { }

  ngOnInit() {
    this._coinService.get().subscribe(res => { 
      this.coins = new Array<any>()
      for(var key in res)
        this.coins.push(res[key])
      console.log(this.coins)
    });
  }

}
