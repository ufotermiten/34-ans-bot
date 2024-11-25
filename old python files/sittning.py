import datetime
import time


def sittningsloop():
    now = datetime.datetime.now().second
    if now == 34:
        print("Knölval")
    else:
        print(now)
        print((34 - now) % 60)


while True:
    sittningsloop()
    time.sleep(1)
