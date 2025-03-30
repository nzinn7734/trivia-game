import { FormControl } from "@angular/forms";

export interface QuestionSearchForm {
    amount: FormControl<string>
    category: FormControl<string>
    difficulty: FormControl<string>
    type: FormControl<string>
}