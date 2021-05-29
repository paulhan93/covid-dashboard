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
covid_clean.to_csv('new_covid_counties_data.csv', index=False)
covid_clean_new = pd.read_csv('new_covid_counties_data.csv')
covid_clean_new.head()
# Get the data of counties from new_covid_counties_data.csv file

oregon_covid = pd.read_csv('new_covid_counties_data.csv')

data = []

for i in range(len(oregon_covid)):
  if oregon_covid.iloc[i].state == 'Oregon':
    data.append(oregon_covid.iloc[i])

new_oregon_covid_data = pd.DataFrame(data, columns = ['date', 'county', 'state', 'cases'])
new_oregon_covid_data.to_csv('only_for_oregon_counties.csv', index=False)
new_oregon_covid_data.head()
# Get the Washington county data from only_for_oregon_counties.csv file

washington_county = pd.read_csv('only_for_oregon_counties.csv')

data = []

for i in range(len(washington_county)):
  if washington_county.iloc[i].county == 'Washington':
    data.append(washington_county.iloc[i])

new_washington_covid_data = pd.DataFrame(data, columns = ['date', 'county', 'state', 'cases'])
new_washington_covid_data.to_csv('only_for_washington_county.csv', index=False)
new_washington_covid_data.head()