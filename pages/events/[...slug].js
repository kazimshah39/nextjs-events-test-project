import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";

import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  // Run it when component render first time
  if (!filterData) {
    return <p>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // Make values (int) from string
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // validate filter url

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter values, please adjust the values</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length == 0) {
    return <p>No event fount for the chosen filter!</p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
