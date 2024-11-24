import {RolesModel} from "./roles.model";

export class UserModel {
  id: string | undefined;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  role: RolesModel | null;
  constructor(data: any) {
    this.id = data.id ?? null;
    this.name = data?.name ?? null;
    this.username = data?.username ?? null;
    this.email = data?.email ?? null;
    this.role = data?.role ? new RolesModel(data?.role) : null;
  }
}
