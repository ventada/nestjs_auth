import { Global, Module } from '@nestjs/common';
import { PrintService, print } from './print.service';


@Global()
@Module({
  providers: [PrintService],
  exports: [PrintService]
})
export class PrintModule { }
