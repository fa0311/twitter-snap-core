import { TwitterJSX } from "app/api/twitter/route";
import { TwitterSettings } from "app/component/twitter/settings";


type SearchParams = Omit<Parameters<typeof TwitterJSX>[0], "tweetId">;
type SearchParamsProps = Partial<SearchParams>;


type Props = {
  params: { id: string };
  searchParams: SearchParamsProps;
}

export default function Twitter({ params, searchParams }: Props) {
  const id = params.id;

  const param: SearchParams = {
    theme: searchParams.theme ?? "ocean-blue",
  };

  return (
    <>
      <TwitterSettings tweetId={id} {...param} />
      <TwitterJSX tweetId={id} {...param} />
    </>
  );
}
