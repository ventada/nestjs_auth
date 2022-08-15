import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {

    // check for arabic letter and replace it
    //mabe some validation later
    signupInputValidatin(input) {
        let output = {
            data: { ...input },
            error: null
        };
        const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        let balance = Number(p2e(input.balance))
        console.log(typeof balance);

        if (!Number.isInteger(balance)) {
            output.error = 'balance should be a Number'
            return output
        }

        output.data.balance = balance
        // TODO
        // add th arabic to persian
        output.data.fullname = arabicToPersian(output.data.fullname)


        return output.data






    }

}


function arabicToPersian(text: string) {
    let conditions = ['ي', 'ك', 'ة']
    let solutions = ['ی', 'ک', 'ه']
    let result = conditions.some(el => text.includes(el))

    if (result) {
        text = replaceAll(text, conditions[0], solutions[0])
        text = replaceAll(text, conditions[1], solutions[1])
        text = replaceAll(text, conditions[2], solutions[2])
    }
    return text;
}

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}