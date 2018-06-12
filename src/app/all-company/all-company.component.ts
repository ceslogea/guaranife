import { Component, OnInit } from '@angular/core';
import { Company } from '../Models/Company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-all-company',
  templateUrl: './all-company.component.html',
  styleUrls: ['./all-company.component.css']
})
export class AllCompanyComponent implements OnInit {

  companyes: Array<Company>;

  constructor(private _companyService:  CompanyService) { }

  ngOnInit() {
     this._companyService.get().subscribe(res => {
      this.companyes = res;
      console.log(this.companyes);
    });
  }

}
