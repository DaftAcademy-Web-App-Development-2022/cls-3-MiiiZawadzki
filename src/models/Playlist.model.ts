import { model, models, Schema } from "mongoose";

interface PlaylistModel {
  color?: string;
  name: string;
  owner: string;
  slug: string;
  spotifyId: string;
  upvote: number;
}

const schema = new Schema<PlaylistModel>({
  color: { type: String, default: "#000000" },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  slug: { type: String, required: true },
  spotifyId: { type: String, required: true },
  upvote: { type: Number, required: true },
});

export type PlaylistModelWithId = PlaylistModel & { id: string };

export const Playlist = models.PlaylistModel || model<PlaylistModel>("PlaylistModel", schema);