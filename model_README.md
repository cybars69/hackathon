We are using a KNN regressor for predicting the amount of stress a student is facing. The choice of the model was done by looking at a research paper that compared the performance of different models such as Decision trees, Random forests, logistic regresson, KNN etc. KNN was the best in terms of accuracy and ease of implementation. 

**Model parameters-**

1. Loan repayment issues

2. Fee payment issues

3. Health issues

4. Food issues

5. Daily study hours

6. Exam frequency: 1-More than once a week, 2-Weekly, 3-More than once a month, 4-Monthly, 5-Once in 2 to 3 months

7. Timetable/schedule

8. Issues with friends

9. Issues with family

10. Interaction with friends: 1-Excellent, 2-Good, 3-Average, 4-Poor, 5-No friends

**Training**

The values for these parameters were integers. If there is an issue, the value is 1. We instantiated a KNeighborsRegressor from sklearn and trained it on our data for a k-value of 4. We looked at different values of k and found 4 was the best one for our data. 
