import { InMemoryDbService } from "angular-in-memory-web-api";
import { HEROES } from "../mock/heroes";

export class InMemoryDataServiceService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const heroes = HEROES
    return { heroes }
  }
}
