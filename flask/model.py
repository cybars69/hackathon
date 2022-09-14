import pandas as pd
import numpy as np
from sent2vec.vectorizer import Vectorizer
from nltk.corpus import stopwords
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsRegressor
import json

class Model():
    __instance = None

    @staticmethod
    def get_instance(self):
        if Model.__instance == None:
            Model()
        else:
            return Model.__instance

    def __init__(self):
        if Model.__instance != None:
            raise Exception("Singleton cannot be instantiated more than once!!")
        else:
            self.scalers = {}
            df = pd.read_csv('data_2.csv')
            y = np.array(df['label'])
            df = df.drop(['label'], axis=1)
            # self.text_columns = ['health_text', 'financial_text', 'social_text', 'acad_text']
            # self.text_columns = ['description_text']
            self.text_columns = []
            df[self.text_columns] = df[self.text_columns].replace(np.nan, "")
            self.numerical_columns = ['study_hours', 'freq_exam','loan_repayment_issue', 'fees_issue', 'food_issue', 'health_issue', 'family_issue', 'communication_issue', 'exam_pressure', 'hectic_timetable', 'acad_rating']

            for col in self.numerical_columns:
                scaler = StandardScaler()
                df[col] = scaler.fit_transform(pd.DataFrame(df[col]))
                self.scalers[col] = scaler

            X = df.drop(self.text_columns, axis=1)
            X = np.array(X[self.numerical_columns])

            for col in self.text_columns:
                vectorizer = Vectorizer()
                vectorizer.run(list(df[col]), remove_stop_words=stopwords.words('english'))
                vectors = vectorizer.vectors
                X = np.concatenate((X, np.array(vectors)), axis=1)

            self.model = KNeighborsRegressor(n_neighbors=4, weights='distance')
            self.model.fit(X, y)
            
    def predict(self, X):
        X = pd.json_normalize(X)
        text_data = X[self.text_columns]
        X = X.drop(self.text_columns, axis=1)

        for col in self.numerical_columns:
            X[col] = self.scalers[col].transform(pd.DataFrame(X[col]))

        X = np.array(X[self.numerical_columns])

        for col in self.text_columns:
            vectorizer = Vectorizer()
            vectorizer.run(list(text_data[col]), remove_stop_words=stopwords.words('english'))
            vectors = vectorizer.vectors
            X = np.concatenate([X, np.array(vectors)], axis=1)

        return self.model.predict(X)[0]


if __name__ == "__main__":
    model = Model()
    test_case = '''{"study_hours": 1, "freq_exam": 2, "loan_repayment_issue": 0, "fees_issue": 0, "food_issue": 0, "health_issue": 0, "family_issue": 0, "communication_issue": 0, "exam_pressure": 0, "hectic_timetable": 0, "interaction_with_friends": 1, "description_text":"Good", "acad_rating": 1}'''
    print(model.predict(json.loads(test_case)))
