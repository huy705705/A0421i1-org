import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPipePipe } from './content-pipe.pipe';



@NgModule({
    declarations: [ContentPipePipe],
    exports: [
        ContentPipePipe
    ],
    imports: [
        CommonModule
    ]
})
export class ValidatorModule { }
