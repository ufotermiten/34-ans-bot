import requests
from bs4 import BeautifulSoup
import datetime


def days_until_propellerkeps():
    # Step 1: Send a GET request to the website
    url = 'https://xn--lsvecka-5wa.nu/'  # Replace with your target URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Step 2: Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Step 3: Extract information
        # For example, get the page title
        läsvecka = 3 # int(soup.title.string.split(" ")[1])
        läsdag = 4 # datetime.datetime.now().weekday() + 1

        if str(läsvecka) + str(läsdag) == "34" or (läsvecka - 1) * 5 + läsdag == 34:
            return "@everyone Du ska ha på dig propellerkeps idag!!"
        elif str(läsvecka) + str(läsdag) == "43":
            return "@everyone Du ska ha på dig propellerkeps *baklänges* idag!!"
        else:
            if läsvecka < 3:
                return f"Det är {(3 - läsvecka) * 7 + 4 - läsdag} dagar kvar tills du ska ha på dig propellerkeps"
            elif läsvecka < 4:
                return f"Det är {(4 - läsvecka) * 7 + 5 - läsdag} dagar kvar tills du ska ha på dig propellerkeps *baklänges*"
            elif läsvecka < (läsvecka - 1) * 5 + läsdag:
                return f"Det är {34 - (läsvecka - 1) * 5 - läsdag} dagar kvar tills du ska ha på dig propellerkeps"
            else:
                return f"Det är {(3 + 9 - läsvecka) * 7 + 4 - läsdag} dagar kvar tills du ska ha på dig propellerkeps"

    else:
        return f"Failed to retrieve the page. Status code: {response.status_code}"