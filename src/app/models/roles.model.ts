export class RolesModel {
  id: string | undefined;
  name: string | undefined;
  constructor(data: any) {
    this.id = data.id ?? null;
    this.name = data?.name ?? null;
  }
}
