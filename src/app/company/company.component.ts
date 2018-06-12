import { Component, OnInit } from '@angular/core';
import { CoinTypeService } from '../services/coin.type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CnpjService } from '../services/cnpj.service';
import { ICompany } from '../Models/ICompany';
import { Observable } from 'rxjs/Observable';
import { Company } from '../Models/Company';
import { CompanyService } from '../services/company.service';
import { ToastrServices } from '../services/toastr.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  cointypes: any;
  mainForm: FormGroup;

  nome: FormControl;
  email: FormControl;
  cnpj: FormControl;

  uf: FormControl;
  bairro: FormControl;
  logradouro: FormControl;
  numero: FormControl;
  cep: FormControl;
  complemento: FormControl;
  id: FormControl;

  code: FormControl;

  company: Company;

  // public model = new Company();
  // public CompanyCoinType: null;
  // public coins: Array<any>;
  constructor(private _coinService: CoinTypeService, private _conpjservice: CnpjService,
    private _companyService: CompanyService, private toastrService: ToastrServices) { }

  ngOnInit() {
    this.createForm();
    this.cointypes = [];
    this._coinService.get().subscribe(res => {
      if (this.toastrService.checkErrorsAjax(res))
        Object.keys(res).forEach(key => this.cointypes.push(res[key]));
    });
  }

  searchByCnpj() {
    this._conpjservice.get(this.mainForm.value.cnpj).subscribe(
      data => {
        this.setCompany(data);
        this.toastrService.showSuccess('Dados recuperados via CNPJ com sucesso!');
      },
      error => this.toastrService.checkErrorsAjax(error, 'Verifique se o campo CNPJ esta preenchido e se o formato esta correto')
    );
  }

  create(createNew: boolean) {
    console.log('a')
    this.validateAllFormFields(this.mainForm);
    // if (this.mainForm.invalid)
    //   return;
    const seila = this.getValue();
    const company = {
      cnpj: this.cnpj.value,
      nome: this.nome.value,
      email: this.email.value,
      address: {
        uf: this.uf.value,
        bairro: this.bairro.value,
        logradouro: this.logradouro.value,
        numero: this.numero.value,
        cep: this.cep.value,
        complemento: this.complemento.value,
      },
      currentRootCoinValues: this.cointypes.filter(r => r.code === seila.code)[0]
    };

    this._companyService.create(company).subscribe(
      data => {
        if(data.error){
          this.toastrService.checkErrorsAjax(data)
          return;
        }
        this.toastrService.showSuccess('Dados salvos com sucesso!');
        this.resetModel();
      },
      error => this.toastrService.checkErrorsAjax(error)
    );
  }

  getValue(): any {
    return {
      ...this.mainForm.value,
      Id: -1,
    };
  }

  setCompany(company: ICompany) {
    this.nome.setValue(company.nome);
    this.cnpj.setValue(company.cnpj);

    if (company.address != null) {
      this.uf.setValue(company.address.uf);
      this.bairro.setValue(company.address.bairro);
      this.cep.setValue(company.address.cep);
      this.complemento.setValue(company.address.complemento);
      this.logradouro.setValue(company.address.logradouro);
      this.numero.setValue(company.address.numero);
    }
  }

  resetModel() {
    this.mainForm.reset();
    this.mainForm.setValue({
      nome: '',
      email: '',
      cnpj: '',

      uf: '',
      bairro: '',
      logradouro: '',
      numero: '',
      cep: '',
      complemento: '',

      code: ''
    });
  }

  createForm() {
    this.nome = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.cnpj = new FormControl('', [Validators.required]);

    this.uf = new FormControl('', [Validators.required]);
    this.bairro = new FormControl('', [Validators.required]);
    this.logradouro = new FormControl('', [Validators.required]);
    this.numero = new FormControl('', [Validators.required]);
    this.cep = new FormControl('', [Validators.required]);
    this.complemento = new FormControl('', []);

    this.code = new FormControl('', [Validators.required]);

    this.mainForm = new FormGroup({
      nome: this.nome,
      email: this.email,
      cnpj: this.cnpj,

      uf: this.uf,
      bairro: this.bairro,
      logradouro: this.logradouro,
      numero: this.numero,
      cep: this.cep,
      complemento: this.complemento,

      code: this.code
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    let fields = [];
    let code = 'Tipo de moeda';
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid)
          if (field === 'code') //gambis....
            fields.push(` ${code}`)
          else
            fields.push(` ${field}`)
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
    if(fields.length)
      this.toastrService.showError(fields.toString(), `Campos obrigatórios:`);
  }

}
