type Ability = "CREATE" | "UPDATE" | "DELETE" | "READ" | "ALL";

interface IAuthorizable {
  abilites: Map<string, Array<Ability>>;
}

export class HttpGates {
  static can(
    ability: Ability | Array<Ability>,
    resource: string,
    user: IAuthorizable
  ): boolean {
    if (typeof ability === "string") {
      return user.abilites.get(resource).includes(ability);
    }

    return ability.every((a) => user.abilites.get(resource).includes(a));
  }
}
