import sys
import pandas as pd

df = pd.read_excel('./public/uploads/uploadedFileToCsv.xlsx')
print(df);

print('Hello from test.py! Variable: ' + sys.argv[1:])
