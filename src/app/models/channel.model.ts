export class ChannelModel {
    id: string | undefined;
    name: string | undefined;
    thumbnail: string | undefined;
    description: string | undefined;
    youtubeChannelId: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiresIn: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    constructor(data: any) {
        this.id = data.id ?? null;
        this.name = data?.name ?? null;
        this.thumbnail = data?.thumbnail ?? null;
        this.accessToken = data?.access_token ?? null;
        this.refreshToken = data?.refresh_token ?? null;
        this.description = data?.description ?? null;
        this.expiresIn = data?.expires_in ?? null;
        this.createdAt = data?.created_at ?? null;
        this.updatedAt = data?.updated_at ?? null;
    }
  }
  