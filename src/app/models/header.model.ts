export class HeaderModel {
  label: string | undefined;
  icon: string | undefined;
  link: string | undefined;
  value: string | undefined;

  constructor(data: any) {
    this.label = data.label ?? null;
    this.icon = data?.icon ?? null;
    this.link = data?.link ?? null;
    this.value = data?.data ?? null
  }
}
