# Login Page - Administrator, Mentor, Students

## Intro
### Students - 
1) Front end - 
a) Login Page / Registration
b) Dashboard  -- History Graph ( Stress level vs time), Take a Survey button, Assigned mentor info, Ask a qn to mentor, etc.
c) Survey Page -- Form, On submitting returns the stress level
d) Message Page -- (chat between mentor and student)


2) Backend -
a) For login page -- Flask & MongoDB
b) For Dashboard -- For History Graph -- (Collect data from DB, chart display -- ChartJS
c) Message Page -- Flask, SocketIO, MongoDb
d) Survey Page -- Flask: a) get form data and pass to ML model, b) Returns the results to final page, c) Add the form data to students database


### Mentors -
1) Front end
a) Login
b) Dashboard -- All mentees should be displayed --- Name .... Chat History
c) Message Page
d) History Page
(similar to students)

2) Backend
Similar to students.

### Administrators-
If time permits

## Class Model
### Message
	_id : string,
	from_id : string,
	to_id: string,
	message : string,
	timestamp: BSON timestamp (inbuilt data type)

### User
	_id : string,
	role: string, (Mentor, Mentee, Admin)
	first_name: string,
	last_name: string,
	email: string,
	password: string,
	login(): (page, error),
	logout(): (page, error),

### Mentor extends User:
	assigned_mentees: list[User],

### Mentee extends User:
	assigned_mentor_id: string,
	stress_history: list[error],
	signup(): (String, error)

### Admin extends User:
    addMentor(User): (String, error),
	delMentor(User): error,
	assignMenteeToMentor(User, User): error,
	delMenteeFromMentor(User, User): error,
	addTrainingData(String): error

## Collections
- Users: To store user data
- Messages: To store all messages

## Routes
### User: 
- [GET] "/user/list"		    @admin_role required
- [GET] "/user/\<id>"		    @admin_role required
- [POST] "/user/signup"
- [POST] "/user/login"
- [POST] "/user/logout"         @login required
- [POST] "/user/mentor_login"
- [POST] "/user/admin_login"

### Mentee: @mentee_role required
- [GET] "/dashboard"
- [POST] "/user/graph"
- [GET] "/chat"
- [POST] "/chat/send_message"
- [GET] "/survey"
- [POST] "/survey/send_data"

### Mentor: @mentor_role required
- [GET] "/dashboard"
- [GET] "/user/graph/\<mentee\_id>" @mentor/admin_role required
- [GET] "/chat/\<mentee_id>"
- [POST] "/chat/send_message"

### Admin
- [GET] "/user/graph/\<mentee\_id>"  @mentor/admin_role required
- [POST] "/admin/addTrainingData"	        @admin_role required
- [POST] "/admin/addMentor"		        @admin_role required
- [POST] "/admin/delMentor"		        @admin_role required
- [POST] "/admin/assignMenteeToMentor"	@admin_role required
- [POST] "/admin/delMenteeFromMentor"	    @admin_role required

