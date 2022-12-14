import axios from "axios";
import Contener from "components/Contener";
import Metric from "components/Metric";
import PageTitle from "components/PageTitle";

export default function Dashboard() {
  return (
    <Contener title="Dashboard - Thibault Mathian" description="Dashboard">
      <PageTitle
        title="Dashboard"
        description="You can track here my metrics about my diffents project from various sources 🌐"
      />
      <div className="mb-16">
        <h1 className="font-bold text-2xl text-white mb-5">thibault.sh</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Metric
            name="u-v"
            description="Total unique views"
            fetcher={async () => {
              const r = await axios.get("/api/views");
              const v = r.data.totalViews;
              console.log(v);

              return v;
            }}
          />
          <Metric name="u-w-v" description="This week visitors" fetcher={async () => 1} />
        </div>
      </div>
      <div className="mb-16">
        <h1 className="font-bold text-2xl text-white mb-5">Parakeet</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Metric name="p-w-c" description="Weekly customers" fetcher={async () => "N/A"} />
          <Metric name="p-w-v" description="parakeet.fr weekly visitors" fetcher={async () => "N/A"} />
        </div>
      </div>
      <div className="mb-16">
        <h1 className="font-bold text-2xl text-white mb-5">Spotify</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Metric name="w-l-t" description="Weekly listening time" fetcher={async () => "N/A"} />
          <Metric name="currently-listening" description="Currently listening" fetcher={async () => "N/A"} />
        </div>
      </div>
    </Contener>
  );
}
