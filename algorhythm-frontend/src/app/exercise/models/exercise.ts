import { Alternative } from "./alternative";

export class Exercise{
  id: string;
  moduleId: number;
  question: string;
  level: number;
  alternatives: string[];
  correctAlternative: string;
  alternativesUpdate: Alternative[];
  deletedAt: string;
}
