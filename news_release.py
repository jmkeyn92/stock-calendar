from bs4 import BeautifulSoup
from urllib.request import urlopen
import urllib
# import pandas as pd
import feedparser
from pprint import pprint
import csv
import time
from datetime import datetime
import telegram
import telepot
import requests

key = '5937284055:AAGDgus64D-HwMpOzdpMncqXufer2xIb0D8'
telegram_group_id = 'Chiron_partners'

# 리스트가 길어서 보기가 불편하면 Alt + z 를 누르세요!!
companies = ['비보존제약', '텔콘RF제약', '우진', '유니셈', '한국캐피탈', '부산주공', 'NK맥스', '뉴인텍', '에이엔피', '비보존제약', '대유플러스', '갤럭시아머니트리', '비엠티',  '폴라리스우노', '미스터블루', '와이제이엠게임즈', '엔시트론', '에이치엔비디자인', '키이스트', '이엠앤아이', '폴라리스세원', '폴라리스오피스', '네오펙트', '앱코', '웰바이오텍', '에스티큐브', 'WSI', '비트나인', '경동제약', '에이티세미콘',  '엑서지21']

def news_release():
    
    while True:
        
        class BreakIt(Exception): pass
        
        for company in companies:

            html = urlopen('https://search.naver.com/search.naver?where=news&query={}&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Add%2Cp%3Aall&is_sug_officeid=0'.format(urllib.parse.quote(company)))
            bs_obj = BeautifulSoup(html, 'html.parser')
            name_list = bs_obj.find_all('div', {'class':'api_save_group _keep_wrap'})
            list_URL = [ child.get('data-url') for name in name_list for child in name.findChildren('a', recursive=False) ]

            try:
                for url in list_URL[0:5]:
                    with open('./news_release_URL.csv', 'r', encoding='utf-8-sig') as f: 
                        reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE) 
                        for line in reader:
                            line = ''.join(line)
                            if line == url:
                                print(company, '중복입니다!', sep=': ')
                                raise BreakIt
                            else:
                                continue  #Loop를 계속 돌려서 중복이 모든 line에 없으면 아래로 이동
                                
                        message = '[ {} ]\n{}'.format(company, url)

                        telegram_api_url = f'https://api.telegram.org/bot{key}/sendMessage?chat_id=@{telegram_group_id}&text={message}'
                        tel_resp = requests.get(telegram_api_url)
                        print(tel_resp.status_code)
                        
                        if tel_resp.status_code == 200:
                            print(message)
                        else:
                            print(company, 'Error')

                        print('항목 추가 완료')
                        time.sleep(1)

                    with open('./news_release_URL.csv', 'a', encoding='utf-8-sig') as f: 
                        f.write(url + '\n')
                        f.close()


            except BreakIt:
                pass

        print(datetime.now())
        print('----------------------------------------------------------')
        time.sleep(300)

for i in range(1, 100):
    try:
        news_release()
    except Exception as e:
        print(e)
        print('restarting')
        continue
    else:
        break