import { Result } from "./result"

export interface TriviaResponse {
    response_code: number
    results: Result[]
}
