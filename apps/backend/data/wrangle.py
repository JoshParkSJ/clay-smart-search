import pandas as pd
import os
import json

# Load the Excel file using absolute path
current_dir = os.path.dirname(os.path.abspath(__file__))
excel_path = os.path.join(current_dir, "Clay-Mock-Data_v01.xlsx")
excel_data = pd.read_excel(excel_path, sheet_name=None)

# Convert all sheets to JSON
json_data = {}
for sheet, df in excel_data.items():
    # Convert DataFrame to JSON-compatible format
    json_data[sheet] = df.to_dict(orient='records')

# Save to JSON file
json_output_path = os.path.join(current_dir, "clay_mock_data.json")
with open(json_output_path, 'w', encoding='utf-8') as f:
    json.dump(json_data, f, indent=2)

print(f"Data has been saved to: {json_output_path}")
