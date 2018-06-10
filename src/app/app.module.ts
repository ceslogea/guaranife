import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AllCompanyComponent } from './all-company/all-company.component';
import { CompanyComponent } from './company/company.component';
import { CoinTypeService } from './services/coinType.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './Infra/Interceptor';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  // { path: '/', component: AppComponent },
  { path: '',   redirectTo: '/Company', pathMatch: 'full' },
  { path: 'AllCompany', component: AllCompanyComponent },
  { path: 'Company', component: CompanyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    AllCompanyComponent,
    CompanyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [CoinTypeService, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
