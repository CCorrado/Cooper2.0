import json
import requests
from bs4 import BeautifulSoup
from collections import defaultdict


def main():
    page = requests.get("https://web.stevens.edu/scheduler/core/core.php?cmd=getxml&term=2020S")
    soup = BeautifulSoup(page.text, 'html.parser')
    with open("Term_Schedule_2020.json", 'a') as jsonFile:
        courses_list = []
        courses = soup.findAll('course')
        for course in courses:
            courses_json = defaultdict(str)
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
            meeting = course.find('meeting')

            try:
                if meeting:
                    courses_json['meetingDay'] = meeting['day']
            except Exception:
                courses_json['meetingDay'] = 'N/A'
            try:
                if meeting:
                    courses_json['startTime'] = meeting['starttime']
            except Exception:
                courses_json['startTime'] = 'N/A'
            try:
                if meeting:
                    courses_json['endTime'] = meeting['endtime']
            except Exception:
                courses_json['endTime'] = 'N/A'
            try:
                if meeting:
                    courses_json['building'] = meeting['building']
            except Exception:
                courses_json['building'] = 'N/A'
            try:
                if meeting:
                    courses_json['room'] = meeting['room']
            except Exception:
                courses_json['room'] = 'N/A'

            courses_list.append(courses_json)
        json.dump(courses_list, jsonFile, indent=2)


if __name__ == '__main__':
    main()
