import { TwitterJSX } from "../api/twitter/route";
import { TwitterSettings } from "../component/twitter/settings";

type SearchParams = Omit<Parameters<typeof TwitterJSX>[0], "tweetId">;
type SearchParamsProps = Partial<SearchParams>;

type Props = {
  params: { id: string };
  searchParams: SearchParamsProps;
};

export default function Twitter({ params, searchParams }: Props) {
  const id = params.id;

  const param: SearchParams = {
    theme: searchParams.theme ?? "RenderOceanBlueColorImage",
  };

  return (
    <>
      <TwitterSettings tweetId={id} {...param} />
      <TwitterJSX tweetId={id} {...param} />
    </>
  );
}
