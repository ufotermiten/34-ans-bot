import random
from bs4 import BeautifulSoup
from lxml import html
import cloudscraper

root = "https://www.comics.org"


def djungelordspråksGenerator():
    with open("djungelordspråk.txt", encoding="UTF-8") as f:
        phrases = f.readlines()
    return random.choice(phrases)


def get_cover_link_list():
    # Define the URL of the webpage (Cloudflare-protected page)
    url = "https://www.comics.org/series/9794"

    # Create a scraper object to handle Cloudflare's anti-bot protection
    # Create a scraper object that handles Cloudflare's anti-bot protection
    scraper = cloudscraper.create_scraper()

    # Send a GET request to fetch the HTML content of the page
    page_content = scraper.get(url).content

    # Parse the HTML content with lxml
    tree = html.fromstring(page_content)

    # Use XPath to get an element (Example: targeting /html/body/div/div[2]/div[4]/div)
    xpath = "/html/body/div/div[2]/div[4]/div"
    parent_element = tree.xpath(xpath)

    print(parent_element)
    clean_list = list()

    # If the element exists, you can get its text or further sub-elements
    if parent_element:
        # Extract the first element that matches the XPath
        element = parent_element[0]

        # To print the HTML of this element
        # print(html.tostring(element, pretty_print=True).decode())

        # If you want to extract links inside this element
        links = element.xpath(
            ".//a/@href"
        )  # Get all href attributes from 'a' tags inside the element
        for link in links:
            if link.endswith("/4/"):
                clean_list.append(root + link)
    else:
        print("No element found at the given XPath")

    return clean_list


def create_txt_file():
    with open("link_to_cover_list.txt", "w+") as f:
        for link in get_cover_link_list():
            f.write(link + "\n")


def get_cover():
    cover_img_link_list = list()

    with open("link_to_cover_list.txt") as f:
        links = f.readlines()
    # Define the URL of the webpage (Cloudflare-protected page)
    with open("cover_img_link_2.txt", "w+") as f:
        for i, url in enumerate(links):
            url = url[:-1]
            print(f"{i+1}/{len(links)}: {url}")
            # Create a scraper object to handle Cloudflare's anti-bot protection
            scraper = cloudscraper.create_scraper()
            # Send a GET request to fetch the HTML content of the page
            page_content = scraper.get(url)

            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(page_content.text, "html.parser")

            # Find all 'img' tags with a specific class (e.g., 'example-class')
            img_elements = soup.find_all("img", class_="cover_img")

            # Print the 'src' attribute of each image
            for img in img_elements:
                link = img.get("src")
                f.write(link + "\n")
                cover_img_link_list.append(link)  # Prints the URL of the image

    return cover_img_link_list


def get_cover_for_reals():
    with open("cover_img_link.txt") as f:
        lines = f.readlines()
        return random.choice(lines)[:-2:]
