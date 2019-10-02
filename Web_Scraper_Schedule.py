import requests
from bs4 import BeautifulSoup
import csv

def main():
	page = requests.get("https://web.stevens.edu/scheduler/core/core.php?cmd=getxml&term=2019F")
	# print(page.content)
	soup = BeautifulSoup(page.text,'html.parser')
	with open("Term_Schedule.csv",'a') as csvFile:
		writer = csv.writer(csvFile)
		writer.writerow(['Title','Section','call_number','MinCredit','MaxCredit','MaxEnrollment','Cur_Enroll','Status','StartDate','EndDate','Instructor','Term','Meeting_day','start_time','end_time','site','Building','Room','Activity','control','Argument','value','Operator'])
		courses = soup.findAll('course')
		for course in courses:
			data =[]
			title = course['title']
			section = course['section']
			call_number = course['callnumber']
			MinCredit = course['mincredit']
			MaxCredit = course['maxcredit']
			MaxEnrollment = course['maxenrollment']
			Cur_Enroll = course['currentenrollment']
			Status = course['status']
			StartDate = course['startdate']
			EndDate = course['enddate']
			Instructor = course['instructor1']
			Term = course['term']
			try:
				meeting = course.find('meeting')
				Meeting_day = meeting['day']
				# print(Meeting_day)
			except Exception as e:
				# print(e)
				Meeting_day ='NA'
				# print(Meeting_day)
			try:
				start_time = meeting['starttime']
			except:
				start_time = 'NA'
			try:
				end_time = meeting['endtime']
			except:
				end_time = 'NA'
			try:
				site = meeting['site']
			except:
				site = 'NA'
			try:
				Building = meeting['building']
			except:
				Building = 'NA'
			try:
				Room = meeting['room']
			except:
				Room = 'NA'
			try:
				Activity = meeting['activity']
			except:
				Activity = 'NA'
			try:
				Requirement = course.find('requirement')
				control = Requirement['conrol']
			except:
				control = 'NA'
			try:
				Argument = Requirement['argument']
			except:
				Argument = 'NA'
			try:
				Operator = Requirement['operator']
			except:
				Operator = 'NA'
			try:
				value = Requirement["value2"]
			except:
				value = 'NA'
			data.append([title,section,call_number,MinCredit,MaxCredit,MaxEnrollment,Cur_Enroll,Status,StartDate,EndDate,Instructor,Term,Meeting_day,start_time,end_time,site,Building,Room,Activity,control,Argument,value,Operator])
			for row in data:
				writer.writerow(row)



if __name__ == '__main__':
	main()
