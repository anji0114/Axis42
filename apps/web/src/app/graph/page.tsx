import User from "@/components/User";
import WithApollo from "@/components/WithApollo";

export default function Graph() {
  return (
    <WithApollo>
      <User />
    </WithApollo>
  );
}
