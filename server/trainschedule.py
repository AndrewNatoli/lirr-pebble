from bs4 import BeautifulSoup
import requests

class TrainSchedule:

    def is_response_ok(self, code):
        """
        Args:
            code (int): Should be the status_code received from the requests object

        Returns:
            boolean: True if request is 200. False if another status code is received
        """
        return code != 200


    def get(self, startsta, endsta):
        """
        Args:
            startsta (string)
            endsta   (string)
                For reference...
                    RON - Ronkonkoma
                    NYK - NY Penn Station

        Returns:
            list:   Empty list if request fails
                    List if successful!
                        Values:
                            departs
                            for
                            track
                            status
                            eta (At destination)
        """
        # Our requests will be centered around this URL
        base_url = "http://traintime.lirr.org/traintime.php?startsta=" + str(startsta) + "&endsta=" + str(endsta)
        url = base_url

        # This will be the list we return when everything works properly
        records = []

        session = requests.Session()
        r = session.get(url)

        if self.is_response_ok(r.status_code) is False:
            return []

        html = r.text

        sched_page = BeautifulSoup(html)

        # Find the schedule table...
        sched_table = sched_page.find("table")

        if sched_table is None:
            return []

        # Iterate through the table rows but note our first row is simply the table's header.
        rows = sched_table.findAll("tr")
        print "Found " + str(len(rows)-1) + " records."

        for i in range(0, len(rows)):
            'Go through each row and get the values for each cell'
            row_data = {}

            'Cycle through each column and pull the values'
            columns = rows[i].findAll("td")
            if len(columns) == 0:
                continue

            row_data['departs']         = columns[0].get_text()
            row_data['for']             = columns[1].get_text()
            row_data['track']           = columns[2].get_text()
            row_data['status']          = columns[3].get_text()
            row_data['eta']             = columns[10].get_text().replace(u"\u00a0", "")

            # Add the data to our list of records and return!
            records.append(row_data)

        return records