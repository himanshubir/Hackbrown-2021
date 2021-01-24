import tabula
import pandas as pd
import numpy as np

def main():
    pdf_path = '/Users/shravanravi/Hackathons/Hackbrown-2021/Food Scrapes/Menu/torchys_nutrition_information.pdf'

    dfs = tabula.read_pdf(pdf_path, pages='all')

    menu1_array = dfs[0].values

    menu1_df = pd.DataFrame(menu1_array, columns=['Item', 'Calories', 'Calories/Fat', 'Total Fat', 'Saturated Fat', 'Cholesterol', 'Trans Fat', 'Sodium',
                 'Total Carbs', 'Sugars', 'Dietary Fibers', 'Protein', 'Vitamin A', 'Vitamin C', 'Calcium', 'Iron'])

    menu1_df['Item'] = menu1_df['Item'].apply(lambda x: str(x).split(' ON')[0])

    menu1_df = menu1_df[['Item', 'Calories', 'Calories/Fat', 'Total Fat', 'Cholesterol', 'Total Carbs', 'Sodium', 'Protein']]

    menu1_df.drop([1, 3, 5, 7, 9, 11, 13, 15, 16, 18, 20, 22], inplace=True)

    menu2_array = dfs[1].values
    # print(menu_df)



    menu2_df = pd.DataFrame(menu2_array, columns=['Item', 'Calories', 'Messed Up', 'Saturated Fat', 'Cholesterol', 'Trans Fat', 'Sodium',
                 'Total Carbs', 'Sugars', 'Dietary Fibers', 'Protein', 'Vitamin A', 'Vitamin C', 'Calcium', 'Iron'])

    menu2_df = menu2_df[['Item', 'Calories', 'Messed Up', 'Cholesterol', 'Total Carbs', 'Sodium', 'Protein']]

    menu2_df.dropna(inplace=True)

    menu2_df.drop([2, 3, 5, 7, 9, 11, 14, 16, 17, 19, 21, 22, 24, 26, 28, 30, 31, 33, 35], inplace=True)

    menu2_df['Item'] = menu2_df['Item'].apply(lambda x: str(x).split(' ON')[0])
    menu2_df['Calories/Fat'] = menu2_df['Messed Up'].apply(lambda x: str(x).split(" ")[0])
    menu2_df['Total Fat'] = menu2_df['Messed Up'].apply(lambda x: str(x).split(" ")[1])

    menu2_df.drop(['Messed Up'], 1, inplace=True)

    menu = pd.concat((menu1_df, menu2_df), ignore_index=True)

    menu.set_index('Item', inplace=True)
    menu = menu.apply(pd.to_numeric, errors='coerce')
    menu = menu.T
    print(menu)


    with open('/Users/shravanravi/Hackathons/Hackbrown-2021/Food Scrapes/Menu/torchys_nutrition_information.json', 'wb') as outfile:
        menu.to_json(outfile, indent=4)

if __name__  ==  "__main__":
    main()