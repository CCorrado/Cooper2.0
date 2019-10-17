import requests
# pip install requests 
import json
from collections import defaultdict
from bs4 import BeautifulSoup
# pip install beautifulsoup4


def main():
    page = requests.get("https://web.stevens.edu/scheduler/core/core.php?cmd=getxml&term=2019F")
    # print(page.content)
    soup = BeautifulSoup(page.text, 'html.parser')
    with open("Term_Schedule.json", 'a') as jsonFile:
        courses_json = defaultdict(str)
        courses_list = []
        courses = soup.findAll('course')
        for course in courses:
            courses_json['title'] = course['title']
            courses_json['section'] = course['section']
            courses_json['call_number'] = course['callnumber']
            courses_json['minCredit'] = course['mincredit']
            courses_json['maxCredit'] = course['maxcredit']
            courses_json['maxEnrollment'] = course['maxenrollment']
            courses_json['currentEnrollment'] = course['currentenrollment']
            courses_json['status'] = course['status']
            courses_json['startDate'] = course['startdate']
            courses_json['endDate'] = course['enddate']
            courses_json['instructor'] = course['instructor1']
            courses_json['term'] = course['term']
            try:
                meeting = course.find('meeting')
                courses_json['meetingDay'] = meeting['day']
                # print(Meeting_day)
            except Exception as e:
                # print(e)
                courses_json['meetingDay'] = 'N/A'
                # print(Meeting_day)
            try:
                courses_json['startTime'] = meeting['starttime']
            except:
                courses_json['startTime'] = 'N/A'
            try:
                courses_json['endTime'] = meeting['endtime']
            except:
                courses_json['endTime'] = 'N/A'
            try:
                courses_json['building'] = meeting['building']
            except:
                courses_json['building'] = 'N/A'
            try:
                courses_json['room'] = meeting['room']
            except:
                courses_json['room'] = 'N/A'
            courses_list.append(courses_json)
        json.dump(courses_list, jsonFile, indent=4)


if __N/Ame__ == '__main__':
    main()
