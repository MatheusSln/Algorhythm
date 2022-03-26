import { EnumType } from "typescript";

export class Exercise{
  moduleId: number;
  question: string;
  level: number;
  alternatives: string[];
  correctAlternative: string;
}
