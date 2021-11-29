import { LoaderFunction, useLoaderData } from "remix";
import { Link } from "remix";
import { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  return { joke: randomJoke };
};

const JokesIndexRoute = () => {
  const { joke } = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{joke.content}</p>
      <Link to={joke.id}>"{joke.name}" Permalink</Link>
    </div>
  );
};

export default JokesIndexRoute;
