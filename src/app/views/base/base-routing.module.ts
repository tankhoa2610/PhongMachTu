import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { TablesComponent } from './tables.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },      
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
