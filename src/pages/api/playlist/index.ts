import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  if (req.method === "GET") {
    const playlists = await getPlaylists()
    res.status(200).send({ data: playlists });
  }
  else if (req.method === "POST") {
    const result = await createPlaylist(req.body);
    const response = mapper(result);
    res.status(201).send({ data: response });
  }
}

async function getPlaylists() {
  const playlists = await Playlist.find();
  return playlists.map((dbRecord) => {
    const playlist = dbRecord.toObject();
    return mapper(playlist);
  });
}

async function createPlaylist(object: unknown) {
  const playlist = await Playlist.create(object);
  return playlist;
}

function mapper(playlist: any) {
  return {
    name: playlist.name,
    owner: playlist.owner,
    slug: playlist.slug,
    spotifyId: playlist.spotifyId,
    upvote: playlist.upvote,
    color: playlist.color,
    id: playlist._id.toString(),
  };
}
export type Response = any;
