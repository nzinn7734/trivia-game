import { Question } from "./question.model";

export class TriviaResponse {
    private response_code!: string;
    private results!: Question[];
}
