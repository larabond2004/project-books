from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time


class BookScraper:
    def __init__(self):
        self.options = Options()
        self.options.add_argument("--headless")
        self.driver = webdriver.Chrome(service=Service(
            ChromeDriverManager().install()), options=self.options)

    def get_all_categories(self):
        categories = {}
        try:
            self.driver.get("https://books.toscrape.com/index.html")
            category_elements = self.driver.find_elements(
                By.CSS_SELECTOR, ".side_categories ul li a")
            for category in category_elements[1:]:  # Пропускаем "Books"
                category_name = category.text.strip()
                category_url = category.get_attribute("href")
                categories[category_name] = category_url
        except Exception as e:
            print(f"Error getting categories: {e}")
        return categories

    def get_books_from_category(self, category_url, category_name):
        books = []
        try:
            self.driver.get(category_url)
            while True:
                book_cards = self.driver.find_elements(
                    By.CSS_SELECTOR, ".product_pod")
                for card in book_cards:
                    title_element = card.find_element(By.CSS_SELECTOR, "h3 a")
                    title = title_element.get_attribute(
                        "title") or title_element.text
                    price = card.find_element(
                        By.CSS_SELECTOR, ".price_color").text.replace("\u00a3", "")
                    image_url = card.find_element(
                        By.CSS_SELECTOR, "img").get_attribute("src")
                    book_url = title_element.get_attribute("href")
                    rating_text = card.find_element(
                        By.CSS_SELECTOR, ".star-rating").get_attribute("class")
                    rating = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}.get(
                        rating_text.split()[-1], 0)

                    if rating > 0:  # Исключаем 'Not rated'
                        books.append(
                            [title, price, rating, image_url, book_url, category_name])

                next_page = self.driver.find_elements(
                    By.CSS_SELECTOR, ".next a")
                if next_page:
                    next_url = next_page[0].get_attribute("href")
                    self.driver.get(next_url)
                    time.sleep(2)
                else:
                    break
        except Exception as e:
            print(f"Error scraping category {category_name}: {e}")
        return books

    def close(self):
        self.driver.quit()


class CSVWriter:
    @staticmethod
    def save_to_csv(data, filename="books.csv"):
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["Title", "Price", "Rating",
                            "Image URL", "Book URL", "Category"])
            writer.writerows(data)


if __name__ == "__main__":
    scraper = BookScraper()
    categories = scraper.get_all_categories()
    all_books = []

    for category_name, category_url in categories.items():
        all_books.extend(scraper.get_books_from_category(
            category_url, category_name))

    scraper.close()
    CSVWriter.save_to_csv(all_books)
    print(f"Saved {len(all_books)} books to books.csv")
