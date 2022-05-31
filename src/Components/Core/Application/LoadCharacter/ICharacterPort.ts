export class CharacterTO {
  characterName: string;
  //equipment: object;
}
export default interface ICharacterPort {
  exposeCharacter(CharacterTO: CharacterTO): void;
}
