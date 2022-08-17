import { Injectable } from '@nestjs/common';

@Injectable()
export class PrintService {



    print(term: any) {
        console.log(term)
    }
}


export function print() { }