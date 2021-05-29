import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import math
import datetime
import csv
covid = pd.read_csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
covid.head()
# Data Clean
covid_clean = covid[['date','county','state','cases']]
covid_clean.to_json('oregon.json', index=False)
covid_clean_new = pd.read_json('oregon.json')
covid_clean_new.head()
# Get the data of counties from oregon.json file

oregon_covid = pd.read_json('oregon.json')

data = []

for i in range(len(oregon_covid)):
  if oregon_covid.iloc[i].state == 'Oregon':
    data.append(oregon_covid.iloc[i])

oregon_data = pd.DataFrame(data, columns = ['date', 'county', 'state', 'cases'])
oregon_data.to_json('only_for_oregon_counties.csv', index=False)
oregon_data.head()

