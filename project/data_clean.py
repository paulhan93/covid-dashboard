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
