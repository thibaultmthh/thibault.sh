export default function SosPassport() {
  return (
    <div>
      <h2 className="text-xl font-bold">Sos-Passport</h2>
      <p className="text-sm">A website that enables you to find passport creation appointments in France.</p>
      <h3 className="text-lg font-bold">Concept</h3>
      <p>
        The website is an aggregator of passport creation appointments in France. It allows users to find available
        slots for passport creation at their nearest mairies. The website is designed to help users avoid long waiting
        times and ensure they can get their passport in a timely manner.
      </p>
      <h3 className="text-lg font-bold">Observation</h3>
      <p>
        Some people cancel their appointments at the last minute, which frees up nearby appointment slots. By regularly
        checking the pages of each mairie, there is a high chance of securing a last-minute appointment.
      </p>
      <h3 className="text-lg font-bold">Solution</h3>
      <p>
        An aggregator of passport creation appointments in France. Updated every 2 minutes to ensure users can find a
        last-minute appointment.
      </p>

      <a href="https://sos-passeport.fr" className="text-orange-500 hover:text-orange-600 transition-colors">
        Old website
      </a>
    </div>
  );
}
